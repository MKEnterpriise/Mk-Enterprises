import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  LogIn,
  Home,
  Server,
  CircleUserRound,
} from "lucide-react";
import { MyContext } from "../context/ContextProvider";
import logo from "../assets/logos.png";
import Cookies from "js-cookie";

export default function Header({ showLogin = true }) {
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(MyContext);

  const handleAuth = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      Cookies.remove("token");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (window.innerWidth > "767px") {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <header className="site-header fade-in">
      <div className="container header-inner">
        {isMobile ? (
          <div className="brand" onClick={() => navigate("/")}>
            <img src={logo} style={{ width: "40px" }} />
            <span className="brand-text">M K E</span>
          </div>
        ) : (
          <div className="brand" onClick={() => navigate("/")}>
            <img src={logo} style={{ width: "80px" }} />
            <span className="brand-text">M K Enterprises</span>
          </div>
        )}

        <nav className="main-nav">
          <NavLink
          onClick={() => document.body.classList.remove("nav-open")}
            to="/"
            className="nav-link"
            style={{ display: "flex", gap: "8px" }}
          >
            <Home size={20} /> Home
          </NavLink>
          <NavLink
          onClick={() => document.body.classList.remove("nav-open")}
            to="/about"
            className="nav-link"
            style={{ display: "flex", gap: "8px" }}
          >
            <CircleUserRound size={20} />
            About
          </NavLink>
          <NavLink
          onClick={() => document.body.classList.remove("nav-open")}
            to="/services"
            className="nav-link"
            style={{ display: "flex", gap: "8px" }}
          >
            <Server size={20} />
            Services
          </NavLink>
        </nav>

        <div className="nav-right">
          <NavLink to="/search" className="icon-btn" aria-label="search">
            <Search size={16} color="#9aa4b2  " />
          </NavLink>
          <NavLink to="/wishlist" className="icon-btn" aria-label="wishlist">
            <Heart size={16} color="#9aa4b2 " />
          </NavLink>
          {showLogin && (
            <button
              className="login-link"
              aria-label="admin"
              onClick={handleAuth}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          )}
          {/* {showLogin && <Link to="/admin" className="login-link" aria-label="admin">Admin</Link>} */}
          <button
            className="hamburger"
            onClick={() => document.body.classList.toggle("nav-open")}
            aria-label="menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
