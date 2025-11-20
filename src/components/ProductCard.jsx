import React from 'react'

export default function ProductCard({ item }) {
  const price = item.price?.toFixed(2)
  return (
    <a href={`/product/${item.slug}`} className="group rounded-2xl border border-white/10 bg-white/5 p-3 hover:bg-white/10">
      <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-900">
        <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1605901309584-818e25960a8b?w=600&q=80&auto=format&fit=crop'} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="mt-3 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{item.title}</h3>
          <span className="text-emerald-400">${price}</span>
        </div>
        <div className="text-xs text-slate-400">{item.rating || 0} ★ ({item.rating_count || 0})</div>
      </div>
    </a>
  )
}
