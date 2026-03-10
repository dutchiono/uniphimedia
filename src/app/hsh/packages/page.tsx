export default function HillsidePackagesPage() {
  const packages = [
    {
      name: "Starter Hillside",
      price: "$15,000",
      deposit: "$500 deposit",
      sqft: "200-400 sq ft",
      features: [
        "Basic foundation & utilities hookup",
        "Cleared building pad on hillside lot",
        "Road access & parking area",
        "Community garden plot access",
        "Workshop tool library membership",
        "90-day building timeline support"
      ],
      highlighted: false
    },
    {
      name: "Homesteader",
      price: "$28,000",
      deposit: "$1,000 deposit",
      sqft: "400-600 sq ft",
      features: [
        "Reinforced foundation with root cellar",
        "Water catchment system included",
        "Solar power setup (2kW system)",
        "Premium hillside lot selection",
        "Timber frame materials included",
        "6-month building support & workshops"
      ],
      highlighted: false
    },
    {
      name: "Hobbit Home Bundle",
      price: "$42,000",
      deposit: "$2,000 deposit",
      sqft: "600-800 sq ft",
      features: [
        "Complete earth-sheltered home design",
        "Living roof with waterproofing system",
        "Wood stove & chimney installed",
        "Full solar system (4kW) + battery bank",
        "Hand-carved hobbit door & windows",
        "Lifetime community membership included"
      ],
      highlighted: true
    },
    {
      name: "Tornado Bunker Package",
      price: "$55,000",
      deposit: "$2,500 deposit",
      sqft: "800-1000 sq ft",
      features: [
        "Above-ground home + underground bunker",
        "Reinforced concrete storm shelter (6-person)",
        "Dual power systems (solar + generator)",
        "Emergency water storage (500 gallons)",
        "Perimeter security lighting & fencing",
        "Priority emergency community response"
      ],
      highlighted: false
    },
    {
      name: "Bitcoin Bundle",
      price: "0.42 BTC",
      deposit: "0.02 BTC deposit",
      sqft: "600-800 sq ft",
      features: [
        "Full Hobbit Home Bundle (crypto pricing)",
        "5% discount for full BTC payment",
        "Privacy-focused transaction processing",
        "Also accepts XMR, ETH, gold/silver",
        "Inflation-hedge your homestead",
        "Financial sovereignty community support"
      ],
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Hillshire Hollows Packages</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Your Off-Grid Homestead Starts Here
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Choose from five carefully crafted packages designed for Midwest homesteaders. 
            From starter lots to complete hobbit homes with underground bunkers, we've built 
            a path for every budget and lifestyle.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`${
                  pkg.highlighted
                    ? 'bg-gold text-forest border-4 border-forest transform scale-105'
                    : 'bg-white text-bark border-2 border-bark'
                } rounded-lg p-8 shadow-lg transition-transform hover:scale-105`}
              >
                {pkg.highlighted && (
                  <div className="text-center mb-4">
                    <span className="inline-block bg-forest text-cream px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <p className="text-4xl font-bold mb-1">{pkg.price}</p>
                  <p className="text-sm opacity-80">{pkg.deposit}</p>
                  <p className="text-sm font-semibold mt-2">{pkg.sqft}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className={`block text-center py-3 px-6 rounded-lg font-bold transition-colors ${
                    pkg.highlighted
                      ? 'bg-forest text-cream hover:bg-bark'
                      : 'bg-forest text-cream hover:bg-bark'
                  }`}
                >
                  Reserve This Package
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Hillshire Hollows */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Why Choose Hillshire Hollows?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-serif text-xl mb-2">Rolling Hills Terrain</h3>
              <p className="text-sm">
                Natural earth-sheltered building sites with southern exposure for passive solar heating.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-serif text-xl mb-2">Community Support</h3>
              <p className="text-sm">
                Join 40+ families building sustainable lives together. Workshops, tool shares, and mutual aid.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-serif text-xl mb-2">Tornado-Ready</h3>
              <p className="text-sm">
                Optional underground bunkers rated for F5 tornadoes. Safety first in the Midwest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Build Your Homestead?</h2>
          <p className="text-lg mb-8">
            Schedule a site visit, ask questions, or reserve your package today. 
            Our team is here to help you find the perfect fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-3 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/hsh"
              className="bg-bark text-cream py-3 px-8 rounded-lg font-bold hover:bg-forest transition-colors"
            >
              Learn More About HSH
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
