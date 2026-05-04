const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM halls ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const { name, capacity, price, amenities, location } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO halls (name, capacity, price, amenities, location) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [name, capacity, price, amenities, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM halls WHERE id=$1', [id]);
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM hall_bookings ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  const { hallId, customerName, customerPhone, eventDate, eventType, guestCount, package: pkg } = req.body;
  try {
    const hall = await pool.query('SELECT name FROM halls WHERE id=$1', [hallId]);
    const hallName = hall.rows[0]?.name || '';

    const result = await pool.query(
      'INSERT INTO hall_bookings (hall_id, hall_name, customer_name, customer_phone, event_date, event_type, guest_count, package) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [hallId, hallName, customerName, customerPhone, eventDate, eventType, guestCount, pkg]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, create, remove, getAllBookings, createBooking };