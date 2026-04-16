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
//     const result = await pool.query('SELECT * FROM event_types ORDER BY created_at DESC');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/', async (req, res) => {
//   const { title, description, duration, slug } = req.body;
//   try {
//     const result = await pool.query(
//       'INSERT INTO event_types (title, description, duration, slug) VALUES ($1, $2, $3, $4) RETURNING *',
//       [title, description, duration, slug]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, duration, slug } = req.body;
//   try {
//     const result = await pool.query(
//       'UPDATE event_types SET title = $1, description = $2, duration = $3, slug = $4 WHERE id = $5 RETURNING *',
//       [title, description, duration, slug, id]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query('DELETE FROM event_types WHERE id = $1', [id]);
//     res.json({ message: 'Event type deleted' });
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

  // ✅ REQUIRED for Neon
  ssl: {
    rejectUnauthorized: false,
  },
});

// Get all event types
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM event_types ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

// Create event type
router.post('/', async (req, res) => {
  const { title, description, duration, slug } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO event_types (title, description, duration, slug) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, duration, slug]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err); // ✅ ADDED

    // ⚠️ HANDLE duplicate slug (important for frontend UX)
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Slug already exists' });
    }

    res.status(500).json({ error: err.message });
  }
});

// Update event type
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, slug } = req.body;

  try {
    const result = await pool.query(
      'UPDATE event_types SET title = $1, description = $2, duration = $3, slug = $4 WHERE id = $5 RETURNING *',
      [title, description, duration, slug, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

// Delete event type
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM event_types WHERE id = $1', [id]);
    res.json({ message: 'Event type deleted' });

  } catch (err) {
    console.error(err); // ✅ ADDED
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;