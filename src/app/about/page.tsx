const values = [
  { title: 'Self-Reliance', desc: 'Practical skills — growing food, building homes, financial independence, and self-protection.' },
  { title: 'Cooperation', desc: 'Profit-sharing, workshares, and governance models that reward every contributor.' },
  { title: 'Permaculture', desc: 'Regenerative land stewardship, sustainable design, and working with nature.' },
  { title: 'Healing', desc: 'Spaces built for veterans, families, and retirees seeking peace, community, and purpose.' },
  { title: 'Unbiased News', desc: 'Midwest news that is unscripted, unsponsored, and uncommitted to any political agenda.' },
  { title: 'Community First', desc: 'Every decision is made with the long-term health of the community as the primary concern.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max max-w-3xl mx-auto">
          <h1 className="font-heading text-5xl font-black mb-6">About Uni-Phi Media</h1>
          <p className="text-white/80 text-xl leading-relaxed">
            We are a Midwest-based media company and community builder on a mission to reignite the American dream through self-sustaining, profit-sharing communities rooted in permaculture, cooperation, and radical self-reliance.
          </p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-green mb-6">Our Mission</h2>
          <p className="text-brand-bark/80 text-lg leading-relaxed mb-6">
            Uni-Phi's mission is to establish farmsteads and communities that serve as havens of healing, resilience, and relaxation. We are reigniting the American dream through self-sustaining, profit-sharing communities that embrace permaculture, sound financial practices, and promote self-reliance and cooperation.
          </p>
          <p className="text-brand-bark/80 text-lg leading-relaxed">
            We cover unbiased, unscripted Midwest news, run intentional community properties starting with Hillshire Hollows, produce permaculture and Farmsteading education content, and build real human networks of people who give a damn about their neighbors.
          </p>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-12">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(v => (
              <div key={v.title} className="bg-brand-cream rounded-xl p-8">
                <h3 className="font-heading text-xl font-bold text-brand-green mb-3">{v.title}</h3>
                <p className="text-brand-bark/70 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
