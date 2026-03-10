export default function MediaPage() {
  return (
    <>
      <section className="bg-brand-bark text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl font-black mb-6 text-brand-gold">Media Hub</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">Unbiased Midwest news, homesteading education, permaculture deep dives, and live community streams — all in one place.</p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎙️', title: 'Podcast', desc: 'Unscripted conversations about Midwest life, community building, and everything in between. Available on all major platforms.' },
              { icon: '📺', title: 'Livestreams', desc: 'Live from the land — community events, build updates, and real-time news coverage streamed directly from Hillshire Hollows.' },
              { icon: '🎬', title: 'DIY Videos', desc: 'Homesteading how-tos, permaculture tutorials, home building walkthroughs, and practical self-reliance guides.' },
            ].map(m => (
              <div key={m.title} className="bg-white rounded-xl p-8 text-center shadow-sm">
                <span className="text-5xl mb-4 block">{m.icon}</span>
                <h3 className="font-heading text-2xl font-bold text-brand-green mb-3">{m.title}</h3>
                <p className="text-brand-bark/70 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-max max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-green mb-6">Farming &amp; Permaculture Channel</h2>
          <p className="text-brand-bark/70 mb-8">Dedicated video series covering food growing, soil science, water systems, animal husbandry, and regenerative land practices — taught by people actually doing it.</p>
          <a href="/content-media" className="btn-primary text-lg px-8 py-4">Watch Now</a>
        </div>
      </section>
    </>
  )
}