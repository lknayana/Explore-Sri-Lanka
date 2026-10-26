
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

function AdminLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e) {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Login failed')
            }

            sessionStorage.setItem('adminToken', data.token)

            navigate('/admin')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleLogin}>
                <h1>Admin Login</h1>
                <p>Explore Sri Lanka Management System</p>

                {error && <p className="login-error">{error}</p>}

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default AdminLogin
