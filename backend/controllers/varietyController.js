const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varieties ORDER BY type');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, type, items, price, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO varieties (name, type, items, price, description) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, type, items, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM varieties WHERE id=$1', [id]);
    res.json({ message: 'Variety deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, remove };