// const express = require('express');
// const { Pool } = require('pg');
// const router = express.Router();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT b.*, e.title, e.duration
//       FROM bookings b
//       JOIN event_types e ON b.event_type_id = e.id
//       ORDER BY b.date, b.time
//     `);
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   const { event_type_id, name, email, date, time } = req.body;
//   try {
//     const existing = await pool.query(
//       'SELECT * FROM bookings WHERE event_type_id = $1 AND date = $2 AND time = $3',
//       [event_type_id, date, time]
//     );
//     if (existing.rows.length > 0) {
//       return res.status(400).json({ error: 'Time slot already booked' });
//     }

//     const result = await pool.query(
//       'INSERT INTO bookings (event_type_id, name, email, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//       [event_type_id, name, email, date, time]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
//     res.json({ message: 'Booking cancelled' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/available/:slug/:date', async (req, res) => {
//   const { slug, date } = req.params;
//   try {
//     const event = await pool.query('SELECT * FROM event_types WHERE slug = $1', [slug]);
//     if (event.rows.length === 0) return res.status(404).json({ error: 'Event not found' });

//     const dayOfWeek = new Date(date).getDay();
//     const avail = await pool.query('SELECT * FROM availability WHERE day_of_week = $1', [dayOfWeek]);
//     if (avail.rows.length === 0) return res.json([]);

//     const start = avail.rows[0].start_time;
//     const end = avail.rows[0].end_time;
//     const duration = event.rows[0].duration;

//     const slots = [];
//     let current = new Date(`1970-01-01T${start}`);
//     const endTime = new Date(`1970-01-01T${end}`);
//     while (current < endTime) {
//       slots.push(current.toTimeString().slice(0, 5));
//       current.setMinutes(current.getMinutes() + duration);
//     }

//     const booked = await pool.query('SELECT time FROM bookings WHERE event_type_id = $1 AND date = $2', [event.rows[0].id, date]);
//     const bookedTimes = booked.rows.map(b => b.time);
//     const availableSlots = slots.filter(s => !bookedTimes.includes(s));

//     res.json(availableSlots);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // ✅ REQUIRED for Neon (keep this)
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, e.title, e.duration
      FROM bookings b
      JOIN event_types e ON b.event_type_id = e.id
      ORDER BY b.date, b.time
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

// Create booking
router.post('/', async (req, res) => {
  const { event_type_id, name, email, date, time } = req.body;

  try {
    const existing = await pool.query(
      'SELECT * FROM bookings WHERE event_type_id = $1 AND date = $2 AND time = $3',
      [event_type_id, date, time]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Time slot already booked' });
    }

    const result = await pool.query(
      'INSERT INTO bookings (event_type_id, name, email, date, time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [event_type_id, name, email, date, time]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM bookings WHERE id = $1', [id]);
    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

// Get available slots
router.get('/available/:slug/:date', async (req, res) => {
  const { slug, date } = req.params;

  try {
    const event = await pool.query(
      'SELECT * FROM event_types WHERE slug = $1',
      [slug]
    );

    if (event.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // ⚠️ FIX: ensure date parsing works correctly in deployment
    const dayOfWeek = new Date(date + 'T00:00:00').getDay();

    const avail = await pool.query(
      'SELECT * FROM availability WHERE day_of_week = $1',
      [dayOfWeek]
    );

    if (avail.rows.length === 0) return res.json([]);

    const start = avail.rows[0].start_time;
    const end = avail.rows[0].end_time;
    const duration = event.rows[0].duration;

    const slots = [];
    let current = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);

    while (current < endTime) {
      slots.push(current.toTimeString().slice(0, 5));
      current.setMinutes(current.getMinutes() + duration);
    }

    const booked = await pool.query(
      'SELECT time FROM bookings WHERE event_type_id = $1 AND date = $2',
      [event.rows[0].id, date]
    );

    const bookedTimes = booked.rows.map(b => b.time);

    const availableSlots = slots.filter(s => !bookedTimes.includes(s));

    res.json(availableSlots);

  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;