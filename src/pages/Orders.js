import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import OrderForm from '../components/OrderForm';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.getAll();
      setOrders(response.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleSave = async (orderData) => {
    try {
      if (editingOrder) {
        await orderService.update(editingOrder._id, orderData);
      } else {
        await orderService.create(orderData);
      }
      fetchOrders();
      setShowForm(false);
      setEditingOrder(null);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.delete(id);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Orders</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>
          New Order
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingOrder ? 'Edit Order' : 'New Order'}</h3>
          <OrderForm
            order={editingOrder}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingOrder(null);
            }}
          />
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Event Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id?.slice(-6) || 'N/A'}</td>
                <td>{order.customerName}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{new Date(order.eventDate).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>₹{order.total}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(order)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;