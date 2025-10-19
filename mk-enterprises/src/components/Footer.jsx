import React from 'react'
import { Instagram, Facebook, Linkedin, Youtube, MessageSquare, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer fade-in-up">
      <div className="container footer-inner">
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="socials">
            <a aria-label="instagram"><Instagram /></a>
            <a aria-label="facebook"><Facebook /></a>
            <a aria-label="linkedin"><Linkedin /></a>
            <a aria-label="youtube"><Youtube /></a>
            <a aria-label="email"><Mail /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <a href='mailto:email@example.com'>email@example.com</a>
          <a href='tel:+919833167554'>+91 98331 67554</a>
          <a href='https://maps.app.goo.gl/kgrkWtGJN6PEPu5d7'>123, Sample Street, City</a>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="quick-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} M.K. Enterprises. All rights reserved.
      </div>
    </footer>
  )
}