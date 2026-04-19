import React, { useState, useEffect } from 'react';
import { menuService } from '../services/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([
    {
      _id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice with tender chicken pieces',
      price: 899,
      category: 'main',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
      available: true
    },
    {
      _id: '2',
      name: 'Paneer Tikka',
      description: 'Grilled cottage cheese with Indian spices',
      price: 599,
      category: 'appetizer',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
      available: true
    },
    {
      _id: '3',
      name: 'Masala Dosa',
      description: 'Crispy South Indian crepe with potato filling',
      price: 399,
      category: 'main',
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400',
      available: true
    },
    {
      _id: '4',
      name: 'Gulab Jamun',
      description: 'Sweet milk dumplings in sugar syrup',
      price: 299,
      category: 'dessert',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400',
      available: true
    },
    {
      _id: '5',
      name: 'Samosa',
      description: 'Crispy pastry filled with spiced potatoes',
      price: 199,
      category: 'appetizer',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      available: true
    },
    {
      _id: '6',
      name: 'Butter Chicken',
      description: 'Creamy tomato curry with tender chicken',
      price: 999,
      category: 'main',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
      available: true
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    available: true
  });

  useEffect(() => {
    // fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await menuService.getAll();
      setMenuItems(response.data || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await menuService.update(editingItem._id, formData);
      } else {
        await menuService.create(formData);
      }
      fetchMenuItems();
      resetForm();
    } catch (error) {
      console.error('Error saving menu item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await menuService.delete(id);
        fetchMenuItems();
      } catch (error) {
        console.error('Error deleting menu item:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      available: true
    });
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Menu Items</h2>
        <button className="btn btn-success" onClick={() => setShowForm(true)}>
          Add Menu Item
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h3>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="">Select Category</option>
                <option value="appetizer">Appetizer</option>
                <option value="main">Main Course</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({...formData, available: e.target.checked})}
                />
                Available
              </label>
            </div>
            <button type="submit" className="btn btn-success">
              {editingItem ? 'Update' : 'Add'} Item
            </button>
            <button type="button" className="btn" onClick={resetForm}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="menu-grid">
        {menuItems.map(item => (
          <div key={item._id} className="menu-card">
            <img 
              src={item.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
              alt={item.name}
              className="menu-image"
            />
            <div className="menu-content">
              <h3>{item.name}</h3>
              <p className="menu-category">{item.category}</p>
              <p className="menu-description">{item.description}</p>
              <div className="menu-footer">
                <span className="menu-price">₹{item.price}</span>
                <span className={`menu-status ${item.available ? 'available' : 'unavailable'}`}>
                  {item.available ? '✓ Available' : '✗ Unavailable'}
                </span>
              </div>
              <div className="menu-actions">
                <button className="btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;