import Destinations from './pages/Destinations'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'
import Packages from './pages/Packages'
import PackageDetails from './pages/PackageDetails'
import BookingForm from './pages/BookingForm'
import AdminLogin from './pages/AdminLogin'
import ManageBookings from './pages/ManageBookings'


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/booking/:id" element={<BookingForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/bookings" element={<ManageBookings />} />
        <Route path="/destinations" element={<Destinations />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
