'use client'
import { useState } from 'react'
import Link from 'next/link'

const links = [
  { label: 'Communities', href: '/communities' },
  { label: 'Hillshire Hollows', href: '/hsh' },
  { label: 'Membership', href: '/membership' },
  { label: 'Workshares', href: '/workshares' },
  { label: 'Media', href: '/media' },
  { label: 'Raffle', href: '/raffle' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-brand-bark shadow-md">
      <div className="container-max flex items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-heading text-2xl font-bold text-brand-gold tracking-wide">
          Uni-Phi Media
        </Link>
        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-brand-cream hover:text-brand-gold text-sm font-medium transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/membership" className="btn-gold text-sm py-2 px-4">Join Now</Link>
        </nav>
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-brand-cream" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-bark border-t border-brand-stone px-4 pb-4 flex flex-col gap-3">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-brand-cream hover:text-brand-gold py-1 font-medium">
              {l.label}
            </Link>
          ))}
          <Link href="/membership" onClick={() => setOpen(false)} className="btn-gold text-center mt-2">Join Now</Link>
        </div>
      )}
    </header>
  )
}