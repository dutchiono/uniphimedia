import Link from 'next/link'
import { newsPosts } from '@/lib/content'

export default function MediaNewsPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      <section className="bg-brand-bark text-white section-pad py-20 text-center">
        <div className="container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">Community News</p>
          <h1 className="font-heading text-5xl font-black mb-4">News Desk</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Verified community updates and public releases. No generated filler content.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-max">
          {newsPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-brand-stone/20 p-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-brand-green mb-3">No News Published Yet</h2>
              <p className="text-brand-bark/70 mb-6">
                This section stays empty until real community posts are submitted and approved.
              </p>
              <Link href="/contact" className="btn-primary">Submit News Request</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {newsPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl border border-brand-stone/20 p-7">
                  <h2 className="font-heading text-2xl font-bold text-brand-green mb-2">{post.title}</h2>
                  <p className="text-brand-bark/70 mb-4">{post.excerpt}</p>
                  <Link href={`/media/news/${post.slug}`} className="text-brand-green font-semibold hover:underline">Read</Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
