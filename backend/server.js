const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ORDERS
app.get('/api/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/orders', async (req, res) => {
  const { data, error } = await supabase.from('orders').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/api/orders/:id', async (req, res) => {
  const { data, error } = await supabase.from('orders').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/orders/:id', async (req, res) => {
  const { error } = await supabase.from('orders').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Order deleted' });
});

// MENU
app.get('/api/menu', async (req, res) => {
  const { data, error } = await supabase.from('menu_items').select('*').order('category');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/menu', async (req, res) => {
  const { data, error } = await supabase.from('menu_items').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/api/menu/:id', async (req, res) => {
  const { data, error } = await supabase.from('menu_items').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/menu/:id', async (req, res) => {
  const { error } = await supabase.from('menu_items').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Menu item deleted' });
});

// CUSTOMERS
app.get('/api/customers', async (req, res) => {
  const { data, error } = await supabase.from('customers').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/customers', async (req, res) => {
  const { data, error } = await supabase.from('customers').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.put('/api/customers/:id', async (req, res) => {
  const { data, error } = await supabase.from('customers').update(req.body).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

app.delete('/api/customers/:id', async (req, res) => {
  const { error } = await supabase.from('customers').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Customer deleted' });
});

// HALLS
app.get('/api/halls', async (req, res) => {
  const { data, error } = await supabase.from('halls').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/halls', async (req, res) => {
  const { data, error } = await supabase.from('halls').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.delete('/api/halls/:id', async (req, res) => {
  const { error } = await supabase.from('halls').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Hall deleted' });
});

// HALL BOOKINGS
app.get('/api/hall-bookings', async (req, res) => {
  const { data, error } = await supabase.from('hall_bookings').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/hall-bookings', async (req, res) => {
  const { data, error } = await supabase.from('hall_bookings').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// VARIETIES
app.get('/api/varieties', async (req, res) => {
  const { data, error } = await supabase.from('varieties').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/varieties', async (req, res) => {
  const { data, error } = await supabase.from('varieties').insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

app.delete('/api/varieties/:id', async (req, res) => {
  const { error } = await supabase.from('varieties').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Variety deleted' });
});

app.get('/', (req, res) => res.json({ message: 'Catering Order API Running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));