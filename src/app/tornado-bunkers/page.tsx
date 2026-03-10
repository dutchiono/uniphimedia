export default function TornadoBunkersPage() {
  const bunkerTiers = [
    {
      name: "Personal",
      capacity: "2-person",
      price: "$8,000",
      features: [
        "6' x 8' interior space",
        "Reinforced concrete construction",
        "Steel blast door with lock",
        "Ventilation system with filter",
        "Emergency lighting (battery)",
        "72-hour capacity",
        "Separate ground-level entrance",
        "Professional installation included"
      ]
    },
    {
      name: "Family",
      capacity: "6-person",
      price: "$15,000",
      features: [
        "10' x 12' interior space",
        "Double-reinforced concrete walls",
        "Commercial-grade blast door",
        "HVAC with NBC air filtration",
        "Solar-powered LED lighting",
        "1-week supply storage",
        "Bunk sleeping arrangements",
        "Emergency toilet & water storage"
      ]
    },
    {
      name: "Community",
      capacity: "20-person",
      price: "$35,000",
      features: [
        "20' x 30' interior space",
        "Commercial bunker specs (F5-rated)",
        "Dual-entry blast doors",
        "Advanced life support systems",
        "Off-grid power backup",
        "30-day supply capacity",
        "Communication equipment ready",
        "Shared-cost maintenance plan"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Tornado Bunkers</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Midwest Storm Protection You Can Trust
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Underground storm shelters engineered for tornado alley. Whether you're adding safety 
            to your homestead or securing a standalone bunker, we've got you covered when the sirens sound.
          </p>
        </div>
      </section>

      {/* Why a Bunker */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Why a Tornado Bunker?</h2>
          <div className="bg-bark text-cream p-8 rounded-lg mb-8">
            <h3 className="font-serif text-2xl mb-4 text-gold">The Midwest Reality</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>The Midwest sees 1,000+ tornadoes annually, with peak season March-June</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>F4 and F5 tornadoes can destroy standard homes in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Most rural homesteads lack basement shelters or safe rooms</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Average warning time: 10-15 minutes. You need a plan NOW.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">•</span>
                <span>Underground bunkers rated for F5 tornadoes provide true peace of mind</span>
              </li>
            </ul>
          </div>
          <p className="text-lg text-bark text-center">
            A bunker isn't paranoia - it's practical Midwest living. Protect your family, livestock alerts, 
            and irreplaceable belongings when the weather turns deadly.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Reinforced Concrete Construction</h3>
              <p>
                12-inch poured concrete walls and ceiling. Steel rebar reinforcement. 
                Designed to withstand direct hits from F5 debris.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Ventilation System</h3>
              <p>
                Passive and active air circulation. HEPA filtration option available. 
                Prevents suffocation during extended stays.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Emergency Supplies Storage</h3>
              <p>
                Built-in shelving for water, food, first aid, and communication gear. 
                Designed for 72-hour to 30-day capacity depending on tier.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Separate Entrance</h3>
              <p>
                Ground-level or angled entry with stairs. Quick access during warnings. 
                Steel blast door with interior lock.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Professional Installation</h3>
              <p>
                Licensed contractors with tornado shelter certification. Excavation, 
                installation, backfill, and inspection included.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Lifetime Warranty</h3>
              <p>
                Structural warranty against leaks and failure. Annual inspection available. 
                Built to last generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bunker Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Choose Your Bunker</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {bunkerTiers.map((tier, idx) => (
              <div key={idx} className="bg-white border-2 border-bark rounded-lg p-8 shadow-lg hover:border-gold transition-colors">
                <h3 className="font-serif text-3xl text-forest mb-2">{tier.name}</h3>
                <p className="text-xl text-gold font-bold mb-4">{tier.capacity}</p>
                <p className="text-4xl font-bold text-bark mb-6">{tier.price}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-bark">
                      <span className="text-gold mr-2 mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="block text-center bg-forest text-cream py-3 px-6 rounded-lg font-bold hover:bg-bark transition-colors"
                >
                  Get a Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Technical Specifications</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-cream text-bark rounded-lg">
              <thead>
                <tr className="bg-forest text-cream">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">Personal</th>
                  <th className="p-4 text-center">Family</th>
                  <th className="p-4 text-center">Community</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-bark">
                  <td className="p-4 font-bold">Interior Size</td>
                  <td className="p-4 text-center">6' x 8'</td>
                  <td className="p-4 text-center">10' x 12'</td>
                  <td className="p-4 text-center">20' x 30'</td>
                </tr>
                <tr className="border-b border-bark">
                  <td className="p-4 font-bold">Capacity</td>
                  <td className="p-4 text-center">2 people</td>
                  <td className="p-4 text-center">6 people</td>
                  <td className="p-4 text-center">20 people</td>
                </tr>
                <tr className="border-b border-bark">
                  <td className="p-4 font-bold">Wall Thickness</td>
                  <td className="p-4 text-center">12 inches</td>
                  <td className="p-4 text-center">18 inches</td>
                  <td className="p-4 text-center">24 inches</td>
                </tr>
                <tr className="border-b border-bark">
                  <td className="p-4 font-bold">Wind Rating</td>
                  <td className="p-4 text-center">F4 (250 mph)</td>
                  <td className="p-4 text-center">F5 (300 mph)</td>
                  <td className="p-4 text-center">F5+ (350 mph)</td>
                </tr>
                <tr className="border-b border-bark">
                  <td className="p-4 font-bold">Power Source</td>
                  <td className="p-4 text-center">Battery</td>
                  <td className="p-4 text-center">Solar + Battery</td>
                  <td className="p-4 text-center">Generator Ready</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Installation Time</td>
                  <td className="p-4 text-center">3-5 days</td>
                  <td className="p-4 text-center">1-2 weeks</td>
                  <td className="p-4 text-center">3-4 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Protect Your Family Today</h2>
          <p className="text-lg mb-8">
            Tornado season doesn't wait. Schedule a site assessment and get a custom quote. 
            Financing available. Veterans receive 10% discount.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Request a Quote
            </a>
            <a
              href="/hsh/packages"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              View Homestead Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
