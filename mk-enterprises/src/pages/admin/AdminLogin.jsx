import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import axios from 'axios'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'react-toastify'

export default function AdminLogin() {
  const [admin, setAdmin] = useState({
    userName: '',
    password: ''
  })

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target; 
    setAdmin({ ...admin, [name]: value });
  }

  const handleAdminAuth = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      const {status} = await axios.post(`${import.meta.env.VITE_APP_URL}/auth/isAdmin`, {
        user: admin.userName,
        pass: admin.password
      })

      if (status === 200) {
        sessionStorage.setItem('admin_auth', '1')
        navigate('/admin/dashboard')
      } else {
        toast.warn('Invalid credentials')
      }
    } catch (error) {
      console.error('Error during admin authentication:', error);
      toast.warn('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page auth-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <div className="auth-card scale-up">
          <h2>Admin Login</h2>
          <form onSubmit={handleAdminAuth}>
            <label>
              Username
              <input value={admin.userName} name='userName' onChange={handleInputChange} required />
            </label>
            <label>
              Password
              <input type="password" value={admin.password} name='password' onChange={handleInputChange} required />
            </label>
            <button className="btn" type="submit" disabled={loading}>
              {
                loading && <LoaderCircle className="spin-animation" height={20} width={20} />
              }
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}