import React, { useState } from 'react';

const hallsData = {
  'Tamil Nadu': [
    { id: 1, name: 'Grand Ballroom', area: 'T Nagar', city: 'Chennai', capacity: 500, price: 50000, amenities: ['AC', 'Stage', 'Projector', 'Parking'], phone: '9876543210' },
    { id: 2, name: 'Royal Kalyana Mandapam', area: 'Anna Nagar', city: 'Chennai', capacity: 300, price: 35000, amenities: ['AC', 'Stage', 'Sound System'], phone: '9876543211' },
    { id: 3, name: 'Sri Murugan Hall', area: 'Vadapalani', city: 'Chennai', capacity: 200, price: 25000, amenities: ['AC', 'Parking', 'Catering Area'], phone: '9876543212' },
    { id: 4, name: 'Lakshmi Kalyana Mahal', area: 'Coimbatore', city: 'Coimbatore', capacity: 400, price: 40000, amenities: ['AC', 'Stage', 'Generator'], phone: '9876543213' },
    { id: 5, name: 'Vijaya Convention Centre', area: 'Madurai', city: 'Madurai', capacity: 600, price: 60000, amenities: ['AC', 'Stage', 'Projector', 'Parking', 'Catering'], phone: '9876543214' },
  ],
  'Kerala': [
    { id: 6, name: 'MASS Auditorium', area: '-', city: 'Palakkad', capacity: 800, price: 75000, amenities: ['AC', 'Stage', 'Projector', 'Parking'], phone: '9876543215' },
    { id: 7, name: 'St Joseph EMHS Hall', area: 'Neelor', city: 'Pala', capacity: 300, price: 30000, amenities: ['AC', 'Stage'], phone: '9876543216' },
    { id: 8, name: 'Anugraha Kalayana Mandapam', area: 'Olavakkode', city: 'Palakkad', capacity: 400, price: 45000, amenities: ['AC', 'Stage', 'Parking'], phone: '9876543217' },
    { id: 9, name: 'KRK Kalyana Mandapam', area: 'Vadakkanthara', city: 'Palakkad', capacity: 350, price: 38000, amenities: ['AC', 'Stage', 'Sound System'], phone: '9876543218' },
    { id: 10, name: 'The Gallery Cultural Centre', area: '-', city: 'Palakkad', capacity: 500, price: 55000, amenities: ['AC', 'Stage', 'Projector'], phone: '9876543219' },
  ],
  'Karnataka': [
    { id: 11, name: 'Palace Grounds', area: 'Jayamahal', city: 'Bangalore', capacity: 1000, price: 100000, amenities: ['AC', 'Stage', 'Projector', 'Parking', 'Catering'], phone: '9876543220' },
    { id: 12, name: 'Gayatri Kalyana Mantapa', area: 'Jayanagar', city: 'Bangalore', capacity: 400, price: 45000, amenities: ['AC', 'Stage', 'Parking'], phone: '9876543221' },
    { id: 13, name: 'Sri Venkateshwara Hall', area: 'Mysore Road', city: 'Mysore', capacity: 300, price: 32000, amenities: ['AC', 'Stage'], phone: '9876543222' },
  ],
  'Andhra Pradesh': [
    { id: 14, name: 'Srinivasa Kalyana Mandapam', area: 'Banjara Hills', city: 'Hyderabad', capacity: 500, price: 55000, amenities: ['AC', 'Stage', 'Projector', 'Parking'], phone: '9876543223' },
    { id: 15, name: 'Vijayalakshmi Convention', area: 'Vijayawada', city: 'Vijayawada', capacity: 600, price: 60000, amenities: ['AC', 'Stage', 'Catering'], phone: '9876543224' },
  ],
  'Maharashtra': [
    { id: 16, name: 'Sahyadri Hall', area: 'Dadar', city: 'Mumbai', capacity: 700, price: 80000, amenities: ['AC', 'Stage', 'Projector', 'Parking'], phone: '9876543225' },
    { id: 17, name: 'Ganesh Kalyan Mandap', area: 'Pune', city: 'Pune', capacity: 400, price: 45000, amenities: ['AC', 'Stage', 'Sound System'], phone: '9876543226' },
  ],
};

const Halls = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);

  const states = Object.keys(hallsData);

  return (
    <div>
      <h2>Hall Management & Booking</h2>

      {!selectedState && (
        <div>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>Select a state to view available halls</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {states.map(state => (
              <div
                key={state}
                onClick={() => setSelectedState(state)}
                style={{
                  background: 'white',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = '#8e44ad'}
                onMouseOut={e => e.currentTarget.style.borderColor = '#e0e0e0'}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏛️</div>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{state}</div>
                <div style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                  {hallsData[state].length} halls
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedState && !selectedHall && (
        <div>
          <button
            onClick={() => setSelectedState(null)}
            style={{ background: 'none', border: 'none', color: '#8e44ad', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem', padding: 0 }}
          >
            ← Back to States
          </button>
          <h3 style={{ marginBottom: '1.5rem' }}>Halls in {selectedState}</h3>
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {hallsData[selectedState].map((hall, index) => (
              <div
                key={hall.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.2rem 1.5rem',
                  borderBottom: index < hallsData[selectedState].length - 1 ? '1px solid #eee' : 'none'
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2c3e50' }}>{hall.name}</div>
                  <div style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.2rem' }}>- {hall.area}</div>
                </div>
                <div style={{ color: '#555', fontWeight: '500', minWidth: '120px', textAlign: 'center' }}>
                  {hall.city}
                </div>
                <button
                  onClick={() => setSelectedHall(hall)}
                  style={{
                    background: '#8e44ad',
                    color: 'white',
                    border: 'none',
                    padding: '0.6rem 1.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                >
                  View Info
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedHall && (
        <div>
          <button
            onClick={() => setSelectedHall(null)}
            style={{ background: 'none', border: 'none', color: '#8e44ad', cursor: 'pointer', fontSize: '1rem', marginBottom: '1rem', padding: 0 }}
          >
            ← Back to Halls
          </button>
          <div style={{ background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>{selectedHall.name}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>Location</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.3rem' }}>{selectedHall.area}, {selectedHall.city}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>Capacity</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.3rem' }}>{selectedHall.capacity} guests</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>Price</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.3rem', color: '#27ae60' }}>₹{selectedHall.price.toLocaleString()}</div>
              </div>
              <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>Contact</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.3rem' }}>{selectedHall.phone}</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9f9f9', borderRadius: '6px' }}>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Amenities</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                {selectedHall.amenities.map(a => (
                  <span key={a} style={{ background: '#8e44ad', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <button
              style={{ marginTop: '1.5rem', background: '#27ae60', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
            >
              Book This Hall
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Halls;