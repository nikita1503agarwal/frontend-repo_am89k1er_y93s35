import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CheckoutPage(){
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState({full_name:'', address_line1:'', address_line2:'', city:'', state:'', postal_code:'', country:''})
  const [loading, setLoading] = useState(false)
  const items = JSON.parse(localStorage.getItem('cart')||'[]')
  const subtotal = items.reduce((s,i)=> s + i.price * i.qty, 0)
  const shipping = subtotal > 100 ? 0 : 7.5
  const total = subtotal + shipping

  const placeOrder = async () => {
    setLoading(true)
    try {
      const body = {
        email,
        items: items.map(i=>({ product_id: i.id, title: i.title, price: i.price, quantity: i.qty, variant: i.variant, image: i.image })),
        subtotal, shipping, total,
        shipping_address: address
      }
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      alert(`Order placed! ID: ${data.order_id}`)
      localStorage.removeItem('cart')
      window.location.href = '/'
    } catch(e) {
      alert('Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-6 text-2xl font-semibold">Checkout</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4 md:col-span-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <label className="text-sm text-slate-300">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-2 font-medium">Shipping Address</div>
              {Object.keys(address).map(k=> (
                <div key={k} className="mb-3">
                  <label className="text-sm text-slate-300">{k.replace('_',' ')}</label>
                  <input value={address[k]} onChange={e=>setAddress(a=>({...a,[k]:e.target.value}))} className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
                </div>
              ))}
            </div>
          </div>
          <div className="h-max rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between"><span className="text-slate-400">Subtotal</span><span className="font-medium">${subtotal.toFixed(2)}</span></div>
            <div className="mb-2 flex items-center justify-between"><span className="text-slate-400">Shipping</span><span className="font-medium">${shipping.toFixed(2)}</span></div>
            <div className="mb-4 flex items-center justify-between"><span className="text-slate-400">Total</span><span className="text-lg font-semibold">${total.toFixed(2)}</span></div>
            <button disabled={loading} onClick={placeOrder} className="w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 disabled:opacity-60">{loading? 'Placing…' : 'Place order'}</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
