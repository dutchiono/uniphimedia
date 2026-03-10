import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Communities',
  description: 'Explore all Uni-Phi communities — farmsteads, van life spots, retiree communities, and more across the Midwest.',
};

const communities = [
  { name: 'Hillshire Hollows', type: 'Flagship Farmstead', location: 'Midwest', status: 'Active', href: '/hsh', description: 'Our founding permaculture community. Multiple housing options, full farm infrastructure, and a thriving member base.' },
  { name: '5 Lakes', type: 'Lake Community', location: 'Midwest', status: 'Deposits Open', href: '/contact', description: 'A lakefront community with waterfront lots. Deposits now being accepted for founding members.' },
  { name: 'Healer Communities', type: 'Wellness Focus', location: 'TBD', status: 'Coming Soon', href: '/contact', description: 'Intentional communities designed around healing arts, wellness practices, and therapeutic land use.' },
  { name: 'Van Life Network', type: 'Mobile Community', location: 'Multi-site', status: 'Active', href: '/membership', description: 'Full hookup spots across multiple properties. Join our nomad network and roam with community support.' },
  { name: 'Retiree Villages', type: 'Retiree Focus', location: 'Midwest', status: 'Planning', href: '/contact', description: 'Purpose-designed communities for retirees seeking meaningful connection and gentle rural living.' },
];

export default function CommunitiesPage() {
  return (
    <div>
      <section className="bg-brand-green text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4">Our Communities</h1>
          <p className="text-xl text-white/80">
            From flagship farmsteads to lakefront properties to van life networks — 
            find the community that fits your vision.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="grid md:grid-cols-2 gap-6">
          {communities.map(c => (
            <div key={c.name} className="border border-brand-green/20 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-brand-green">{c.name}</h3>
                  <p className="text-sm text-gray-500">{c.type} · {c.location}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  c.status === 'Active' ? 'bg-green-100 text-green-700' :
                  c.status === 'Deposits Open' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-500'
                }`}>{c.status}</span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{c.description}</p>
              <Link href={c.href} className="btn-primary text-sm inline-block">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}