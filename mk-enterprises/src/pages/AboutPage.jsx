import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page about-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          {/* <h1>About Us</h1> */}
          <h1 className="about-title">MK ENTERPRISES</h1>
          <p className="about-title1">
            Leading Manufacturer of ABS Plastic Enclosures
          </p>

          <div className="location">
            <MapPin className="w-5 h-5" />
            <span>Mumbai, Maharashtra</span>
          </div>
          <br />
          <p className="about-description">
            MK ENTERPRISES is a leading manufacturer and supplier of
            high-quality ABS plastic enclosures and custom plastic-moulded
            parts. With over 5 years of experience, we provide robust, reliable,
            and cost-effective housing solutions for the electronics,
            electrical, and industrial sectors. .
          </p>

          <div class="about-card">
            <ul>
              <li>
                <strong>Legal Status:</strong> MK ENTERPRISES – PROPRIETORSHIP
              </li>
              <li>
                <strong>Year Established:</strong> 2020
              </li>
              <li>
                <strong>Headquarters:</strong> Mumbai, Maharashtra
              </li>
              <li>
                <strong>Nature of Business:</strong> Manufacturer, supplier and
                importer of ABS PLASTIC ENCLOSURE
              </li>
            </ul>
          </div>
          <div class="about-grid">
            <div class="about-box">
              <h2>Our Mission</h2>
              <p>
                To deliver superior ABS plastic enclosure solutions that enable
                innovation and ensure the integrity of our clients' products. We
                achieve this through meticulous design, advanced manufacturing,
                and unparalleled customer support.
              </p>
            </div>

            <div class="about-box">
              <h2>Our Vision</h2>
              <p>
                To be the most trusted and innovative provider of plastic
                enclosure solutions, known for our quality, customization
                capabilities, and technical expertise.
              </p>
            </div>
          </div>

          {/* <div class="about-footer">
            <h3>Client Portfolio</h3>
            <p>
              We have developed strong partnerships with leading companies
              across various industries such as telecommunications, consumer
              electronics, and automotive.
            </p>
          </div> */}
        </section>
      </main>
      <Footer />
    </div>
  );
}
