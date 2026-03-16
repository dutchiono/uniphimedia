import Link from 'next/link'

const farmRoutes = [
  { title: 'Farmsteads', href: '/farmsteads', desc: 'Farmstead-focused planning and land tracks.' },
  { title: 'Food Growing', href: '/food-growing', desc: 'Grow systems, soil work, and production cycles.' },
  { title: 'Catalog', href: '/catalog', desc: 'Build kits, supplies, and systems references.' },
  { title: 'Offsite Building', href: '/offsite-building', desc: 'Offsite build programs for land deployment.' },
]

export default function FarmsLandingPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <section className="bg-[#2E4A2A] text-white section-pad py-24 text-center">
        <div className="container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">UNI-PHI-FARMS Direction</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-5">Uni-Phi Farms</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Dedicated track for farmstead buildouts, land systems, and practical self-reliance infrastructure.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid md:grid-cols-2 gap-6">
          {farmRoutes.map((item) => (
            <article key={item.title} className="bg-white rounded-xl p-7 shadow-sm border border-brand-stone/20">
              <h2 className="font-heading text-3xl font-bold text-brand-green mb-3">{item.title}</h2>
              <p className="text-brand-bark/70 mb-5">{item.desc}</p>
              <Link href={item.href} className="btn-primary">Open</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
