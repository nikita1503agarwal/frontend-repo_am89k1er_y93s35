import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

export default function Shop() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ q: '', category: '', sort: 'rating_desc', min_price: '', max_price: '' })

  const fetchProducts = () => {
    setLoading(true)
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.append(k, v)
    })
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?${params.toString()}`)
      .then(r => r.json())
      .then(res => { setItems(res.items || []); setTotal(res.total || 0) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProducts() }, [])

  const apply = (e) => { e.preventDefault(); fetchProducts() }

  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-semibold text-white">Shop</h2>
        <div className="text-sm text-slate-400">{total} items</div>
      </div>

      <form onSubmit={apply} className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
        <input value={filters.q} onChange={e=>setFilters(f=>({...f, q:e.target.value}))} placeholder="Search" className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 md:col-span-2" />
        <input value={filters.min_price} onChange={e=>setFilters(f=>({...f, min_price:e.target.value}))} placeholder="Min price" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400" />
        <input value={filters.max_price} onChange={e=>setFilters(f=>({...f, max_price:e.target.value}))} placeholder="Max price" className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400" />
        <select value={filters.sort} onChange={e=>setFilters(f=>({...f, sort:e.target.value}))} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white">
          <option value="rating_desc">Top rated</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
        <button className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950">Apply</button>
      </form>

      {loading ? (
        <div className="text-slate-400">Loading…</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      )}
    </section>
  )
}
