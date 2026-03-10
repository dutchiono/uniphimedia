import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Join Uni-Phi Media. Choose from workshare, retiree, van life, lifetime, and premium membership tiers.',
};

const tiers = [
  {
    name: 'Workshare',
    price: 'TBD',
    description: 'Work-trade model — contribute your skills in exchange for housing, food, and community access.',
    features: ['Housing provided', 'Meals from farm', 'Community events', 'Skills training', 'Path to full membership'],
    cta: 'Apply to Workshare',
    href: '/workshares',
    highlighted: false,
  },
  {
    name: 'Van Life',
    price: 'TBD',
    description: 'Nomad-friendly. Full hookup spots across our properties with full community access.',
    features: ['Full hookups (water, electric)', 'Community access', 'Monthly or annual', 'Multiple locations', 'Laundry & facilities'],
    cta: 'Reserve a Spot',
    href: '/contact',
    highlighted: false,
  },
  {
    name: 'Retiree',
    price: 'TBD',
    description: 'Purpose-built for retirees seeking community, meaning, and a simpler life.',
    features: ['Dedicated retiree area', 'Social programming', 'Gentle workshare option', 'Medical proximity', 'Community garden'],
    cta: 'Learn More',
    href: '/contact',
    highlighted: false,
  },
  {
    name: 'Lifetime',
    price: 'TBD',
    description: 'A permanent stake in the community. Land rights, profit sharing, and lifetime access.',
    features: ['Land parcel included', 'Profit sharing', 'All community access', 'Priority placement', 'Lifetime guarantee'],
    cta: 'Get Lifetime Access',
    href: '/contact',
    highlighted: true,
  },
  {
    name: 'Premium',
    price: 'TBD',
    description: 'Top-tier access with full benefits, priority features, and leadership opportunities.',
    features: ['Everything in Lifetime', 'Leadership path', 'Private events', 'First access to new communities', 'Dedicated support'],
    cta: 'Go Premium',
    href: '/contact',
    highlighted: false,
  },
];

export default function MembershipPage() {
  return (
    <div>
      <section className="bg-brand-green text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4">Membership</h1>
          <p className="text-xl text-white/80">
            Find the tier that fits your life. Every level gets you access to our 
            community, land, and media — on your terms.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map(tier => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col ${
                tier.highlighted
                  ? 'bg-brand-green text-white ring-4 ring-brand-gold'
                  : 'border border-brand-green/20'
              }`}
            >
              <h3 className={`font-heading text-2xl font-bold mb-2 ${tier.highlighted ? 'text-brand-gold' : 'text-brand-green'}`}>
                {tier.name}
              </h3>
              <p className={`text-sm mb-4 flex-0 ${tier.highlighted ? 'text-white/80' : 'text-gray-500'}`}>
                {tier.description}
              </p>
              <ul className="space-y-2 mb-8 flex-1">
                {tier.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${tier.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                    <span className={tier.highlighted ? 'text-brand-gold' : 'text-brand-green'}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                  tier.highlighted
                    ? 'bg-brand-gold text-brand-dark hover:bg-brand-gold/90'
                    : 'btn-primary'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}