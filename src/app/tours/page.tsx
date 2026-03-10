import Link from 'next/link'

export default function ToursPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl font-black mb-6">Visit Hillshire Hollows</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">See the land in person. Walk the lots, meet the community, and picture your life here before you commit to anything.</p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: '🚶', title: 'In-Person Tour', desc: 'Walk the property with a guide. See available lots, existing structures, and community infrastructure up close. Tours run on weekends.' },
              { icon: '💻', title: 'Virtual Tour', desc: 'Can not make it in person? We offer live video walkthroughs via Zoom — see everything from your screen and ask questions in real time.' },
            ].map(t => (
              <div key={t.title} className="bg-white rounded-xl p-8 shadow-sm">
                <span className="text-5xl mb-4 block">{t.icon}</span>
                <h3 className="font-heading text-2xl font-bold text-brand-green mb-3">{t.title}</h3>
                <p className="text-brand-bark/70 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-brand-bark text-white rounded-xl p-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-brand-gold mb-4">Book a Tour</h2>
            <p className="text-white/70 mb-8">Fill out the form below and we will reach out within 48 hours to schedule your visit.</p>
            <Link href="/contact" className="btn-gold text-lg px-10 py-4">Schedule Now</Link>
          </div>
        </div>
      </section>
    </>
  )
}