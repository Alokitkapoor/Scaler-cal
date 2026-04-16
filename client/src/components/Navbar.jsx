import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-brand">
        <h2>Cal Clone</h2>
        <p>Schedule bookings with ease</p>
      </div>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/create">Create</Link>
        <Link to="/availability">Availability</Link>
        <Link to="/bookings">Bookings</Link>
      </div>
    </nav>
  );
}