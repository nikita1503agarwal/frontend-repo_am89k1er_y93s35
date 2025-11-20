import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CartPage(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    const c = JSON.parse(localStorage.getItem('cart')||'[]')
    setItems(c)
  },[])

  const updateQty = (index, qty)=>{
    const next = [...items]
    next[index].qty = Math.max(1, qty)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const removeItem = (index)=>{
    const next = items.filter((_,i)=>i!==index)
    setItems(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-slate-400">Your cart is empty.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {items.map((it, idx)=> (
                <div key={idx} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                  <img src={it.image} className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{it.title}</div>
                    {it.variant && <div className="text-xs text-slate-400">{it.variant}</div>}
                    <div className="text-emerald-400">${it.price.toFixed(2)}</div>
                  </div>
                  <input type="number" min={1} value={it.qty} onChange={e=>updateQty(idx, parseInt(e.target.value||'1'))} className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
                  <button onClick={()=>removeItem(idx)} className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/10">Remove</button>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 h-max">
              <div className="mb-2 flex items-center justify-between"><span className="text-slate-400">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
              <a href="/checkout" className="mt-4 block rounded-lg bg-emerald-500 px-4 py-2 text-center font-medium text-slate-950">Checkout</a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
