-- Database schema for Cal.com Clone

CREATE TABLE IF NOT EXISTS event_types (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS availability (
  id SERIAL PRIMARY KEY,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  timezone VARCHAR(50) DEFAULT 'UTC',
  UNIQUE (day_of_week, start_time, end_time, timezone)
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  event_type_id INTEGER REFERENCES event_types(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO event_types (title, description, duration, slug) VALUES
('30 Min Meeting', 'Quick discussion call', 30, '30min'),
('1 Hour Consultation', 'Detailed consultation', 60, '1hour')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO availability (day_of_week, start_time, end_time, timezone) VALUES
(1, '09:00', '17:00', 'UTC'),
(2, '09:00', '17:00', 'UTC'),
(3, '09:00', '17:00', 'UTC'),
(4, '09:00', '17:00', 'UTC'),
(5, '09:00', '17:00', 'UTC')
ON CONFLICT DO NOTHING;

INSERT INTO bookings (event_type_id, name, email, date, time) VALUES
(1, 'John Doe', 'john@example.com', '2024-04-20', '10:00')
ON CONFLICT DO NOTHING;