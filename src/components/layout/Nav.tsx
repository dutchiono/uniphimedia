'use client'
import { useState } from 'react'
import Link from 'next/link'

const hubLinks = [
  { label: 'HQ', href: '/hq' },
  { label: 'Media', href: '/media' },
  { label: 'Farms', href: '/farms' },
]

const utilityLinks = [
  { label: 'Builder', href: '/builder' },
  { label: 'Contact', href: '/contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#1E2638] shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-serif text-2xl font-bold text-[#E6C067] tracking-wide">
          UniPhi Network
        </Link>

        <nav className="hidden lg:flex items-center gap-3">
          {hubLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/membership"
            className="ml-2 bg-[#E6C067] text-[#1E2638] text-sm font-bold py-2 px-4 rounded-lg hover:bg-[#d3b058] transition-colors"
          >
            Join
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#161d2b] border-t border-white/10 px-4 pb-5">
          <div className="flex flex-col gap-1 mt-3">
            {hubLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white font-semibold py-2.5 px-2 rounded hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-1">
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/85 py-2.5 px-2 rounded hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/membership"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-[#E6C067] text-[#1E2638] text-center font-bold py-2.5 px-4 rounded-lg hover:bg-[#d3b058] transition-colors"
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
