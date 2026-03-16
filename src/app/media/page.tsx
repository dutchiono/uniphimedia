import Link from 'next/link'

const mediaRoutes = [
  { title: 'News', href: '/media/news', desc: 'Official updates and verified public releases.' },
  { title: 'Blogs', href: '/media/blogs', desc: 'Community-authored posts and field journals.' },
  { title: 'Content & Media', href: '/content-media', desc: 'Editorial tracks, media strategy, and publishing.' },
  { title: 'Media Teams', href: '/media-teams', desc: 'Creator teams and collaboration tracks.' },
  { title: 'Forum', href: '/forum/general', desc: 'Open discussion around active projects and topics.' },
]

export default function MediaLandingPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-brand-bark text-white section-pad py-24 text-center">
        <div className="container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">UNI-PHI-MEDIA Direction</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-5">Uni-Phi Media</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Content and publishing infrastructure for real community contributions, reviews, and releases.
          </p>
        </div>
      </section>

      <section className="section-pad bg-brand-cream">
        <div className="container-max grid md:grid-cols-2 gap-6">
          {mediaRoutes.map((item) => (
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
