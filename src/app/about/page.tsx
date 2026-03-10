import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'The mission and story behind Uni-Phi Media.',
};

const values = [
  { title: 'Permaculture', description: 'Working with nature, not against it. Every community is designed around regenerative land practices.' },
  { title: 'Self-Reliance', description: 'Building real skills and infrastructure — food, energy, shelter, community — that don\'t depend on broken systems.' },
  { title: 'Cooperation', description: 'Profit-sharing economics and collective decision making. When the community wins, everyone wins.' },
  { title: 'Healing', description: 'Land as medicine. Communities as havens. Space to heal, rest, and reconnect.' },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-green text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            To establish farmsteads and communities that serve as havens of healing, 
            resilience, and relaxation — and to reignite the American dream through 
            self-sustaining, profit-sharing communities.
          </p>
        </div>
      </section>

      <section className="section max-w-4xl">
        <h2 className="font-heading text-4xl font-bold text-brand-green mb-8">The Story</h2>
        <div className="prose prose-lg text-gray-700 space-y-4">
          <p>
            Uni-Phi Media started as a Midwest news and community platform — unbiased, unscripted, 
            and committed to covering the stories that mainstream media ignores.
          </p>
          <p>
            Over time, it became clear that the most important story we could tell was the one 
            we were building ourselves: communities where the American values of hard work, 
            land ownership, self-reliance, and neighbor-to-neighbor cooperation actually live.
          </p>
          <p>
            Hillshire Hollows was the first. More are coming.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream py-16">
        <div className="section">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="font-heading text-2xl font-bold text-brand-green mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section text-center">
        <h2 className="font-heading text-4xl font-bold text-brand-green mb-4">Ready to Join?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Whether you want to buy land, join a workshare, or just follow along — 
          there's a place for you in the Uni-Phi network.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/membership" className="btn-primary">View Membership Options</Link>
          <Link href="/hsh" className="btn-secondary">Explore Hillshire Hollows</Link>
        </div>
      </section>
    </div>
  );
}