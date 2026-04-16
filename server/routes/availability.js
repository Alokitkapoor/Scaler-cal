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
//     await pool.query(`
//       DELETE FROM availability a
//       USING availability b
//       WHERE a.id > b.id
//         AND a.day_of_week = b.day_of_week
//         AND a.start_time = b.start_time
//         AND a.end_time = b.end_time
//         AND a.timezone = b.timezone;
//     `);

//     const result = await pool.query('SELECT * FROM availability ORDER BY day_of_week, start_time, end_time');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   const { availability } = req.body;
//   try {
//     await pool.query('DELETE FROM availability');
//     for (const a of availability) {
//       await pool.query(
//         'INSERT INTO availability (day_of_week, start_time, end_time, timezone) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
//         [a.day_of_week, a.start_time, a.end_time, a.timezone || 'UTC']
//       );
//     }
//     res.json({ message: 'Availability updated' });
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

  ssl: {
    rejectUnauthorized: false,
  },
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM availability ORDER BY day_of_week, start_time, end_time'
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  const { availability } = req.body;

  try {
    await pool.query('DELETE FROM availability');

    for (const a of availability) {
      await pool.query(
        'INSERT INTO availability (day_of_week, start_time, end_time, timezone) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [a.day_of_week, a.start_time, a.end_time, a.timezone || 'UTC']
      );
    }

    res.json({ message: 'Availability updated' });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;