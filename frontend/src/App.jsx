
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO PARADISE</p>

          <h1>Discover the Beauty of Sri Lanka</h1>

          <p>
            From golden beaches to misty mountains,
            your unforgettable journey begins here.
          </p>

          <a href="#welcome" className="hero-button">
            Discover More
          </a>
        </div>
      </section>

      <section className="welcome" id="welcome">
        <h2>Welcome to Explore Sri Lanka</h2>
        <p>
          Experience the beauty, culture and adventure of
          Sri Lanka with our carefully planned tour packages.
        </p>
      </section>
    </>
  )
}

export default App
