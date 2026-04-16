import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import TimeSlots from "../components/TimeSlots";
import BookingForm from "../components/BookingForm";

export default function BookingPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/event-types`)
      .then(res => res.json())
      .then(events => {
        const e = events.find(ev => ev.slug === slug);
        setEvent(e);
      });
  }, [slug]);

  useEffect(() => {
    if (date && event) {
      fetch(`http://localhost:5000/api/bookings/available/${slug}/${date.format('YYYY-MM-DD')}`)
        .then(res => res.json())
        .then(setAvailableSlots);
    }
  }, [date, event, slug]);

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="container">
      <div className="card booking-container">

        <div className="left-panel">
          <h2>{event.title}</h2>
          <p>{event.duration} min</p>
          <p>{event.description}</p>
        </div>

        <div className="right-panel">
          <Calendar onSelect={setDate} />

          {date && <TimeSlots slots={availableSlots} onSelect={setTime} />}

          {time && <BookingForm time={time} date={date} eventId={event.id} />}
        </div>

      </div>
    </div>
  );
}