const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, email, phone, address, company } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers (name, email, phone, address, company) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, phone, address, company]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, company } = req.body;
  try {
    const result = await pool.query(
      'UPDATE customers SET name=$1, email=$2, phone=$3, address=$4, company=$5 WHERE id=$6 RETURNING *',
      [name, email, phone, address, company, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM customers WHERE id=$1', [id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, update, remove };