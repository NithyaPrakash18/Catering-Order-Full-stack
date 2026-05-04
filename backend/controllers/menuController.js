const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY category');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, description, price, category, image, available } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, price, category, image, available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, category, image, available]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, image, available } = req.body;
  try {
    const result = await pool.query(
      'UPDATE menu_items SET name=$1, description=$2, price=$3, category=$4, image=$5, available=$6 WHERE id=$7 RETURNING *',
      [name, description, price, category, image, available, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE id=$1', [id]);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, update, remove };