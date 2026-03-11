export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">What You Get as a Member</h1>
          <p className="text-xl opacity-90">Comprehensive benefits across five key areas</p>
        </div>
      </section>

      {/* Benefit Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Community Benefits */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">🤝</div>
            <h2 className="font-serif text-4xl text-forest">Community Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Garden Access</h3>
              <p className="text-bark">Free access to community gardens with established beds and composting systems</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Tool Library</h3>
              <p className="text-bark">Borrow tools, equipment, and machinery without the storage or maintenance burden</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Workshops & Education</h3>
              <p className="text-bark">Monthly skill-building workshops on Farmsteading, building, and self-sufficiency</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Community Events</h3>
              <p className="text-bark">Seasonal gatherings, potlucks, work parties, and social connection opportunities</p>
            </div>
          </div>
        </div>

        {/* Property Benefits */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">🏡</div>
            <h2 className="font-serif text-4xl text-forest">Property Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Lot Priority Selection</h3>
              <p className="text-bark">Members get first choice on available land parcels before public release</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Build Credits</h3>
              <p className="text-bark">Earn credits toward construction projects through community participation</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Discounted Packages</h3>
              <p className="text-bark">5-15% off land packages depending on membership tier</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Build Support</h3>
              <p className="text-bark">Access to community labor days for major projects and moving assistance</p>
            </div>
          </div>
        </div>

        {/* Media Benefits */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">📻</div>
            <h2 className="font-serif text-4xl text-forest">Media Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Early Podcast Access</h3>
              <p className="text-bark">Get episodes 48 hours before public release with exclusive member commentary</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Member-Only Videos</h3>
              <p className="text-bark">Behind-the-scenes content, property tours, and educational series</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Live Q&A Sessions</h3>
              <p className="text-bark">Monthly live streams with direct access to community leaders</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Content Archive</h3>
              <p className="text-bark">Full access to years of educational content and community history</p>
            </div>
          </div>
        </div>

        {/* Financial Benefits */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">💰</div>
            <h2 className="font-serif text-4xl text-forest">Financial Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Profit Sharing</h3>
              <p className="text-bark">Premium members receive quarterly distributions from community ventures</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Group Buying Power</h3>
              <p className="text-bark">Bulk discounts on building materials, seeds, and supplies through collective purchasing</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Workshare Credits</h3>
              <p className="text-bark">Trade labor for goods, services, or property equity within the community</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Tax Strategy Workshops</h3>
              <p className="text-bark">Educational sessions on farm tax benefits, Farmstead exemptions, and write-offs</p>
            </div>
          </div>
        </div>

        {/* Social Benefits */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl">🌟</div>
            <h2 className="font-serif text-4xl text-forest">Social Benefits</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Forum Access</h3>
              <p className="text-bark">Private online community for discussions, questions, and knowledge sharing</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Leader Track Program</h3>
              <p className="text-bark">Pathway to community leadership roles and decision-making positions</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Annual Gathering</h3>
              <p className="text-bark">Multi-day festival bringing together all Uni-Phi communities with workshops and celebration</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Mentorship Program</h3>
              <p className="text-bark">Paired with experienced members in your area of interest for one-on-one guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Benefits by Membership Tier</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-forest text-cream">
                  <th className="px-4 py-3 text-left">Benefit</th>
                  <th className="px-4 py-3 text-center">Basic</th>
                  <th className="px-4 py-3 text-center">Seed Club</th>
                  <th className="px-4 py-3 text-center">Van Life</th>
                  <th className="px-4 py-3 text-center">Workshare</th>
                  <th className="px-4 py-3 text-center">Lifetime</th>
                  <th className="px-4 py-3 text-center">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 text-bark">Forum Access</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr className="bg-cream/50">
                  <td className="px-4 py-3 text-bark">Newsletter</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-bark">Garden Access</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr className="bg-cream/50">
                  <td className="px-4 py-3 text-bark">Tool Library</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-bark">Property Discounts</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">5%</td>
                  <td className="px-4 py-3 text-center">10%</td>
                  <td className="px-4 py-3 text-center">10%</td>
                  <td className="px-4 py-3 text-center">15%</td>
                </tr>
                <tr className="bg-cream/50">
                  <td className="px-4 py-3 text-bark">Early Media Access</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-bark">Profit Sharing</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
                <tr className="bg-cream/50">
                  <td className="px-4 py-3 text-bark">Leadership Council</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">—</td>
                  <td className="px-4 py-3 text-center">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Start Accessing These Benefits</h2>
          <p className="text-xl mb-8 opacity-90">Choose your membership tier and join today</p>
          <a href="/pricing" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            View Pricing
          </a>
        </div>
      </section>
    </div>
  )
}
