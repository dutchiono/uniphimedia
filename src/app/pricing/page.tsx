export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl opacity-90">Choose the plan that fits your lifestyle and budget</p>
        </div>
      </section>

      {/* Toggle Placeholder */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-forest text-cream rounded-lg font-semibold">Monthly</button>
          <button className="px-6 py-2 bg-bark/20 text-bark rounded-lg font-semibold">Annual</button>
        </div>
        <p className="text-center text-sm text-bark mt-2">Save 15% with annual billing</p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free/Basic */}
          <div className="bg-white border-2 border-bark/30 p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Free/Basic</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-bark">$0</span>
              <span className="text-bark/60">/forever</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Forum access</li>
              <li>• Weekly newsletter</li>
              <li>• Community updates</li>
              <li>• Explore Uni-Phi</li>
              <li>• Upgrade anytime</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-bark text-cream px-6 py-3 rounded font-semibold hover:bg-bark/90 transition">
              Join Free
            </a>
          </div>

          {/* Seed Club */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Seed Club</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$15</span>
              <span className="text-bark/60">/month</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Monthly seed packets</li>
              <li>• Early media access</li>
              <li>• Garden tips & guides</li>
              <li>• Member-only content</li>
              <li>• Forum access</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Join Seed Club
            </a>
          </div>

          {/* Sticker Club */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Sticker Club</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$10</span>
              <span className="text-bark/60">/month</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Monthly sticker delivery</li>
              <li>• Sticker store discount</li>
              <li>• Exclusive designs</li>
              <li>• Forum access</li>
              <li>• Newsletter</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Join Sticker Club
            </a>
          </div>

          {/* Veteran Support */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Veteran Support</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$25</span>
              <span className="text-bark/60">/month</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Supports vet raffle</li>
              <li>• Veteran forum access</li>
              <li>• Help vets get land</li>
              <li>• Monthly impact report</li>
              <li>• Community gratitude</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Support Veterans
            </a>
          </div>

          {/* Van Life */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Van Life</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$400</span>
              <span className="text-bark/60">/month</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Full RV spot access</li>
              <li>• All amenities included</li>
              <li>• WiFi & electric hookup</li>
              <li>• Laundry & dump station</li>
              <li>• Community events</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Join Van Life
            </a>
          </div>

          {/* Workshare */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Workshare</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$0</span>
              <span className="text-bark/60">+ labor</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Earn your keep</li>
              <li>• Trade labor for benefits</li>
              <li>• Build sweat equity</li>
              <li>• Tool library access</li>
              <li>• Community priority</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Apply for Workshare
            </a>
          </div>

          {/* Retiree Paradise */}
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Retiree Paradise</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$500</span>
              <span className="text-bark/60">/month</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Full community living</li>
              <li>• 55+ community</li>
              <li>• Social calendar</li>
              <li>• Medical proximity</li>
              <li>• Low-maintenance lifestyle</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Join Retiree Paradise
            </a>
          </div>

          {/* Lifetime */}
          <div className="bg-gold border-2 border-forest p-8 rounded-lg relative">
            <div className="absolute top-0 right-0 bg-forest text-cream px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">BEST VALUE</div>
            <h3 className="font-serif text-2xl text-forest mb-2">Lifetime</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-forest">$5,000</span>
              <span className="text-bark/60">/one-time</span>
            </div>
            <ul className="space-y-3 text-bark mb-8 h-40">
              <li>• Everything, forever</li>
              <li>• Locked pricing</li>
              <li>• Never pay again</li>
              <li>• Priority lot selection</li>
              <li>• Build credits included</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Go Lifetime
            </a>
          </div>

          {/* Premium */}
          <div className="bg-forest text-cream border-2 border-gold p-8 rounded-lg relative">
            <div className="absolute top-0 right-0 bg-gold text-forest px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">TOP TIER</div>
            <h3 className="font-serif text-2xl text-gold mb-2">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gold">$750</span>
              <span className="opacity-60">/month</span>
            </div>
            <ul className="space-y-3 mb-8 h-40">
              <li>• Leadership council access</li>
              <li>• Profit sharing</li>
              <li>• 15% property discount</li>
              <li>• Vote on major decisions</li>
              <li>• All benefits included</li>
            </ul>
            <a href="/contact" className="block w-full text-center bg-gold text-forest px-6 py-3 rounded font-semibold hover:bg-gold/90 transition">
              Go Premium
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">How does billing work?</h3>
              <p className="text-bark">Monthly memberships renew automatically on the same day each month. Annual memberships save you 15% and renew once per year. You can cancel anytime.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Can I cancel my membership?</h3>
              <p className="text-bark">Yes. You can cancel at any time with no penalty. You'll retain access through the end of your current billing period.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Can I upgrade or downgrade?</h3>
              <p className="text-bark">Absolutely. Upgrade anytime and get immediate access to new benefits. Downgrade takes effect at your next billing cycle.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">What payment methods do you accept?</h3>
              <p className="text-bark">We accept credit cards, debit cards, ACH transfers, and cryptocurrency (Bitcoin, Monero, Ethereum) for most memberships.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Is the Lifetime membership really lifetime?</h3>
              <p className="text-bark">Yes. One payment of $5,000 gets you lifetime access to all community benefits with no recurring fees. Your pricing is locked forever.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Can I try before I commit?</h3>
              <p className="text-bark">Yes. Start with a free Basic membership to explore the forums and newsletter. When you're ready, upgrade to a paid tier.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Do prices ever increase?</h3>
              <p className="text-bark">Prices may increase for new members, but your rate is locked when you join. Existing members are grandfathered at their original pricing.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">What if I buy land — do I still need membership?</h3>
              <p className="text-bark">Land ownership and membership are separate. You can own land without membership (no community benefits), or be a member without owning land.</p>
            </div>
            <div className="border-b border-bark/20 pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">How does Workshare pricing work?</h3>
              <p className="text-bark">Workshare members pay $0 in cash but commit to 20 hours/month of community labor. You earn credits toward property and build projects.</p>
            </div>
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-forest mb-2">Can I pause my membership?</h3>
              <p className="text-bark">We don't offer pausing, but you can cancel and rejoin anytime. Your account history is preserved for 12 months after cancellation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Join?</h2>
          <p className="text-xl mb-8 opacity-90">Pick your membership and become part of the Uni-Phi community today</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
