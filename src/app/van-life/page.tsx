export default function VanLifePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Your Rig, Our Roots</h1>
          <p className="text-xl opacity-90">Community without roots, basecamp in the heartland</p>
        </div>
      </section>

      {/* Why Uni-Phi for Van Life */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Why Uni-Phi for Van Life</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Community Without Roots</h3>
            <p className="text-bark">Connect with fellow travelers while maintaining your freedom to roam</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Midwest Basecamp</h3>
            <p className="text-bark">Strategic central location perfect for exploring the country</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Full Amenities</h3>
            <p className="text-bark">Everything you need to maintain your mobile lifestyle</p>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8">Amenities Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">Electric Hookups</h3>
              <p className="text-bark">30 and 50 amp service available</p>
            </div>
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">Water Access</h3>
              <p className="text-bark">Fresh water hookups at every spot</p>
            </div>
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">Dump Station</h3>
              <p className="text-bark">Clean, maintained waste facilities</p>
            </div>
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">WiFi</h3>
              <p className="text-bark">High-speed internet for remote work</p>
            </div>
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">Laundry</h3>
              <p className="text-bark">On-site washers and dryers</p>
            </div>
            <div className="border border-forest/20 p-6 rounded">
              <h3 className="text-xl font-semibold text-forest mb-2">Fire Pit</h3>
              <p className="text-bark">Community gathering space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Membership Tiers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Transient</h3>
            <div className="text-3xl font-bold text-gold mb-4">$35<span className="text-lg text-bark">/night</span></div>
            <ul className="space-y-2 text-bark">
              <li>• Perfect for passing through</li>
              <li>• All amenities included</li>
              <li>• No long-term commitment</li>
              <li>• Pay as you go</li>
            </ul>
          </div>
          <div className="bg-forest text-cream border-2 border-gold p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-gold mb-2">Monthly</h3>
            <div className="text-3xl font-bold text-gold mb-4">$400<span className="text-lg text-cream">/month</span></div>
            <ul className="space-y-2">
              <li>• Extended stay discount</li>
              <li>• Reserved spot priority</li>
              <li>• Community event access</li>
              <li>• Mail forwarding service</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Seasonal</h3>
            <div className="text-3xl font-bold text-gold mb-4">$900<span className="text-lg text-bark">/season</span></div>
            <ul className="space-y-2 text-bark">
              <li>• 3-month commitment</li>
              <li>• Best value option</li>
              <li>• Storage space available</li>
              <li>• Full community membership</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Community Rules */}
      <section className="bg-bark/10 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8">Community Rules</h2>
          <div className="bg-white p-8 rounded-lg space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🌙</span>
              <div>
                <h3 className="font-semibold text-forest mb-1">Quiet Hours</h3>
                <p className="text-bark">10 PM to 7 AM — respect your neighbors</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold text-forest mb-1">Maximum Stay</h3>
                <p className="text-bark">3-month continuous stay limit, 30-day break required</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🌱</span>
              <div>
                <h3 className="font-semibold text-forest mb-1">Leave It Better</h3>
                <p className="text-bark">Clean your spot, contribute to community maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Park Your Rig?</h2>
          <p className="text-xl mb-8 opacity-90">Get started with your van life membership today</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            Apply Now
          </a>
        </div>
      </section>
    </div>
  )
}
