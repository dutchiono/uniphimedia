export default function MembershipTypesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Find Your Place in the Community</h1>
          <p className="text-xl opacity-90">Choose the membership that fits your lifestyle</p>
        </div>
      </section>

      {/* Membership Types */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Workshare Member */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">🛠️</div>
            <h2 className="font-serif text-3xl text-forest mb-3 text-center">Workshare Member</h2>
            <p className="text-center text-bark mb-6 italic">Work-trade model</p>
            <ul className="space-y-3 text-bark mb-8">
              <li>• Earn equity through labor contributions</li>
              <li>• Great for hands-on folks who want to build sweat equity</li>
              <li>• Access to tool library and materials</li>
              <li>• Priority on community build projects</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Retiree Paradise Member */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">🌅</div>
            <h2 className="font-serif text-3xl text-forest mb-3 text-center">Retiree Paradise</h2>
            <p className="text-center text-bark mb-6 italic">55+ lifestyle community</p>
            <ul className="space-y-3 text-bark mb-8">
              <li>• Low-maintenance lifestyle designed for retirees</li>
              <li>• Active social calendar with events</li>
              <li>• Medical services proximity</li>
              <li>• Community support network</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Van Life Member */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">🚐</div>
            <h2 className="font-serif text-3xl text-forest mb-3 text-center">Van Life Member</h2>
            <p className="text-center text-bark mb-6 italic">Mobile, seasonal, flexible</p>
            <ul className="space-y-3 text-bark mb-8">
              <li>• Full RV hookups and amenities</li>
              <li>• Come and go as you please</li>
              <li>• Community connection without roots</li>
              <li>• Monthly or seasonal rates available</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Lifetime Member */}
          <div className="bg-gold border-2 border-forest p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">♾️</div>
            <h2 className="font-serif text-3xl text-forest mb-3 text-center">Lifetime Member</h2>
            <p className="text-center text-bark mb-6 italic">Permanent stake, locked forever</p>
            <ul className="space-y-3 text-bark mb-8">
              <li>• One-time payment, lifetime benefits</li>
              <li>• Locked pricing that never increases</li>
              <li>• All community benefits included</li>
              <li>• Priority lot selection and build credits</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Premium Member */}
          <div className="bg-forest text-cream border-2 border-gold p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">👑</div>
            <h2 className="font-serif text-3xl text-gold mb-3 text-center">Premium Member</h2>
            <p className="text-center mb-6 italic">Top tier, leadership access</p>
            <ul className="space-y-3 mb-8">
              <li>• All benefits plus leadership council access</li>
              <li>• Profit sharing on community ventures</li>
              <li>• Property discounts up to 15%</li>
              <li>• Vote on major community decisions</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-gold text-forest px-6 py-3 rounded font-semibold hover:bg-gold/90 transition">
                Learn More
              </a>
            </div>
          </div>

          {/* Basic/Free */}
          <div className="bg-white border-2 border-bark/30 p-8 rounded-lg hover:shadow-lg transition">
            <div className="text-5xl mb-4 text-center">🌱</div>
            <h2 className="font-serif text-3xl text-forest mb-3 text-center">Basic (Free)</h2>
            <p className="text-center text-bark mb-6 italic">Get started, no commitment</p>
            <ul className="space-y-3 text-bark mb-8">
              <li>• Forum access and community discussion</li>
              <li>• Weekly newsletter with updates</li>
              <li>• Explore what Uni-Phi is about</li>
              <li>• Upgrade anytime to paid tiers</li>
            </ul>
            <div className="text-center">
              <a href="/pricing" className="inline-block bg-bark text-cream px-6 py-3 rounded font-semibold hover:bg-bark/90 transition">
                Join Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Compare Membership Types</h2>
          <div className="bg-cream p-8 rounded-lg">
            <p className="text-lg text-bark text-center mb-6">
              Each membership type offers different benefits tailored to your lifestyle. Whether you're looking for a mobile basecamp, a retirement haven, or a permanent stake in the community, there's an option for you.
            </p>
            <div className="text-center">
              <a href="/benefits" className="inline-block bg-forest text-cream px-8 py-4 rounded-lg font-semibold hover:bg-forest/90 transition">
                View Full Benefits Comparison
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Join?</h2>
          <p className="text-xl mb-8 opacity-90">Choose your membership and become part of the Uni-Phi community</p>
          <a href="/pricing" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            View Pricing
          </a>
        </div>
      </section>
    </div>
  )
}
