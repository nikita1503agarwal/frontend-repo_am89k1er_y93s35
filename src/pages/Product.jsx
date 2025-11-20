import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductDetail from '../components/ProductDetail'
import { useParams } from 'react-router-dom'

export default function ProductPage(){
  const { slug } = useParams()
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <ProductDetail slug={slug} />
      <Footer />
    </div>
  )
}
