
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'
import Packages from './pages/Packages'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
