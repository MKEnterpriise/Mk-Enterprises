import React from "react";
import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer fade-in-up">
      <div className="container footer-inner">
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="socials">
            <a aria-label="instagram">
              <Instagram />
            </a>
            <a aria-label="facebook">
              <Facebook />
            </a>
            <a aria-label="linkedin">
              <Linkedin />
            </a>
            <a aria-label="youtube">
              <Youtube />
            </a>
            {/* <a aria-label="email">
              <Mail />
            </a> */}
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <br />
          <div style={{ display: "flex", gap: "8px" }}>
            <Mail />
            <a href="mailto:mkenterprisesenclosures@gmail.com">
              mkenterprisesenclosures@gmail.com
            </a>
          </div>
          <br />
          <div style={{ display: "flex", gap: "8px" }}>
            <Phone />
            <a href="tel:+919987049236">+91 99870 49236</a>
          </div>
          <br />
          <div style={{ display: "flex", gap: "8px" }}>
            <MapPin style={{ width: "120px" }} />
            <a href="https://share.google/R3LLW9heKdyQA5UHn">
              MK ENTERPRISES Floor No., K 5, Building No./Flat No. R No. 403,
              Anand Gad Parksite Colony, Opp. Flour Mill, PSM Colony, Sub Post
              Office, Vikhroli-400079 Mumbai, Maharashtra GSTIN/UIN :
              27AKLPR7003D1Z7 State Name : Maharashtra, Code : 27
            </a>
          </div>
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
  );
}