import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            New drop: Glass‑morphic Fintech Collection
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">
            Modern commerce for digital and physical cards
          </h1>
          <p className="mt-4 text-slate-300">
            A clean, fast storefront with immersive 3D, instant search, product variants, reviews, and a frictionless checkout.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#shop" className="rounded-xl bg-white/90 px-5 py-3 text-slate-900 shadow-lg shadow-white/10 hover:bg-white">
              Shop now
            </a>
            <a href="#categories" className="rounded-xl border border-white/20 px-5 py-3 text-white/90 hover:bg-white/10">
              Browse categories
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
