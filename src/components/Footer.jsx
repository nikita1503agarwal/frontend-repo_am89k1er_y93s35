import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-6 py-10 text-slate-400">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-white">Cardly</div>
          <div className="text-sm">© {new Date().getFullYear()} Cardly. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
