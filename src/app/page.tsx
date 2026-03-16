import Link from 'next/link'

const hubs = [
  {
    title: 'HQ',
    subtitle: 'UNIPHIHQ.com',
    desc: 'Community building, memberships, governance, and operations.',
    href: '/HQ',
    cta: 'Open HQ',
    accent: 'from-[#275242] to-[#1F3D33]',
  },
  {
    title: 'Media',
    subtitle: 'Uni-Phi Media',
    desc: 'Content, news releases, channels, and audience growth.',
    href: '/Media',
    cta: 'Open Media',
    accent: 'from-[#4B2E26] to-[#311B16]',
  },
  {
    title: 'Farms',
    subtitle: 'Uni-Phi Farms',
    desc: 'Farmstead development, land systems, and practical self-reliance.',
    href: '/Farms',
    cta: 'Open Farms',
    accent: 'from-[#365A2B] to-[#223B1D]',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <section className="bg-brand-bark text-white section-pad py-24">
        <div className="container-max text-center">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">UniPhi Network</p>
          <h1 className="font-heading text-5xl md:text-7xl font-black mb-6">Three Hub Architecture</h1>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            Home is now structured into three focused tracks: HQ for community building, Media for content and news, and
            Farms for farmstead development.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid md:grid-cols-3 gap-6">
          {hubs.map((hub) => (
            <article key={hub.title} className="rounded-2xl overflow-hidden shadow-md border border-brand-stone/20 bg-white">
              <div className={`p-8 bg-gradient-to-br ${hub.accent} text-white`}>
                <p className="text-white/70 text-xs uppercase tracking-widest mb-2">{hub.subtitle}</p>
                <h2 className="font-heading text-4xl font-black">{hub.title}</h2>
              </div>
              <div className="p-8">
                <p className="text-brand-bark/75 mb-6">{hub.desc}</p>
                <Link href={hub.href} className="btn-primary">{hub.cta}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
