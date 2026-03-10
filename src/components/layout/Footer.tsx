import Link from 'next/link';

const sections = [
  {
    title: 'Communities',
    links: [
      { label: 'Hillshire Hollows', href: '/hsh' },
      { label: 'All Communities', href: '/communities' },
      { label: 'Workshares', href: '/workshares' },
      { label: 'Book a Tour', href: '/tours' },
    ],
  },
  {
    title: 'Membership',
    links: [
      { label: 'Membership Tiers', href: '/membership' },
      { label: 'Workshare Program', href: '/workshares' },
      { label: 'Raffle & Crowdfunding', href: '/raffle' },
      { label: 'Apply as Leader', href: '/contact' },
    ],
  },
  {
    title: 'Media',
    links: [
      { label: 'Podcasts', href: '/media' },
      { label: 'Videos', href: '/media' },
      { label: 'Permaculture Guides', href: '/media' },
      { label: 'Forum', href: '/forum' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sections.map(s => (
            <div key={s.title}>
              <h3 className="font-heading font-semibold mb-4 text-brand-gold">{s.title}</h3>
              <ul className="space-y-2">
                {s.links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Uni-Phi Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
}