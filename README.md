# Catering Order Management System - Frontend

A React-based frontend for managing catering orders, menu items, and customers.

## Features

- **Dashboard**: Overview of orders, statistics, and recent activity
- **Order Management**: Create, edit, and track catering orders
- **Menu Management**: Manage food items with categories and pricing
- **Customer Management**: Store and manage customer information
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will run on http://localhost:3000

3. **Backend Configuration**
   - Update the API base URL in `src/services/api.js` if your backend runs on a different port
   - Default backend URL: http://localhost:5000/api

## Project Structure

```
src/
├── components/
│   └── OrderForm.js          # Form component for creating/editing orders
├── pages/
│   ├── Dashboard.js          # Dashboard with statistics
│   ├── Orders.js             # Order management page
│   ├── Menu.js               # Menu item management
│   └── Customers.js          # Customer management
├── services/
│   └── api.js                # API service layer
├── App.js                    # Main app component with routing
├── App.css                   # Global styles
└── index.js                  # App entry point
```

## API Endpoints Expected

The frontend expects these backend endpoints:

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/menu` - Get menu items
- `POST /api/menu` - Create menu item
- `PUT /api/menu/:id` - Update menu item
- `DELETE /api/menu/:id` - Delete menu item
- `GET /api/customers` - Get customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.