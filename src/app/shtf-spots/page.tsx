export default function SHTFSpotsPage() {
  const pricingTiers = [
    {
      name: "Weekend Pass",
      price: "$150",
      period: "per weekend",
      features: [
        "Friday-Sunday access",
        "Cabin or tent site",
        "Community kitchen use",
        "Firewood included",
        "Basic pantry staples",
        "24-hour emergency contact"
      ]
    },
    {
      name: "Monthly Access",
      price: "$400",
      period: "per month",
      features: [
        "Unlimited monthly visits",
        "Private cabin assignment",
        "Stocked emergency pantry",
        "Water storage (50 gallons)",
        "Solar power access",
        "Community alert system"
      ]
    },
    {
      name: "Annual Membership",
      price: "$1,200",
      period: "per year",
      features: [
        "Year-round 24/7 access",
        "Dedicated bug-out cabin",
        "Full emergency provisions",
        "200-gallon water storage",
        "Off-grid power system",
        "Community defense coordination"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Vacation & SHTF Spots</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Your Off-Grid Retreat When You Need It Most
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Whether you need a weekend escape or a bug-out location for emergencies, our SHTF spots 
            provide secure, off-grid refuge in the heart of the Midwest.
          </p>
        </div>
      </section>

      {/* What is a SHTF Spot */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">What Is a SHTF Spot?</h2>
          <p className="text-lg text-bark text-center mb-12">
            SHTF (Stuff Hits The Fan) spots are secure, remote locations designed for both recreation 
            and resilience. Think of them as your backup plan with benefits.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Bug-Out Location</h3>
              <p className="text-bark">
                Pre-positioned emergency retreat. Hidden location, stocked supplies, ready when disaster strikes.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Off-Grid Cabin</h3>
              <p className="text-bark">
                Solar powered, water independent, wood heated. Practice self-reliance skills in comfort.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Vacation Retreat</h3>
              <p className="text-bark">
                Disconnect from the grid and reconnect with nature. Peaceful weekends away from the chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Stocked Pantry Option</h3>
                <p>Rice, beans, canned goods, water purification. 30-90 day food storage available.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Water Storage</h3>
                <p>Rainwater catchment, well access, or stored reserves. Never worry about water.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Solar Power</h3>
                <p>Off-grid electricity for lights, charging, and communication devices.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Hidden Location</h3>
                <p>Privacy and security. Coordinates shared only with verified members.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Community Access</h3>
              <p>Connect with like-minded preppers and Farmsteaders. Safety in numbers.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Emergency Communication</h3>
                <p>HAM radio, satellite phone backup, community alert system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Pricing Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className="bg-white border-2 border-bark rounded-lg p-8 shadow-lg hover:border-gold transition-colors">
                <h3 className="font-serif text-3xl text-forest mb-2">{tier.name}</h3>
                <div className="mb-6">
                  <p className="text-4xl font-bold text-bark">{tier.price}</p>
                  <p className="text-sm text-bark opacity-70">{tier.period}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-bark">
                      <span className="text-gold mr-2">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="block text-center bg-forest text-cream py-3 px-6 rounded-lg font-bold hover:bg-bark transition-colors"
                >
                  Book This Spot
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Who Is This For?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Urban Dwellers</h3>
              <p>City-based professionals who want a backup plan outside the concrete jungle.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Preppers</h3>
              <p>Serious about readiness but don't want to (or can't) own rural property yet.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Families</h3>
              <p>Parents teaching kids self-reliance skills and creating adventure memories.</p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-3">Weekend Warriors</h3>
              <p>Anyone wanting regular off-grid getaways without the maintenance burden.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Secure Your SHTF Spot Today</h2>
          <p className="text-lg mb-8">
            Limited availability. Priority given to annual members. Book a weekend trial or 
            reserve your bug-out location now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Reserve Your Spot
            </a>
            <a
              href="/membership"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              View Membership Options
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
