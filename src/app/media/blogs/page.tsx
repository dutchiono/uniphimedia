import Link from 'next/link'
import { blogPosts } from '@/lib/content'

export default function MediaBlogsPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="bg-brand-bark text-white section-pad py-20 text-center">
        <div className="container-max">
          <p className="text-brand-gold font-semibold uppercase tracking-widest text-xs mb-4">Community Blogs</p>
          <h1 className="font-heading text-5xl font-black mb-4">Blogs</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Member stories, field notes, and progress journals from actual contributors.
          </p>
        </div>
      </section>

      <section className="section-pad bg-brand-cream">
        <div className="container-max">
          {blogPosts.length === 0 ? (
            <div className="bg-white rounded-xl border border-brand-stone/20 p-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-brand-green mb-3">No Blogs Published Yet</h2>
              <p className="text-brand-bark/70 mb-6">
                No fake blog feed here. Posts appear only after real submissions and moderation.
              </p>
              <Link href="/contact" className="btn-primary">Submit Blog Pitch</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl border border-brand-stone/20 p-7">
                  <h2 className="font-heading text-2xl font-bold text-brand-green mb-2">{post.title}</h2>
                  <p className="text-brand-bark/70 mb-4">{post.excerpt}</p>
                  <Link href={`/media/blogs/${post.slug}`} className="text-brand-green font-semibold hover:underline">Read</Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
