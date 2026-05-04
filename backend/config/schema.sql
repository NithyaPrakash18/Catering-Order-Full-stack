-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  company VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  image TEXT,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Halls Table
CREATE TABLE IF NOT EXISTS halls (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capacity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  amenities TEXT[],
  location VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  event_location VARCHAR(200),
  guest_count INTEGER NOT NULL,
  hall_id INTEGER REFERENCES halls(id),
  hall_name VARCHAR(100),
  hall_price DECIMAL(10,2) DEFAULT 0,
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  total DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id),
  menu_item_name VARCHAR(100),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Create Hall Bookings Table
CREATE TABLE IF NOT EXISTS hall_bookings (
  id SERIAL PRIMARY KEY,
  hall_id INTEGER REFERENCES halls(id),
  hall_name VARCHAR(100),
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  event_date DATE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  guest_count INTEGER NOT NULL,
  package VARCHAR(20) DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Food Varieties Table
CREATE TABLE IF NOT EXISTS varieties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  items TEXT[],
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Menu Items
INSERT INTO menu_items (name, description, price, category, image, available) VALUES
('Chicken Biryani', 'Aromatic basmati rice with tender chicken pieces', 899, 'main', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', TRUE),
('Paneer Tikka', 'Grilled cottage cheese with Indian spices', 599, 'appetizer', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', TRUE),
('Masala Dosa', 'Crispy South Indian crepe with potato filling', 399, 'main', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', TRUE),
('Gulab Jamun', 'Sweet milk dumplings in sugar syrup', 299, 'dessert', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', TRUE),
('Samosa', 'Crispy pastry filled with spiced potatoes', 199, 'appetizer', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', TRUE),
('Butter Chicken', 'Creamy tomato curry with tender chicken', 999, 'main', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', TRUE)
ON CONFLICT DO NOTHING;