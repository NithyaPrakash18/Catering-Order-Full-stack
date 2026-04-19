import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [varieties, setVarieties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'south-indian',
    items: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/varieties');
      setVarieties(response.data || []);
    } catch (error) {
      console.error('Error fetching varieties:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/varieties', {
        ...formData,
        items: formData.items.split(',').map(item => item.trim())
      });
      fetchVarieties();
      setFormData({ name: '', type: 'south-indian', items: '', price: '', description: '' });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving variety:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this variety?')) {
      try {
        await axios.delete(`http://localhost:5000/api/varieties/${id}`);
        fetchVarieties();
      } catch (error) {
        console.error('Error deleting variety:', error);
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2>Food Varieties Management</h2>
        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          Add Variety
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>Add Food Variety</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Variety Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="south-indian">South Indian</option>
                <option value="north-indian">North Indian</option>
                <option value="chinese">Chinese</option>
                <option value="continental">Continental</option>
              </select>
            </div>
            <div className="form-group">
              <label>Items (comma separated)</label>
              <textarea
                value={formData.items}
                onChange={(e) => setFormData({...formData, items: e.target.value})}
                placeholder="Idli, Dosa, Vada, Sambar"
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label>Price per Person</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="2"
              />
            </div>
            <button type="submit" className="btn btn-success">Add</button>
            <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Items</th>
              <th>Price/Person</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {varieties.map(variety => (
              <tr key={variety._id}>
                <td>{variety.name}</td>
                <td>{variety.type}</td>
                <td>{variety.items?.join(', ')}</td>
                <td>${variety.price}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(variety._id)}>
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

export default Admin;