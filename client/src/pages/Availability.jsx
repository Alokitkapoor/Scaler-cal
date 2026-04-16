import { useEffect, useState } from "react";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timezones = ['UTC', 'EST', 'CST', 'MST', 'PST', 'IST', 'GMT', 'CET', 'AET'];

export default function Availability() {
  const [availability, setAvailability] = useState([]);
  const [timezone, setTimezone] = useState('UTC');

  useEffect(() => {
    fetch('https://scaler-cal.onrender.com/api/availability')
      .then(res => res.json())
      .then(data => {
        setAvailability(data);
        if (data.length > 0 && data[0].timezone) {
          setTimezone(data[0].timezone);
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWithTimezone = availability.map(a => ({ ...a, timezone }));
    fetch('https://scaler-cal.onrender.com/api/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ availability: dataWithTimezone }),
    })
      .then(res => res.json())
      .then(() => alert('Availability updated'));
  };

  const updateSlot = (index, field, value) => {
    const newAvail = [...availability];
    newAvail[index][field] = value;
    setAvailability(newAvail);
  };

  const addSlot = () => {
    setAvailability([...availability, { day_of_week: 1, start_time: '09:00', end_time: '17:00', timezone }]);
  };

  const removeSlot = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="availability-header">
        <h1>Set Availability</h1>
        <p className="availability-subtitle">Define your weekly booking windows with clarity and style.</p>
      </div>

      <form onSubmit={handleSubmit} className="availability-form">
        <div className="timezone-wrapper">
          <label className="timezone-label">🌍 Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="timezone-select"
          >
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
          <p className="timezone-info">All availability times are saved in {timezone}.</p>
        </div>

        <div className="slots-section">
          <div className="slots-header">
            <h3>Availability Slots</h3>
            <span className="slot-count">{availability.length} slot{availability.length !== 1 ? 's' : ''}</span>
          </div>

          {availability.length === 0 ? (
            <div className="empty-state">
              <p>No availability slots set yet.</p>
              <p className="empty-info">Add a slot to make your booking page live.</p>
            </div>
          ) : (
            <div className="slots-list">
              {availability.map((slot, index) => (
                <div key={index} className="slot-card">
                  <div className="slot-number">{index + 1}</div>
                  <div className="slot-content">
                    <select
                      value={slot.day_of_week}
                      onChange={(e) => updateSlot(index, 'day_of_week', parseInt(e.target.value, 10))}
                      className="day-select"
                    >
                      {days.map((day, idx) => (
                        <option key={idx} value={idx}>{day}</option>
                      ))}
                    </select>

                    <div className="time-inputs">
                      <div className="time-group">
                        <label className="time-label">From</label>
                        <input
                          type="time"
                          value={slot.start_time}
                          onChange={(e) => updateSlot(index, 'start_time', e.target.value)}
                          className="time-input"
                        />
                      </div>
                      <div className="time-group">
                        <label className="time-label">To</label>
                        <input
                          type="time"
                          value={slot.end_time}
                          onChange={(e) => updateSlot(index, 'end_time', e.target.value)}
                          className="time-input"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    className="btn-remove"
                    title="Remove this slot"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="actions-buttons">
          <button type="button" onClick={addSlot} className="btn-add">+ Add Slot</button>
          <button type="submit" className="btn-save">Save Changes</button>
        </div>
      </form>
    </div>
  );
}