import { useState } from "react";

export default function BookingForm({ time, date, eventId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://scaler-cal.onrender.com/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type_id: eventId,
        name: form.name,
        email: form.email,
        date: date.format('YYYY-MM-DD'),
        time,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) alert(data.error);
        else alert('Booking confirmed!');
      });
  };

  return (
    <div>
      <h3>Confirm Booking</h3>
      <p>{date.format('DD MMM YYYY')} at {time}</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}