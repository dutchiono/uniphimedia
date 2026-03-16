import Link from 'next/link'

const items = [
  {
    title: 'Communities',
    desc: 'View active and upcoming communities.',
    href: '/communities',
  },
  {
    title: 'Membership',
    desc: 'Join workshares, memberships, and community programs.',
    href: '/membership',
  },
  {
    title: 'Hillshire Hollows',
    desc: 'See the flagship community, packages, and tours.',
    href: '/hsh',
  },
  {
    title: 'Forum',
    desc: 'Community discussions, intros, and updates.',
    href: '/forum',
  },
]

export default function HQPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">UNIPHIHQ.COM Direction</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-5">UniPhi HQ</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Home base for community building, memberships, governance, and on-the-ground coordination.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max grid md:grid-cols-2 gap-6">
          {items.map((item) => (
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
