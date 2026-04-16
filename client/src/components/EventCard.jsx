import { Link } from "react-router-dom";

export default function EventCard({ event, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${event.title}"?`)) {
      onDelete(event.id);
    }
  };

  return (
    <div className="card event-card">
      <div className="event-card-top">
        <div>
          <h3>{event.title}</h3>
          <p className="event-duration">{event.duration} min</p>
        </div>
        <span className="event-badge">Live</span>
      </div>

      <p className="event-description">{event.description}</p>

      <div className="event-card-actions">
        <Link to={`/book/${event.slug}`}>
          <button className="btn-secondary">View Booking Page</button>
        </Link>
        <button onClick={handleDelete} className="btn-secondary btn-secondary-muted">
          Delete
        </button>
      </div>
    </div>
  );
}