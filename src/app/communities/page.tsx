import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Communities',
  description: 'Explore active farmsteads and upcoming developments to find the right community fit.',
}

const communities = [
  {
    name: 'Hillshire Hollows',
    status: 'Active',
    statusColor: 'bg-green-500',
    location: 'Midwest, USA',
    desc: 'Our flagship farmstead community. Off-grid lots, hobbit homes, bunkers, workshare spots, and van life hookups. Multiple entry points for any lifestyle.',
    href: '/hsh',
    features: ['Off-grid capable', 'Permaculture focus', 'Multiple home types', 'Profit-sharing'],
  },
  {
    name: '5 Lakes',
    status: 'Coming Soon',
    statusColor: 'bg-yellow-500',
    location: 'Midwest, USA',
    desc: 'Our next property development. Deposits open now -- founding members lock in the best pricing and first choice of lots before public launch.',
    href: '/contact',
    features: ['Lakefront access', 'Founding member pricing', 'Deposits open now', 'Launch TBD'],
  },
  {
    name: 'Healer Communities',
    status: 'In Development',
    statusColor: 'bg-blue-500',
    location: 'TBD',
    desc: 'Dedicated spaces for healers, practitioners, and wellness-focused individuals building intentional living environments together.',
    href: '/contact',
    features: ['Wellness focus', 'Practitioner network', 'Cooperative governance', 'Coming soon'],
  },
  {
    name: 'Retiree Paradise',
    status: 'Planning',
    statusColor: 'bg-purple-500',
    location: 'TBD',
    desc: 'Intentional retirement community designed around peace, purpose, and connection. Gardening, social programs, and medical resource networks.',
    href: '/contact',
    features: ['55+ focus', 'Social programs', 'Medical resources', 'Garden community'],
  },
  {
    name: 'Vacation / SHTF Spots',
    status: 'Active',
    statusColor: 'bg-green-500',
    location: 'Hillshire Hollows',
    desc: 'Short-term vacation stays or emergency bug-out properties. Rent for a week or own your own spot for when life gets uncertain.',
    href: '/contact',
    features: ['Short-term rental', 'Bug-out capable', 'Off-grid ready', 'Community access'],
  },
]

export default function CommunitiesPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl font-black mb-6">Our Communities</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            From active farmsteads to upcoming developments -- find the community that matches where you are in life.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max space-y-8">
          {communities.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-block w-2.5 h-2.5 rounded-full ${c.statusColor}`} />
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-bark/50">{c.status}</span>
                  <span className="text-xs text-brand-bark/40">- {c.location}</span>
                </div>
                <h3 className="font-heading text-3xl font-bold text-brand-green mb-3">{c.name}</h3>
                <p className="text-brand-bark/70 leading-relaxed mb-6">{c.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {c.features.map((f) => (
                    <li
                      key={f}
                      className="bg-brand-cream text-brand-bark text-xs font-medium px-3 py-1 rounded-full border border-brand-stone/20"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center md:items-start md:pt-10">
                <Link href={c.href} className="btn-primary whitespace-nowrap">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
