
import { Link } from 'react-router-dom'
import './Destinations.css'

function Destinations() {
    const destinations = [
        {
            name: 'Kandy',
            image: '/images/kandy.jpeg',
            description: 'Discover the cultural heritage of Sri Lanka, including the Temple of the Tooth and beautiful hill-country surroundings.'
        },
        {
            name: 'Ella',
            image: '/images/hero.jpg',
            description: 'Enjoy breathtaking mountain views, tea plantations and the famous Nine Arch Bridge.'
        },
        {
            name: 'Sigiriya',
            image: '/images/sigiriya.jpg',
            description: 'Explore the ancient Sigiriya Rock Fortress and experience Sri Lanka’s rich history.'
        },
        {
            name: 'Galle',
            image: '/images/galle.jpg',
            description: 'Visit the historic Galle Fort, colonial streets and beautiful southern coastline.'
        },
        {
            name: 'Colombo',
            image: '/images/colombo.jpg',
            description: 'Experience the vibrant capital city with modern attractions, markets and cultural landmarks.'
        },
        {
            name: 'Mirissa',
            image: '/images/mirissa.jpg',
            description: 'Relax on tropical beaches and enjoy the peaceful atmosphere of Sri Lanka’s southern coast.'
        }
    ]

    return (
        <div className="destinations-page">

            <section className="destinations-banner">
                <h1>Discover Sri Lanka</h1>
                <p>Explore the most beautiful destinations across the island</p>
            </section>

            <section className="destinations-intro">
                <h2>Popular Destinations</h2>
                <p>
                    From cultural cities and ancient landmarks to
                    misty mountains and golden beaches, Sri Lanka
                    offers unforgettable experiences for every traveller.
                </p>
            </section>

            <section className="destinations-container">
                {destinations.map(destination => (
                    <div className="destination-card" key={destination.name}>

                        <img
                            src={destination.image}
                            alt={destination.name}
                        />

                        <div className="destination-content">
                            <h2>{destination.name}</h2>
                            <p>{destination.description}</p>
                        </div>

                    </div>
                ))}
            </section>

            <section className="destinations-cta">
                <h2>Ready to Explore Sri Lanka?</h2>
                <p>Discover our carefully planned tour packages.</p>

                <Link to="/packages" className="destination-button">
                    Explore Tour Packages
                </Link>
            </section>

        </div>
    )
}

export default Destinations
