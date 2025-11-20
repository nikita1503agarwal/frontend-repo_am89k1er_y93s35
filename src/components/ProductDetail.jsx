import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductDetail({ slug }) {
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState('')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${slug}`)
      .then(r=>r.json()).then(setData).catch(()=>{})
  }, [slug])

  if (!data) return <div className="mx-auto max-w-7xl px-6 py-16 text-slate-300">Loading…</div>
  const { product, related } = data
  const price = (product.price + (product.variants?.find(v=>`${v.name}:${v.value}`===selected)?.price_delta || 0)).toFixed(2)

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="grid grid-cols-3 gap-3">
          {product.images?.map((src, i)=>(
            <img key={i} src={src} className="aspect-square w-full rounded-xl object-cover" />
          ))}
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-white">{product.title}</h1>
          <div className="mt-1 text-sm text-slate-400">{product.rating} ★ ({product.rating_count})</div>
          <div className="mt-4 text-3xl font-semibold text-emerald-400">${price}</div>
          <p className="mt-4 text-slate-300">{product.description}</p>

          {product.variants?.length > 0 && (
            <div className="mt-6">
              <div className="mb-2 text-sm text-slate-300">Variants</div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => {
                  const key = `${v.name}:${v.value}`
                  const active = selected === key
                  return (
                    <button key={key} onClick={()=>setSelected(key)} className={`rounded-lg border px-3 py-1 text-sm ${active? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-white/10 text-white/80 hover:bg-white/10'}`}>
                      {v.value}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <input type="number" min={1} value={qty} onChange={e=>setQty(parseInt(e.target.value||'1'))} className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
            <button className="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-slate-950">Add to cart</button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="mb-4 text-lg font-semibold text-white">Related items</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {related?.map(r => <ProductCard key={r.id} item={r} />)}
        </div>
      </div>
    </div>
  )
}
