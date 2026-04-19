import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Halls = () => {
  const [halls, setHalls] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showHallForm, setShowHallForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [hallForm, setHallForm] = useState({
    name: '',
    capacity: '',
    price: '',
    amenities: '',
    location: ''
  });
  const [bookingForm, setBookingForm] = useState({
    hallId: '',
    customerName: '',
    customerPhone: '',
    eventDate: '',
    eventType: '',
    guestCount: '',
    package: 'basic'
  });

  useEffect(() => {
    fetchHalls();
    fetchBookings();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/halls');
      setHalls(response.data || []);
    } catch (error) {
      console.error('Error fetching halls:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hall-bookings');
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleHallSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/halls', {
        ...hallForm,
        amenities: hallForm.amenities.split(',').map(a => a.trim())
      });
      fetchHalls();
      setHallForm({ name: '', capacity: '', price: '', amenities: '', location: '' });
      setShowHallForm(false);
    } catch (error) {
      console.error('Error saving hall:', error);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/hall-bookings', bookingForm);
      fetchBookings();
      setBookingForm({ hallId: '', customerName: '', customerPhone: '', eventDate: '', eventType: '', guestCount: '', package: 'basic' });
      setShowBookingForm(false);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const handleDeleteHall = async (id) => {
    if (window.confirm('Delete this hall?')) {
      try {
        await axios.delete(`http://localhost:5000/api/halls/${id}`);
        fetchHalls();
      } catch (error) {
        console.error('Error deleting hall:', error);
      }
    }
  };

  return (
    <div>
      <h2>Hall Management & Booking</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button className="btn btn-success" onClick={() => setShowHallForm(!showHallForm)}>
          Add Hall
        </button>
        <button className="btn" onClick={() => setShowBookingForm(!showBookingForm)}>
          Book Hall
        </button>
      </div>

      {showHallForm && (
        <div className="card">
          <h3>Add Hall</h3>
          <form onSubmit={handleHallSubmit}>
            <div className="form-group">
              <label>Hall Name</label>
              <input
                type="text"
                value={hallForm.name}
                onChange={(e) => setHallForm({...hallForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                value={hallForm.capacity}
                onChange={(e) => setHallForm({...hallForm, capacity: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Base Price</label>
              <input
                type="number"
                value={hallForm.price}
                onChange={(e) => setHallForm({...hallForm, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Amenities (comma separated)</label>
              <input
                type="text"
                value={hallForm.amenities}
                onChange={(e) => setHallForm({...hallForm, amenities: e.target.value})}
                placeholder="AC, Projector, Stage"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={hallForm.location}
                onChange={(e) => setHallForm({...hallForm, location: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Add</button>
            <button type="button" className="btn" onClick={() => setShowHallForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {showBookingForm && (
        <div className="card">
          <h3>Book Hall</h3>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <label>Select Hall</label>
              <select
                value={bookingForm.hallId}
                onChange={(e) => setBookingForm({...bookingForm, hallId: e.target.value})}
                required
              >
                <option value="">Select a hall</option>
                {halls.map(hall => (
                  <option key={hall._id} value={hall._id}>
                    {hall.name} - Capacity: {hall.capacity} - ${hall.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Customer Name</label>
              <input
                type="text"
                value={bookingForm.customerName}
                onChange={(e) => setBookingForm({...bookingForm, customerName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Customer Phone</label>
              <input
                type="tel"
                value={bookingForm.customerPhone}
                onChange={(e) => setBookingForm({...bookingForm, customerPhone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                value={bookingForm.eventDate}
                onChange={(e) => setBookingForm({...bookingForm, eventDate: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Event Type</label>
              <input
                type="text"
                value={bookingForm.eventType}
                onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                placeholder="Wedding, Birthday, Corporate"
                required
              />
            </div>
            <div className="form-group">
              <label>Guest Count</label>
              <input
                type="number"
                value={bookingForm.guestCount}
                onChange={(e) => setBookingForm({...bookingForm, guestCount: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Package</label>
              <select
                value={bookingForm.package}
                onChange={(e) => setBookingForm({...bookingForm, package: e.target.value})}
              >
                <option value="basic">Basic (1x price)</option>
                <option value="standard">Standard (1.5x price)</option>
                <option value="premium">Premium (2x price)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Book</button>
            <button type="button" className="btn" onClick={() => setShowBookingForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="card">
        <h3>Available Halls</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Capacity</th>
              <th>Base Price</th>
              <th>Amenities</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map(hall => (
              <tr key={hall._id}>
                <td>{hall.name}</td>
                <td>{hall.capacity}</td>
                <td>${hall.price}</td>
                <td>{hall.amenities?.join(', ')}</td>
                <td>{hall.location}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDeleteHall(hall._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Hall Bookings</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Hall</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Event Date</th>
              <th>Event Type</th>
              <th>Guests</th>
              <th>Package</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td>{booking.hallName || 'N/A'}</td>
                <td>{booking.customerName}</td>
                <td>{booking.customerPhone}</td>
                <td>{new Date(booking.eventDate).toLocaleDateString()}</td>
                <td>{booking.eventType}</td>
                <td>{booking.guestCount}</td>
                <td>{booking.package}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Halls;