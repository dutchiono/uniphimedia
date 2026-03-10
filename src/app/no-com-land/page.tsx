export default function NoComLandPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">The Land. Just The Land.</h1>
          <p className="text-xl opacity-90">Property without community obligations</p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Who This Is For</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-bark mb-6">
            Not everyone wants to be part of a community. Some folks just need good land at a fair price without the social obligations, events, or workshares.
          </p>
          <p className="text-lg text-bark">
            This option is for independent buyers who value privacy and autonomy. You get a recorded deed, access to utilities, and the freedom to build your life without community commitments.
          </p>
        </div>
      </section>

      {/* What IS Included */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8">What IS Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-forest/5 border-2 border-forest p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-forest mb-3">📜 Recorded Deed</h3>
              <p className="text-bark">Full legal ownership with warranty deed recorded at the county level</p>
            </div>
            <div className="bg-forest/5 border-2 border-forest p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-forest mb-3">🛣️ Road Access</h3>
              <p className="text-bark">Maintained gravel road access to your property line</p>
            </div>
            <div className="bg-forest/5 border-2 border-forest p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-forest mb-3">💧 Water Tap-In Option</h3>
              <p className="text-bark">Connection point available to county water system (buyer pays connection fee)</p>
            </div>
            <div className="bg-forest/5 border-2 border-forest p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-forest mb-3">⚡ Electric Tap-In Option</h3>
              <p className="text-bark">Connection available to power grid (buyer pays connection and meter fees)</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is NOT Included */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">What is NOT Included</h2>
        <div className="bg-red-50 border-2 border-red-300 p-8 rounded-lg">
          <p className="text-red-800 font-semibold mb-6">This land purchase does NOT include any community benefits or obligations:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-900 mb-2">❌ Community Membership</h3>
              <p className="text-red-800 text-sm">You are not a member of Uni-Phi community</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-900 mb-2">❌ Forum Access</h3>
              <p className="text-red-800 text-sm">No access to member forums or online community</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-900 mb-2">❌ Workshares</h3>
              <p className="text-red-800 text-sm">Cannot participate in work-trade programs</p>
            </div>
            <div>
              <h3 className="font-semibold text-red-900 mb-2">❌ Events</h3>
              <p className="text-red-800 text-sm">No access to community gatherings, workshops, or social events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-8 text-center">Pricing</h2>
          <div className="bg-bark/30 p-8 rounded-lg text-center">
            <div className="text-5xl font-bold text-gold mb-4">$8,000 per acre</div>
            <p className="text-xl mb-8">Minimum 2 acres • $500 deposit to hold</p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 p-4 rounded">
                <div className="font-semibold mb-2">2 Acres</div>
                <div className="text-2xl text-gold">$16,000</div>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <div className="font-semibold mb-2">5 Acres</div>
                <div className="text-2xl text-gold">$40,000</div>
              </div>
              <div className="bg-white/10 p-4 rounded">
                <div className="font-semibold mb-2">10 Acres</div>
                <div className="text-2xl text-gold">$80,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-3">Can I join the community later?</h3>
            <p className="text-bark">Yes. You can purchase a separate community membership at any time. Land ownership and community membership are independent purchases.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-3">Are there HOA fees?</h3>
            <p className="text-bark">No. There are no homeowner association fees, monthly dues, or ongoing costs beyond property taxes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-3">What are the deed restrictions?</h3>
            <p className="text-bark mb-2">Minimal restrictions to protect all landowners:</p>
            <ul className="list-disc list-inside text-bark space-y-1 ml-4">
              <li>No commercial or industrial use</li>
              <li>No subdivision into smaller parcels</li>
              <li>Must maintain road access easements</li>
              <li>No structures within 50 feet of property lines</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-3">Can I build right away?</h3>
            <p className="text-bark">Yes, as soon as you close. You're responsible for obtaining building permits from the county. We can recommend local builders if needed.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-3">What's the deposit policy?</h3>
            <p className="text-bark">$500 deposit holds your lot for 30 days. Deposit is fully refundable if you decide not to proceed. Applied to purchase price if you close.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Own Your Land?</h2>
          <p className="text-xl mb-8 opacity-90">Contact us to view available parcels and start the purchase process</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            View Available Land
          </a>
        </div>
      </section>
    </div>
  )
}
