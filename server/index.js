require('dotenv').config(); // here

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');


const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


app.use('/api/event-types', require('./routes/eventTypes'));
app.use('/api/availability', require('./routes/availability'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/', (req, res) => res.send('Cal.com Clone API'));


app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));