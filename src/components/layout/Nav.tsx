'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  {
    label: 'Communities',
    href: '/communities',
    children: [
      { label: 'All Communities', href: '/communities' },
      { label: '5 Lakes', href: '/5-lakes' },
      { label: 'SHTF Spots', href: '/shtf-spots' },
      { label: 'Van Life', href: '/van-life' },
      { label: 'Tornado Bunkers', href: '/tornado-bunkers' },
      { label: 'Healer Communities', href: '/healer-communities' },
      { label: 'Farmsteads', href: '/farmsteads' },
      { label: 'No-Com Land', href: '/no-com-land' },
      { label: 'Offsite Building', href: '/offsite-building' },
    ],
  },
  {
    label: 'Hillshire Hollows',
    href: '/hsh',
    children: [
      { label: 'Overview', href: '/hsh' },
      { label: 'Packages & Pricing', href: '/hsh/packages' },
      { label: 'BTC Bundles', href: '/btc-bundles' },
    ],
  },
  {
    label: 'Membership',
    href: '/membership',
    children: [
      { label: 'Overview', href: '/membership' },
      { label: 'Membership Types', href: '/membership-types' },
      { label: 'Benefits', href: '/benefits' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Perks', href: '/perks' },
      { label: 'Leader Application', href: '/leaders-apply' },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Food Growing', href: '/food-growing' },
      { label: 'Law & Rights', href: '/law' },
      { label: 'Protection', href: '/protection' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'Workshares', href: '/workshares' },
    ],
  },
  {
    label: 'Media',
    href: '/media',
    children: [
      { label: 'All Media', href: '/media' },
      { label: 'Content & Media', href: '/content-media' },
      { label: 'Media Teams', href: '/media-teams' },
    ],
  },
  {
    label: 'Community',
    href: '/forum',
    children: [
      { label: 'Forum Home', href: '/forum' },
      { label: 'General Discussion', href: '/forum/general' },
      { label: 'Introductions', href: '/forum/introductions' },
      { label: 'Forum Rules', href: '/forum/rules' },
      { label: 'Raffle', href: '/raffle' },
      { label: 'Raffle Prizes', href: '/raffle-prizes' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Tours', href: '/tours' },
      { label: 'Community Rules', href: '/community-rules' },
      { label: 'Terms of Service', href: '/tos' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
]

interface NavChild {
  label: string
  href: string
}

interface NavItemType {
  label: string
  href: string
  children?: NavChild[]
}

function DropdownMenu({ items, onClose }: { items: NavChild[]; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 mt-1 min-w-[200px] bg-[#3a2218] border border-[#C9A84C]/20 rounded-lg shadow-xl py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-[#FAF7F0] hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

function NavItemComponent({ item }: { item: NavItemType }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!item.children) {
    return (
      <Link href={item.href} className="text-[#FAF7F0] hover:text-[#C9A84C] text-sm font-medium transition-colors">
        {item.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-[#FAF7F0] hover:text-[#C9A84C] text-sm font-medium transition-colors"
      >
        {item.label}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div onMouseLeave={() => setOpen(false)}>
          <DropdownMenu items={item.children} onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-[#5C4033] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="font-serif text-2xl font-bold text-[#C9A84C] tracking-wide">
          Uni-Phi Media
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <NavItemComponent key={item.href + item.label} item={item} />
          ))}
          <Link
            href="/membership"
            className="bg-[#C9A84C] text-[#2D5016] text-sm font-bold py-2 px-4 rounded hover:bg-[#b8943d] transition-colors"
          >
            Join Now
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#FAF7F0]"
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
        <div className="lg:hidden bg-[#3a2218] border-t border-[#C9A84C]/20 px-4 pb-6 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href + item.label} className="border-b border-[#C9A84C]/10 last:border-0">
              <button
                onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                className="w-full flex items-center justify-between py-3 text-[#FAF7F0] font-medium text-sm"
              >
                {item.label}
                {item.children && (
                  <svg
                    className={`w-4 h-4 transition-transform ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              {item.children && mobileExpanded === item.label && (
                <div className="pl-4 pb-2 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                      className="text-[#FAF7F0]/80 hover:text-[#C9A84C] py-1.5 text-sm transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/membership"
            onClick={() => setMobileOpen(false)}
            className="block mt-4 bg-[#C9A84C] text-[#2D5016] text-center font-bold py-2 px-4 rounded hover:bg-[#b8943d] transition-colors"
          >
            Join Now
          </Link>
        </div>
      )}
    </header>
  )
}
