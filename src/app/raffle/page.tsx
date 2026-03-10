import Link from 'next/link'

export default function RafflePage() {
  return (
    <>
      <section className="bg-brand-gold section-pad py-24 text-center">
        <div className="container-max">
          <p className="text-brand-bark font-semibold uppercase tracking-widest text-sm mb-4">For Our Veterans</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black text-brand-bark mb-6">Hobbit Home Raffle</h1>
          <p className="text-brand-bark/70 text-xl max-w-2xl mx-auto mb-10">Win a fully built hobbit home on Hillshire Hollows land. Proceeds support veteran community programs and the ongoing development of intentional communities across the Midwest.</p>
          <Link href="/contact" className="btn-primary text-lg px-10 py-4">Get Raffle Tickets</Link>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-12">What You Could Win</h2>
          <div className="bg-white rounded-xl p-10 shadow-sm space-y-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🏠</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-1">A Fully Built Hobbit Home</h3>
                <p className="text-brand-bark/70">Earth-integrated, sustainable, and beautiful. Built on Hillshire Hollows land with full community access included.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">♾️</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-1">Lifetime Community Membership</h3>
                <p className="text-brand-bark/70">Full lifetime membership with all benefits — profit-sharing, events, media access, and priority future property rights.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-3xl">🌱</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-1">Garden Plot &amp; Community Access</h3>
                <p className="text-brand-bark/70">Your own garden plot, access to communal farming operations, events, and the full Hillshire Hollows community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-green text-white section-pad text-center">
        <div className="container-max max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-gold mb-4">Every Ticket Supports Veterans</h2>
          <p className="text-white/75 mb-8">Raffle proceeds fund veteran community programs, subsidized memberships for service members, and the ongoing Hobbit Home build at Hillshire Hollows.</p>
          <Link href="/contact" className="btn-gold text-lg px-10 py-4">Enter the Raffle</Link>
        </div>
      </section>
    </>
  )
}