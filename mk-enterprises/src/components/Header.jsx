import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, LogIn, Home } from 'lucide-react'
import { MyContext } from '../context/ContextProvider'
import Cookies from 'js-cookie';

export default function Header({ showLogin = true }) {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);

  const handleAuth = () => {
    if(isLoggedIn) {
      setIsLoggedIn(false)
      Cookies.remove('token')
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    if(window.innerWidth > '767px') {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [])

  return (
    <header className="site-header fade-in">
      <div className="container header-inner">
        {
          isMobile ? <div className="brand" onClick={() => navigate('/')}>
                      <Home size={25} /> <span className="brand-text">M.K. E</span>
                    </div> : 
                    <div className="brand" onClick={() => navigate('/')}>
                      <Home size={25} /> <span className="brand-text">M.K. Enterprises</span>
                    </div>
        }

        <nav className="main-nav">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/services" className="nav-link">Services</NavLink>
        </nav>

        <div className="nav-right">
          <NavLink to="/search" className="icon-btn" aria-label="search"><Search size={16} color='#9aa4b2  '/></NavLink>
          <NavLink to="/wishlist" className="icon-btn" aria-label="wishlist"><Heart size={16} color='#9aa4b2 '/></NavLink>
          {showLogin && <button className="login-link" aria-label="admin" onClick={handleAuth}>{isLoggedIn ? 'Logout' : 'Login'}</button>}
          {/* {showLogin && <Link to="/admin" className="login-link" aria-label="admin">Admin</Link>} */}
          <button className="hamburger" onClick={() => document.body.classList.toggle('nav-open')} aria-label="menu">☰</button>
        </div>
      </div>
    </header>
  )
}