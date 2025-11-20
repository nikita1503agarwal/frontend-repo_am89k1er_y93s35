import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ShopSection from '../components/Shop'

export default function ShopPage(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <ShopSection />
      <Footer />
    </div>
  )
}
