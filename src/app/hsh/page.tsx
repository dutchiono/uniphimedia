import Link from 'next/link'

const packages = [
  {
    name: 'Van Life / RV Spot',
    icon: '🚐',
    desc: 'Hook-up spot on Hillshire Hollows land. Water, electric, and community access included.',
    features: ['Electric & water hookup', 'Community amenities', 'Monthly or annual lease', 'Forum access'],
    price: 'Contact for pricing',
    href: '/contact',
  },
  {
    name: 'Workshare Lot',
    icon: '🌱',
    desc: 'Earn your spot. Work a set number of hours per week in exchange for land use and community membership.',
    features: ['Dedicated garden plot', 'Community work schedule', 'Housing credit system', 'Skill-sharing network'],
    price: 'Work-trade based',
    href: '/workshares',
  },
  {
    name: 'Hillside Package',
    icon: '⛰️',
    desc: 'Premium hillside lots with panoramic views. Build your own home or choose from our standard plans.',
    features: ['Deeded lot', 'Build-ready utilities', 'Community profit-share', 'HOA-free'],
    price: 'Contact for pricing',
    href: '/contact',
    featured: true,
  },
  {
    name: 'Hobbit Home',
    icon: '🏠',
    desc: 'Move-in ready earth-integrated hobbit homes. Sustainable, beautiful, and fully off-grid capable.',
    features: ['Fully built', 'Earth-integrated design', 'Solar-ready', 'Lifetime community membership'],
    price: 'Contact for pricing',
    href: '/contact',
  },
  {
    name: 'Tornado Bunker',
    icon: '🛡️',
    desc: 'Underground reinforced bunkers — storm shelter, prepper HQ, or long-term off-grid base.',
    features: ['Reinforced concrete', 'Air filtration system', 'Long-term food storage space', 'Community lot access'],
    price: 'Contact for pricing',
    href: '/contact',
  },
  {
    name: 'Bitcoin Bundle',
    icon: '₿',
    desc: 'Full land package purchasable in Bitcoin. Includes lot, basic utilities, and lifetime membership.',
    features: ['Crypto-native purchase', 'Deeded lot included', 'Lifetime membership', 'Priority community access'],
    price: 'BTC accepted',
    href: '/contact',
  },
]

export default function HSHPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-green text-white section-pad py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hsh-aerial.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4">Flagship Property</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-6">Hillshire Hollows</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
            A Midwest off-grid farmstead community — choose your path, plant your roots, and build the life you actually want.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="btn-gold text-lg px-8 py-4">Schedule a Tour</Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-green text-lg px-8 py-4">Ask a Question</Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-brand-cream section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-4">Choose Your Package</h2>
          <p className="text-center text-brand-bark/60 mb-12 max-w-xl mx-auto">Six ways to become part of Hillshire Hollows — from van life hookups to full land ownership in Bitcoin.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div key={pkg.name} className={`rounded-xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow ${pkg.featured ? 'bg-brand-green text-white ring-2 ring-brand-gold' : 'bg-white'}`}>
                <span className="text-4xl mb-4">{pkg.icon}</span>
                <h3 className={`font-heading text-2xl font-bold mb-3 ${pkg.featured ? 'text-brand-gold' : 'text-brand-green'}`}>{pkg.name}</h3>
                <p className={`text-sm mb-4 flex-1 ${pkg.featured ? 'text-white/80' : 'text-brand-bark/70'}`}>{pkg.desc}</p>
                <ul className="space-y-1 mb-6">
                  {pkg.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${pkg.featured ? 'text-white/70' : 'text-brand-bark/60'}`}>
                      <span className="text-brand-gold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className={`font-bold text-lg mb-4 ${pkg.featured ? 'text-brand-gold' : 'text-brand-earth'}`}>{pkg.price}</p>
                <Link href={pkg.href} className={pkg.featured ? 'btn-gold' : 'btn-primary'}>{pkg.featured ? 'Get Started' : 'Learn More'}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Lakes */}
      <section className="bg-brand-bark text-white section-pad text-center">
        <div className="container-max max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-gold mb-4">5 Lakes — Coming Soon</h2>
          <p className="text-white/70 mb-8">Our next property. Leave a deposit now to lock in founding member pricing before public launch.</p>
          <Link href="/contact" className="btn-gold text-lg px-8 py-4">Reserve Your Spot</Link>
        </div>
      </section>
    </>
  )
}