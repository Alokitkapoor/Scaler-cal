import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Availability from "./pages/Availability";
import BookingPage from "./pages/BookingPage";
import Bookings from "./pages/Bookings";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/book/:slug" element={<BookingPage />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}