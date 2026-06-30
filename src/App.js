import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';
import collegeLogo from './assets/photos/college-logo.jpg';

function App() {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    hall_name: '', booked_by: '', designation: '', event_name: '', booking_date: ''
  });

  const fetchBookings = async () => {
    const { data } = await supabase.from('bookings').select('*').order('id', { ascending: false });
    if (data) setHistory(data);
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('bookings').insert([formData]);
    if (!error) {
      alert("Booking Successful!");
      setFormData({ hall_name: '', booked_by: '', designation: '', event_name: '', booking_date: '' });
      fetchBookings();
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header section */}
      <div className="college-header">
        <img src={collegeLogo} alt="College Logo" className="logo" />
        <h2>Erode Arts and Science College (Autonomous)</h2>
        <p>Affiliated with Bharathiar University, Coimbatore</p>
      </div>

      {/* Main Container */}
      <div className="content-wrapper" style={{ flexDirection: 'column' }}>
        
        {/* Book Now Section */}
        <div className="booking-container">
          <h2 style={{textAlign: 'center', color: '#ffcc00'}}>SEMINAR HALL BOOKING</h2>
          <form onSubmit={handleSubmit}>
            <label>HALL NAME</label>
            <input name="hall_name" value={formData.hall_name} onChange={(e) => setFormData({...formData, hall_name: e.target.value})} required />
            <label>BOOKED BY</label>
            <input name="booked_by" value={formData.booked_by} onChange={(e) => setFormData({...formData, booked_by: e.target.value})} required />
            <label>DESIGNATION</label>
            <input name="designation" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} required />
            <label>EVENT NAME</label>
            <input name="event_name" value={formData.event_name} onChange={(e) => setFormData({...formData, event_name: e.target.value})} required />
            <label>BOOKING DATE</label>
            <input type="date" name="booking_date" value={formData.booking_date} onChange={(e) => setFormData({...formData, booking_date: e.target.value})} required />
            <button type="submit"> BOOK NOW </button>
          </form>
        </div>

        {/* History Section */}
        <div className="history-container" style={{ marginTop: '30px' }}>
          <h2 style={{textAlign: 'center', color: '#ffcc00'}}>Booking History</h2>
          <table>
            <thead>
              <tr><th>Hall Name</th><th>Booked By</th><th>Designation</th><th>Event Name</th><th>Booking Date</th></tr>
            </thead>
            <tbody>
              {history.map((row) => (
                <tr key={row.id}>
                  <td>{row.hall_name}</td><td>{row.booked_by}</td><td>{row.designation}</td><td>{row.event_name}</td><td>{row.booking_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;