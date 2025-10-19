import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ServicesPage() {
  return (
    <div className="page services-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          <h1>Services</h1>
          <ul>
            <li>Worldwide shipping</li>
            <li>30-day returns</li>
            <li>Customer support</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}