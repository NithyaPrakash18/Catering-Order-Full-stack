import React, { useState, useEffect } from 'react';
import { menuService, customerService } from '../services/api';

const OrderForm = ({ order, onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    guestCount: '',
    items: [],
    hallId: '',
    hallName: '',
    hallPrice: 0,
    specialRequests: '',
    status: 'pending',
    total: 0
  });
  const [menuItems, setMenuItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [halls, setHalls] = useState([]);

  useEffect(() => {
    fetchMenuItems();
    fetchCustomers();
    fetchHalls();
    if (order) {
      setFormData({
        ...order,
        eventDate: order.eventDate ? new Date(order.eventDate).toISOString().split('T')[0] : '',
        eventTime: order.eventTime || ''
      });
    }
  }, [order]);

  const fetchMenuItems = async () => {
    try {
      const response = await menuService.getAll();
      setMenuItems(response.data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getAll();
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchHalls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/halls');
      const data = await response.json();
      setHalls(data || []);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const handleCustomerSelect = (e) => {
    const customerId = e.target.value;
    const customer = customers.find(c => c._id === customerId);
    if (customer) {
      setFormData({
        ...formData,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone
      });
    }
  };

  const addMenuItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { menuItem: '', quantity: 1, price: 0 }]
    });
  };

  const updateMenuItem = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    
    if (field === 'menuItem') {
      const menuItem = menuItems.find(item => item._id === value);
      updatedItems[index].price = menuItem ? menuItem.price : 0;
    }
    
    const itemsTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData({
      ...formData,
      items: updatedItems,
      total: itemsTotal + formData.hallPrice
    });
  };

  const removeMenuItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    const itemsTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData({
      ...formData,
      items: updatedItems,
      total: itemsTotal + formData.hallPrice
    });
  };

  const handleHallSelect = (e) => {
    const hallId = e.target.value;
    const hall = halls.find(h => h._id === hallId);
    const hallPrice = hall ? hall.price : 0;
    const itemsTotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setFormData({
      ...formData,
      hallId: hallId,
      hallName: hall ? hall.name : '',
      hallPrice: hallPrice,
      total: itemsTotal + hallPrice
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center' }}>
        <div style={{ padding: '0.5rem 1rem', background: step >= 1 ? '#3498db' : '#ddd', color: 'white', borderRadius: '4px' }}>1. Customer</div>
        <div style={{ padding: '0.5rem 1rem', background: step >= 2 ? '#3498db' : '#ddd', color: 'white', borderRadius: '4px' }}>2. Hall</div>
        <div style={{ padding: '0.5rem 1rem', background: step >= 3 ? '#3498db' : '#ddd', color: 'white', borderRadius: '4px' }}>3. Menu</div>
        <div style={{ padding: '0.5rem 1rem', background: step >= 4 ? '#3498db' : '#ddd', color: 'white', borderRadius: '4px' }}>4. Confirm</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h3>Customer Details</h3>
            <div className="form-group">
              <label>Select Existing Customer</label>
              <select onChange={handleCustomerSelect}>
                <option value="">Select a customer or enter new details</option>
                {customers.map(customer => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Customer Name</label>
              <input type="text" value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Customer Email</label>
              <input type="email" value={formData.customerEmail} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Customer Phone</label>
              <input type="tel" value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input type="date" value={formData.eventDate} onChange={(e) => setFormData({...formData, eventDate: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Event Time</label>
              <input type="time" value={formData.eventTime} onChange={(e) => setFormData({...formData, eventTime: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Guest Count</label>
              <input type="number" value={formData.guestCount} onChange={(e) => setFormData({...formData, guestCount: e.target.value})} required />
            </div>
            <button type="button" className="btn btn-success" onClick={() => setStep(2)}>Next</button>
            <button type="button" className="btn" onClick={onCancel}>Cancel</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Select Hall (Optional)</h3>
            <div className="form-group">
              <label>Do you need a hall?</label>
              <select value={formData.hallId} onChange={handleHallSelect}>
                <option value="">No hall needed</option>
                {halls.map(hall => (
                  <option key={hall._id} value={hall._id}>
                    {hall.name} - Capacity: {hall.capacity} - ₹{hall.price}
                  </option>
                ))}
              </select>
            </div>
            {formData.hallId && (
              <div style={{ background: '#f0f0f0', padding: '1rem', borderRadius: '4px', marginTop: '1rem' }}>
                <h4>Selected Hall: {formData.hallName}</h4>
                <p>Hall Cost: ₹{formData.hallPrice}</p>
              </div>
            )}
            <button type="button" className="btn" onClick={() => setStep(1)}>Back</button>
            <button type="button" className="btn btn-success" onClick={() => setStep(3)}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Select Menu Items</h3>
            <div className="form-group">
              <label>Menu Items</label>
              {formData.items.map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <select value={item.menuItem} onChange={(e) => updateMenuItem(index, 'menuItem', e.target.value)} required>
                    <option value="">Select Menu Item</option>
                    {menuItems.map(menuItem => (
                      <option key={menuItem._id} value={menuItem._id}>
                        {menuItem.name} - ₹{menuItem.price}
                      </option>
                    ))}
                  </select>
                  <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => updateMenuItem(index, 'quantity', parseInt(e.target.value))} min="1" required />
                  <span>₹{(item.price * item.quantity)}</span>
                  <button type="button" className="btn btn-danger" onClick={() => removeMenuItem(index)}>Remove</button>
                </div>
              ))}
              <button type="button" className="btn" onClick={addMenuItem}>Add Menu Item</button>
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <textarea value={formData.specialRequests} onChange={(e) => setFormData({...formData, specialRequests: e.target.value})} rows="3" />
            </div>
            <button type="button" className="btn" onClick={() => setStep(2)}>Back</button>
            <button type="button" className="btn btn-success" onClick={() => setStep(4)}>Next</button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3>Confirm Order</h3>
            <div style={{ background: '#f9f9f9', padding: '1.5rem', borderRadius: '8px' }}>
              <h4>Order Summary</h4>
              <p><strong>Customer:</strong> {formData.customerName}</p>
              <p><strong>Email:</strong> {formData.customerEmail}</p>
              <p><strong>Phone:</strong> {formData.customerPhone}</p>
              <p><strong>Event Date:</strong> {formData.eventDate} {formData.eventTime}</p>
              <p><strong>Guests:</strong> {formData.guestCount}</p>
              {formData.hallId && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#e8f4f8', borderRadius: '4px' }}>
                  <p><strong>Hall:</strong> {formData.hallName}</p>
                  <p><strong>Hall Cost:</strong> ₹{formData.hallPrice}</p>
                </div>
              )}
              <div style={{ marginTop: '1rem' }}>
                <h4>Menu Items:</h4>
                {formData.items.map((item, idx) => {
                  const menuItem = menuItems.find(m => m._id === item.menuItem);
                  return (
                    <p key={idx}>{menuItem?.name} x {item.quantity} = ₹{item.price * item.quantity}</p>
                  );
                })}
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#d4edda', borderRadius: '4px' }}>
                <h3>Total Estimate: ₹{formData.total}</h3>
              </div>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button type="button" className="btn" onClick={() => setStep(3)}>Back</button>
            <button type="submit" className="btn btn-success">{order ? 'Update' : 'Confirm'} Order</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderForm;