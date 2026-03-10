export default function TornadoBunkersPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-bark text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Stay Safe. Stay Ready.</h1>
          <p className="text-xl opacity-90">Protection when you need it most</p>
        </div>
      </section>

      {/* Why a Bunker */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Why a Tornado Bunker?</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">1,000+</div>
              <p className="text-bark">Tornadoes per year in the US</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">EF5</div>
              <p className="text-bark">200+ mph winds possible</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">Midwest</div>
              <p className="text-bark">Ground zero for tornado alley</p>
            </div>
          </div>
        </div>
        <p className="text-lg text-bark text-center">Don't leave your family's safety to chance. A quality bunker can mean the difference between life and death.</p>
      </section>

      {/* What's Included */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-8">What's Included in Every Bunker</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">Reinforced Concrete Walls</h3>
              <p>12-inch thick steel-reinforced concrete construction</p>
            </div>
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">3-Point Ventilation</h3>
              <p>Independent air circulation system with filters</p>
            </div>
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">Emergency Storage</h3>
              <p>Built-in shelving for 72-hour supplies</p>
            </div>
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">Interior Lighting</h3>
              <p>LED lighting with battery backup</p>
            </div>
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">Separate Entrance</h3>
              <p>Exterior ground-level access point</p>
            </div>
            <div className="bg-bark/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-gold">Blast Door</h3>
              <p>Steel reinforced door with secure locking mechanism</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Choose Your Protection Level</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Personal</h3>
            <div className="text-3xl font-bold text-gold mb-4">$8,000</div>
            <p className="text-sm text-bark mb-4">Perfect for couples</p>
            <ul className="space-y-2 text-bark">
              <li>• 2-person capacity</li>
              <li>• 6' x 8' interior</li>
              <li>• 8 feet underground</li>
              <li>• Single blast door</li>
            </ul>
          </div>
          <div className="bg-forest text-cream border-2 border-gold p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-gold mb-2">Family</h3>
            <div className="text-3xl font-bold text-gold mb-4">$15,000</div>
            <p className="text-sm mb-4">Most popular option</p>
            <ul className="space-y-2">
              <li>• 6-person capacity</li>
              <li>• 10' x 12' interior</li>
              <li>• 10 feet underground</li>
              <li>• Reinforced blast door</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-forest p-8 rounded-lg">
            <h3 className="font-serif text-2xl text-forest mb-2">Community</h3>
            <div className="text-3xl font-bold text-gold mb-4">$35,000</div>
            <p className="text-sm text-bark mb-4">Extended family or group</p>
            <ul className="space-y-2 text-bark">
              <li>• 20-person capacity</li>
              <li>• 16' x 20' interior</li>
              <li>• 12 feet underground</li>
              <li>• Double blast doors</li>
            </ul>
          </div>
        </div>

        {/* Specs Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h3 className="font-serif text-2xl text-forest p-6 bg-bark/5">Technical Specifications</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-forest text-cream">
                <tr>
                  <th className="px-6 py-3 text-left">Model</th>
                  <th className="px-6 py-3 text-left">Dimensions</th>
                  <th className="px-6 py-3 text-left">Depth</th>
                  <th className="px-6 py-3 text-left">Capacity</th>
                  <th className="px-6 py-3 text-left">Door Type</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-6 py-4 text-bark">Personal</td>
                  <td className="px-6 py-4 text-bark">6' x 8'</td>
                  <td className="px-6 py-4 text-bark">8 feet</td>
                  <td className="px-6 py-4 text-bark">2 people</td>
                  <td className="px-6 py-4 text-bark">Single blast</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-bark">Family</td>
                  <td className="px-6 py-4 text-bark">10' x 12'</td>
                  <td className="px-6 py-4 text-bark">10 feet</td>
                  <td className="px-6 py-4 text-bark">6 people</td>
                  <td className="px-6 py-4 text-bark">Reinforced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-bark">Community</td>
                  <td className="px-6 py-4 text-bark">16' x 20'</td>
                  <td className="px-6 py-4 text-bark">12 feet</td>
                  <td className="px-6 py-4 text-bark">20 people</td>
                  <td className="px-6 py-4 text-bark">Double blast</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Protect What Matters Most</h2>
          <p className="text-xl mb-8 opacity-90">Get a quote for your tornado bunker today</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            Request a Quote
          </a>
        </div>
      </section>
    </div>
  )
}
