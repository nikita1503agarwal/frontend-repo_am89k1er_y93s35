import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AccountPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  const [me, setMe] = useState(null)

  const login = async () => {
    const body = new URLSearchParams({ username: email, password })
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body })
    const data = await res.json()
    if (data.access_token){ setToken(data.access_token); localStorage.setItem('token', data.access_token) }
  }

  const fetchMe = async () => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/me`, { headers: { Authorization: `Bearer ${token}` }})
    if (res.ok) setMe(await res.json())
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="mb-6 text-2xl font-semibold">Your Account</h1>
        {!token ? (
          <div className="max-w-md space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
            <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white" />
            <button onClick={login} className="w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950">Log in</button>
          </div>
        ) : (
          <div className="space-y-4">
            <button onClick={fetchMe} className="rounded-lg border border-white/10 px-3 py-2">Load profile</button>
            {me && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium">{me.name}</div>
                <div className="text-sm text-slate-400">{me.email}</div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
