import { useEffect, useState } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('https://scaler-cal.onrender.com/api/bookings')
      .then(res => res.json())
      .then(setBookings);
  }, []);

  const cancelBooking = (id) => {
    fetch(`https://scaler-cal.onrender.com/api/bookings/${id}`, { method: 'DELETE' })
      .then(() => setBookings(bookings.filter(b => b.id !== id)));
  };

  return (
    <div className="container">
      <h1>Bookings</h1>
      {bookings.map((b) => (
        <div key={b.id} className="card">
          <h3>{b.title}</h3>
          <p>{b.name} - {b.email}</p>
          <p>{b.date} at {b.time}</p>
          <button onClick={() => cancelBooking(b.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}