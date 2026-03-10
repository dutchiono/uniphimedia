import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hillshire Hollows',
  description: 'Our flagship permaculture community in the Midwest. Hillside packages, hobbit homes, van life spots, and more.',
};

const packages = [
  { name: 'Van Life / RV Spot', price: 'TBD', features: ['Full hookups', 'Shared amenities', 'Community access', 'Monthly or annual'] },
  { name: 'Workshare Spot', price: 'TBD', features: ['Work-trade model', 'Housing included', 'Food from farm', 'Community access'] },
  { name: 'Hillside Package', price: 'TBD', features: ['Land parcel', 'Build rights', 'Profit sharing', 'Full membership'] },
  { name: 'Hobbit Home', price: 'TBD', features: ['Turnkey home', 'Land included', 'Lifetime membership', 'Priority features'] },
  { name: 'Tornado Bunker', price: 'TBD', features: ['Underground shelter', 'Storm-rated', 'Supply storage', 'Community access'] },
  { name: 'Bitcoin Bundle', price: 'TBD', features: ['Crypto payment', 'Package discount', 'Priority placement', 'Full membership'] },
];

export default function HillshireHollowsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-green text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-brand-gold uppercase tracking-widest text-sm mb-4">Flagship Property</p>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">Hillshire Hollows</h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Our founding community — a permaculture farmstead in the heart of the Midwest.
            Multiple housing options for every lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="btn-secondary">Book a Tour</Link>
            <Link href="#packages" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              See Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="section">
        <h2 className="font-heading text-4xl font-bold text-center text-brand-green mb-4">
          Available Packages
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Contact us for current pricing — packages are limited and fill quickly.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg.name} className="border border-brand-green/20 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-xl font-bold text-brand-green mb-2">{pkg.name}</h3>
              <p className="text-2xl font-bold text-brand-gold mb-4">{pkg.price}</p>
              <ul className="space-y-2 mb-6">
                {pkg.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-brand-green">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary block text-center text-sm">
                Get More Info
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}