'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface NavChild {
  label: string
  href: string
}

interface HubItem {
  label: string
  href: string
  children: NavChild[]
}

const hubItems: HubItem[] = [
  {
    label: 'HQ',
    href: '/hq',
    children: [
      { label: 'HQ Home', href: '/hq' },
      { label: 'Communities', href: '/communities' },
      { label: 'Membership', href: '/membership' },
      { label: 'Hillshire Hollows', href: '/hsh' },
      { label: 'Forum', href: '/forum' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'Media Home', href: '/media' },
      { label: 'News', href: '/media/news' },
      { label: 'Blogs', href: '/media/blogs' },
      { label: 'Content & Media', href: '/content-media' },
      { label: 'Media Teams', href: '/media-teams' },
      { label: 'General Discussion', href: '/forum/general' },
    ],
  },
  {
    label: 'Farms',
    href: '/farms',
    children: [
      { label: 'Farms Home', href: '/farms' },
      { label: 'Farmsteads', href: '/farmsteads' },
      { label: 'Food Growing', href: '/food-growing' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'Offsite Building', href: '/offsite-building' },
    ],
  },
]

const utilityLinks: NavChild[] = [
  { label: 'Builder', href: '/builder' },
  { label: 'Contact', href: '/contact' },
]

function HubDropdown({ hub }: { hub: HubItem }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      >
        {hub.label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div onMouseLeave={() => setOpen(false)} className="absolute top-full left-0 mt-1 min-w-[220px] bg-[#151D2B] border border-white/10 rounded-lg shadow-xl py-2 z-50">
          {hub.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-[#E6C067] transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#1E2638] shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-serif text-2xl font-bold text-[#E6C067] tracking-wide">UniPhi Network</Link>

        <nav className="hidden lg:flex items-center gap-2">
          {hubItems.map((hub) => (
            <HubDropdown key={hub.href} hub={hub} />
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
          onClick={() => setMobileOpen((prev) => !prev)}
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
        <div className="lg:hidden bg-[#161d2b] border-t border-white/10 px-4 pb-5 max-h-[80vh] overflow-y-auto">
          {hubItems.map((hub) => (
            <div key={hub.href} className="border-b border-white/10 last:border-0">
              <button
                onClick={() => setMobileExpanded((prev) => (prev === hub.label ? null : hub.label))}
                className="w-full flex items-center justify-between py-3 text-white font-semibold text-sm"
              >
                {hub.label}
                <svg
                  className={`w-4 h-4 transition-transform ${mobileExpanded === hub.label ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === hub.label && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  {hub.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setMobileOpen(false)
                        setMobileExpanded(null)
                      }}
                      className="text-white/85 hover:text-[#E6C067] py-1.5 text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1">
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
