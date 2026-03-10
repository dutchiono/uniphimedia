'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Communities', href: '/communities' },
  { label: 'Hillshire Hollows', href: '/hsh' },
  { label: 'Membership', href: '/membership' },
  { label: 'Workshares', href: '/workshares' },
  { label: 'Media', href: '/media' },
  { label: 'Forum', href: '/forum' },
  { label: 'Tours', href: '/tours' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-brand-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-heading text-xl font-bold text-brand-green">
          Uni-Phi Media
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-brand-dark hover:text-brand-green transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/membership" className="btn-primary text-sm">Join Now</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-brand-green/10 px-4 pb-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="block py-2 text-brand-dark hover:text-brand-green" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/membership" className="btn-primary block text-center mt-2" onClick={() => setOpen(false)}>Join Now</Link>
        </div>
      )}
    </header>
  );
}