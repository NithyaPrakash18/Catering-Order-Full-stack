const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: (process.env.DB_HOST || '').trim(),
  port: parseInt((process.env.DB_PORT || '5432').trim()),
  database: (process.env.DB_NAME || '').trim(),
  user: (process.env.DB_USER || '').trim(),
  password: (process.env.DB_PASSWORD || '').trim(),
  ssl: { rejectUnauthorized: false }
});

pool.connect((err) => {
  if (err) {
    console.error('PostgreSQL connection error:', err);
  } else {
    console.log('PostgreSQL connected successfully');
  }
});

module.exports = pool;