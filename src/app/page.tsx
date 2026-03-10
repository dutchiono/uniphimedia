import Link from 'next/link'

const paths = [
  {
    icon: '🏡',
    title: 'Live on the Land',
    desc: 'Hillshire Hollows — off-grid farmstead lots, hobbit homes, bunkers, and van life spots in the Midwest.',
    href: '/hsh',
    cta: 'See Properties',
  },
  {
    icon: '🤝',
    title: 'Join the Community',
    desc: 'Workshares, retiree living, lifetime memberships, and profit-sharing communities built on cooperation.',
    href: '/membership',
    cta: 'View Memberships',
  },
  {
    icon: '📡',
    title: 'Watch & Learn',
    desc: 'Unbiased Midwest news, permaculture education, DIY homesteading videos, and live community streams.',
    href: '/media',
    cta: 'Explore Media',
  },
]

const values = [
  { title: 'Self-Reliance', desc: 'We teach practical skills — food growing, home building, protection, and financial independence.' },
  { title: 'Cooperation', desc: 'Profit-sharing models, workshares, and community governance that rewards contribution.' },
  { title: 'Permaculture', desc: 'Land stewardship rooted in regenerative agriculture and sustainable design principles.' },
  { title: 'Community Healing', desc: 'Intentional spaces for veterans, families, and retirees seeking peace and purpose.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-green text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-land.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative container-max section-pad text-center py-28 md:py-40">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-sm mb-4">Midwest News &amp; Community Building</p>
          <h1 className="font-heading text-5xl md:text-7xl font-black leading-tight mb-6">
            Reignite the<br className="hidden md:block" /> American Dream
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Self-sustaining farmstead communities, permaculture education, and unbiased Midwest news — built for families, veterans, retirees, and free spirits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hsh" className="btn-gold text-lg px-8 py-4">See Hillshire Hollows</Link>
            <Link href="/membership" className="btn-outline border-white text-white hover:bg-white hover:text-brand-green text-lg px-8 py-4">Join the Community</Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-3xl text-center mx-auto">
          <h2 className="font-heading text-4xl font-bold text-brand-green mb-6">Our Mission</h2>
          <p className="text-lg text-brand-bark/80 leading-relaxed">
            Uni-Phi's mission is to establish farmsteads and communities that serve as havens of healing, resilience, and relaxation — reigniting the American dream through self-sustaining, profit-sharing communities that embrace permaculture, sound financial practices, self-reliance, and cooperation.
          </p>
        </div>
      </section>

      {/* 3 Paths */}
      <section className="bg-white section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-12">Three Ways to Join</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {paths.map(p => (
              <div key={p.title} className="bg-brand-cream rounded-xl p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-shadow">
                <span className="text-5xl mb-4">{p.icon}</span>
                <h3 className="font-heading text-2xl font-bold text-brand-green mb-3">{p.title}</h3>
                <p className="text-brand-bark/70 mb-6 flex-1">{p.desc}</p>
                <Link href={p.href} className="btn-primary">{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-green text-white section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-gold text-center mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(v => (
              <div key={v.title} className="text-center">
                <h3 className="font-heading text-xl font-bold text-brand-gold mb-3">{v.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Veterans CTA */}
      <section className="bg-brand-gold section-pad">
        <div className="container-max flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-brand-bark mb-2">Hobbit Home Raffle — For Veterans</h2>
            <p className="text-brand-bark/70 max-w-xl">Win a fully built hobbit home on Hillshire Hollows land. Proceeds support veteran community programs. Tickets available now.</p>
          </div>
          <Link href="/raffle" className="btn-primary whitespace-nowrap text-lg px-8 py-4">Enter the Raffle</Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-brand-bark text-white section-pad text-center">
        <div className="container-max">
          <h2 className="font-heading text-3xl font-bold text-brand-gold mb-4">Ready to build a different life?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Tour Hillshire Hollows, apply for a workshare, or grab a membership — whatever your path, we have a place for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="btn-gold">Schedule a Tour</Link>
            <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-brand-bark">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  )
}