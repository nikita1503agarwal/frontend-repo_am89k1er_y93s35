import React from 'react'
import { Search, ShoppingCart, User } from 'lucide-react'

export default function Navbar({ cartCount = 0, onSearch }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold text-white">Cardly</a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="/#shop" className="text-slate-300 hover:text-white">Shop</a>
          <a href="/#categories" className="text-slate-300 hover:text-white">Categories</a>
          <a href="/account" className="text-slate-300 hover:text-white">Account</a>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input onChange={(e)=>onSearch?.(e.target.value)} placeholder="Search products" className="w-72 rounded-lg border border-white/10 bg-slate-900/70 px-10 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
          <a href="/cart" className="relative rounded-lg border border-white/10 p-2 text-white hover:bg-white/10">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1 text-xs text-slate-950">{cartCount}</span>}
          </a>
          <a href="/login" className="rounded-lg border border-white/10 p-2 text-white hover:bg-white/10">
            <User size={20} />
          </a>
        </div>
      </div>
    </header>
  )
}
