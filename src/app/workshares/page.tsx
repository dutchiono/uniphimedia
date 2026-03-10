import Link from 'next/link'

const tasks = [
  { icon: '🌾', title: 'Farming & Gardening', desc: 'Crop tending, harvesting, seed saving, and soil management on community land.' },
  { icon: '🔨', title: 'Construction & Maintenance', desc: 'Building, repairs, and upkeep of community structures and housing.' },
  { icon: '🍳', title: 'Community Kitchen', desc: 'Meal prep and cooking for community events and shared meals.' },
  { icon: '📡', title: 'Media & Content', desc: 'Filming, editing, streaming, and social media for Uni-Phi channels.' },
  { icon: '🌿', title: 'Permaculture Projects', desc: 'Swales, food forests, composting, and land restoration work.' },
  { icon: '🐓', title: 'Animal Care', desc: 'Livestock feeding, pasture rotation, and animal husbandry tasks.' },
]

export default function WorksharesPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl font-black mb-6">Workshares</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">Earn your place in the community. Trade your skills and labor for land access, housing credit, and membership — no cash required.</p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-brand-green mb-6">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { step: '1', title: 'Apply', desc: 'Tell us about your skills, availability, and what you want to learn. No experience required — just a good attitude.' },
              { step: '2', title: 'Arrive', desc: 'Come to Hillshire Hollows and get oriented. Meet your team, learn the schedule, and settle in.' },
              { step: '3', title: 'Earn', desc: 'Work your hours, build housing credits, and grow into a full community member with increasing land and voting rights.' },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-brand-green text-white font-bold text-lg flex items-center justify-center mb-4">{s.step}</div>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-2">{s.title}</h3>
                <p className="text-brand-bark/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-12">What You Might Work On</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map(t => (
              <div key={t.title} className="bg-brand-cream rounded-xl p-6">
                <span className="text-4xl mb-4 block">{t.icon}</span>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-2">{t.title}</h3>
                <p className="text-brand-bark/70 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bark text-white section-pad text-center">
        <div className="container-max max-w-xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-gold mb-4">Ready to Apply?</h2>
          <p className="text-white/70 mb-8">Fill out a short application and we will reach out to discuss availability and fit.</p>
          <Link href="/contact" className="btn-gold text-lg px-10 py-4">Apply Now</Link>
        </div>
      </section>
    </>
  )
}