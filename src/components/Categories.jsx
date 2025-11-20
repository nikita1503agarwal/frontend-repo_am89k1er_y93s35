import React, { useEffect, useState } from 'react'

export default function Categories() {
  const [cats, setCats] = useState([])
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`).then(r=>r.json()).then(setCats).catch(()=>{})
  }, [])
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-white">Shop by category</h2>
        <a href="/shop" className="text-sm text-emerald-400">View all</a>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cats.map(c => (
          <a key={c.slug} href={`/shop?category=${c.slug}`} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img src={c.image || 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=80&auto=format&fit=crop'} alt={c.name} className="h-48 w-full object-cover opacity-80 transition group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="text-lg font-medium">{c.name}</div>
              <div className="text-xs text-slate-300">Explore</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
