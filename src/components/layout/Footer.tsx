import Link from 'next/link'

const cols = [
  {
    heading: 'Communities',
    links: [
      { label: 'Hillshire Hollows', href: '/hsh' },
      { label: 'Communities', href: '/communities' },
      { label: 'Home Types', href: '/home-types' },
      { label: 'Tornado Bunkers', href: '/hsh#bunkers' },
      { label: 'Bitcoin Bundles', href: '/hsh#btc' },
      { label: '5 Lakes Deposits', href: '/hsh#5lakes' },
    ],
  },
  {
    heading: 'Membership',
    links: [
      { label: 'All Memberships', href: '/membership' },
      { label: 'Workshares', href: '/workshares' },
      { label: 'Benefits', href: '/membership#benefits' },
      { label: 'Monthly Clubs', href: '/membership#clubs' },
      { label: 'Leaders Apply', href: '/leaders-apply' },
    ],
  },
  {
    heading: 'Media & Learn',
    links: [
      { label: 'Media Hub', href: '/media' },
      { label: 'Farming & Permaculture', href: '/content-media' },
      { label: 'Food Growing', href: '/food-growing' },
      { label: 'Home Protection', href: '/protection' },
      { label: 'Law Resources', href: '/law' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Tours', href: '/tours' },
      { label: 'Raffle', href: '/raffle' },
      { label: 'Contact', href: '/contact' },
      { label: 'Forum', href: '/forum' },
      { label: 'Terms of Service', href: '/tos' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-bark text-brand-cream">
      <div className="container-max section-pad">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {cols.map(col => (
            <div key={col.heading}>
              <h4 className="text-brand-gold font-heading font-semibold text-lg mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-brand-cream/70 hover:text-brand-gold text-sm transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-stone/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brand-cream/50">
          <p>&copy; {new Date().getFullYear()} Uni-Phi Media. All rights reserved.</p>
          <p>Midwest News &amp; Community Building</p>
        </div>
      </div>
    </footer>
  )
}