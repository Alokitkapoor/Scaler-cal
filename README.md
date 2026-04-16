# Cal.com Clone

A functional scheduling/booking web application that replicates Cal.com's design and user experience.

## Tech Stack
- Frontend: React.js with Vite
- Backend: Node.js with Express.js
- Database: PostgreSQL

## Setup

### Prerequisites
- Node.js
- PostgreSQL

### Backend Setup
1. cd server
2. npm install
3. Create a PostgreSQL database named 'calclone'
4. Update .env with your DATABASE_URL (e.g., postgresql://username:password@localhost:5432/calclone)
5. Run schema.sql to create tables
6. npm run dev

### Frontend Setup
1. cd client
2. npm install
3. npm run dev

## Features
- Event Types Management
- Availability Settings
- Public Booking Page
- Bookings Dashboard

## API Endpoints
- GET /api/event-types
- POST /api/event-types
- PUT /api/event-types/:id
- DELETE /api/event-types/:id
- GET /api/availability
- POST /api/availability
- GET /api/bookings
- POST /api/bookings
- DELETE /api/bookings/:id
- GET /api/bookings/available/:slug/:date