const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', require('./routes/orders'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/halls', require('./routes/halls'));
app.use('/api/hall-bookings', require('./routes/halls'));
app.use('/api/varieties', require('./routes/varieties'));

app.get('/', (req, res) => {
  res.json({ message: 'Catering Order Management API Running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});