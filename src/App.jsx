import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import Shop from './components/Shop'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <Hero />
      <Categories />
      <Shop />
      <Footer />
    </div>
  )
}

export default App
