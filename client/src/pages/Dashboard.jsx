import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://scaler-cal.onrender.com/api/event-types')
      .then(res => res.json())
      .then(setEvents);
  }, []);

  const handleDelete = (id) => {
    fetch(`https://scaler-cal.onrender.com/api/event-types/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setEvents(events.filter(e => e.id !== id));
        alert('Event deleted');
      })
      .catch(err => alert('Error deleting event'));
  };

  return (
    <div className="container dashboard-page">
      <section className="dashboard-header">
        <div>
          <p className="eyebrow">Event Types</p>
          <h1>Your booking flows, simplified.</h1>
          <p className="dashboard-copy">Manage your event types and booking pages from a single elegant dashboard.</p>
        </div>
        <div className="dashboard-actions">
          <span className="dashboard-pill">{events.length} event type{events.length !== 1 ? 's' : ''}</span>
          <Link to="/create" className="create-card">
            <span className="plus-sign">+</span>
            <div>
              <p className="create-label">Create event</p>
              <p className="create-subtitle">Add a booking type</p>
            </div>
          </Link>
        </div>
      </section>

      <div className="event-grid">
        {events.length === 0 ? (
          <div className="empty-state dashboard-empty">
            <p>No event types yet.</p>
            <p className="empty-info">Create your first event type to start accepting bookings.</p>
          </div>
        ) : (
          events.map((e) => (
            <EventCard key={e.id} event={e} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}