const pool = require('../config/db');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = result.rows;

    for (let order of orders) {
      const items = await pool.query('SELECT * FROM order_items WHERE order_id=$1', [order.id]);
      order.items = items.rows;
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    const order = result.rows[0];
    const items = await pool.query('SELECT * FROM order_items WHERE order_id=$1', [id]);
    order.items = items.rows;
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  const {
    customerName, customerEmail, customerPhone,
    eventDate, eventTime, eventLocation,
    guestCount, hallId, hallName, hallPrice,
    items, specialRequests, status, total
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders 
        (customer_name, customer_email, customer_phone, event_date, event_time, 
         event_location, guest_count, hall_id, hall_name, hall_price, 
         special_requests, status, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
      [customerName, customerEmail, customerPhone, eventDate, eventTime,
       eventLocation, guestCount, hallId || null, hallName, hallPrice || 0,
       specialRequests, status || 'pending', total]
    );

    const order = orderResult.rows[0];

    if (items && items.length > 0) {
      for (let item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, menu_item_id, menu_item_name, quantity, price) VALUES ($1,$2,$3,$4,$5)',
          [order.id, item.menuItem || null, item.name || '', item.quantity, item.price]
        );
      }
    }

    await client.query('COMMIT');
    res.status(201).json(order);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    customerName, customerEmail, customerPhone,
    eventDate, eventTime, eventLocation,
    guestCount, hallId, hallName, hallPrice,
    specialRequests, status, total
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders SET 
        customer_name=$1, customer_email=$2, customer_phone=$3,
        event_date=$4, event_time=$5, event_location=$6,
        guest_count=$7, hall_id=$8, hall_name=$9, hall_price=$10,
        special_requests=$11, status=$12, total=$13
       WHERE id=$14 RETURNING *`,
      [customerName, customerEmail, customerPhone, eventDate, eventTime,
       eventLocation, guestCount, hallId || null, hallName, hallPrice || 0,
       specialRequests, status, total, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM orders WHERE id=$1', [id]);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };