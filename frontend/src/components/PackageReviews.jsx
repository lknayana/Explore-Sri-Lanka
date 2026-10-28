
import { useEffect, useState } from 'react'
import './PackageReviews.css'

function PackageReviews({ packageId }) {
    const [reviews, setReviews] = useState([])
    const [reviewerName, setReviewerName] = useState('')
    const [rating, setRating] = useState('5')
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)

    async function loadReviews() {
        try {
            const response = await fetch(
                `http://localhost:5000/api/packages/${packageId}/reviews`
            )

            if (!response.ok) {
                throw new Error('Could not load reviews')
            }

            const data = await response.json()
            setReviews(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (packageId) {
            setLoading(true)
            setError('')
            loadReviews()
        }
    }, [packageId])

    async function submitReview(e) {
        e.preventDefault()
        setError('')
        setMessage('')
        setSubmitting(true)

        try {
            const response = await fetch(
                `http://localhost:5000/api/packages/${packageId}/reviews`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reviewerName,
                        rating: Number(rating),
                        comment
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Could not submit review')
            }

            setMessage('Your review was submitted successfully!')
            setReviewerName('')
            setRating('5')
            setComment('')
            setShowReviewForm(false)

            await loadReviews()

        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    const averageRating = reviews.length > 0
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0)
            / reviews.length
        ).toFixed(1)
        : null

    return (
        <section className="package-reviews">


            <div className="reviews-heading">
                <div>
                    <h2>Visitor Reviews & Ratings</h2>
                    <p>
                        Read what visitors have shared about this tour.
                    </p>
                </div>

                <button
                    type="button"
                    className="write-review-button"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    aria-expanded={showReviewForm}
                >
                    {showReviewForm ? 'Close Form' : 'Write a Review'}
                </button>
            </div>


            {averageRating && (
                <div className="reviews-summary">
                    <span className="reviews-average">
                        {averageRating} / 5
                    </span>

                    <span className="reviews-stars">
                        {'★'.repeat(Math.round(Number(averageRating)))}
                        {'☆'.repeat(5 - Math.round(Number(averageRating)))}
                    </span>

                    <p>{reviews.length} visitor review(s)</p>
                </div>
            )}

            {loading && <p>Loading reviews...</p>}

            {!loading && reviews.length === 0 && !error && (
                <p className="reviews-empty">
                    No reviews yet. Be the first to share your experience.
                </p>
            )}

            <div className="reviews-list">
                {reviews.map(review => (
                    <div className="review-card" key={review._id}>

                        <div className="review-card-top">
                            <strong>{review.reviewerName}</strong>

                            <span className="review-rating">
                                {'★'.repeat(review.rating)}
                                {'☆'.repeat(5 - review.rating)}
                            </span>
                        </div>

                        <p>{review.comment}</p>

                        <small>
                            {new Date(review.createdAt).toLocaleDateString()}
                        </small>

                    </div>
                ))}
            </div>

            {showReviewForm && (
                <div className="review-form-section">
                    <h3>Write a Review</h3>

                    <p>
                        Share your opinion about this tour package.
                    </p>

                    {message && (
                        <p className="review-success" role="status">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="review-error" role="alert">
                            {error}
                        </p>
                    )}

                    <form onSubmit={submitReview} className="review-form">

                        <label htmlFor="review-name">Your Name</label>
                        <input
                            id="review-name"
                            type="text"
                            value={reviewerName}
                            onChange={e => setReviewerName(e.target.value)}
                            minLength="2"
                            maxLength="60"
                            required
                            placeholder="Enter your name"
                        />

                        <label htmlFor="review-rating">Your Rating</label>
                        <select
                            id="review-rating"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            required
                        >
                            <option value="5">★★★★★ - Excellent</option>
                            <option value="4">★★★★☆ - Very Good</option>
                            <option value="3">★★★☆☆ - Good</option>
                            <option value="2">★★☆☆☆ - Fair</option>
                            <option value="1">★☆☆☆☆ - Poor</option>
                        </select>

                        <label htmlFor="review-comment">Your Review</label>
                        <textarea
                            id="review-comment"
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            minLength="5"
                            maxLength="500"
                            rows="4"
                            required
                            placeholder="Write your review here..."
                        />

                        <button type="submit" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>

                    </form>

                    <p className="review-note">
                        Reviews are submitted by visitors and are not
                        verified as completed tour bookings.
                    </p>
                </div>
            )}

        </section>
    )
}

export default PackageReviews
