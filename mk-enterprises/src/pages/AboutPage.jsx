import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="page about-page">
      <Header showLogin={true} />
      <main className="container main fade-in">
        <section>
          <h1>About Us</h1>
          <p>We curate a selection of quality items, focusing on design, comfort and sustainability.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}