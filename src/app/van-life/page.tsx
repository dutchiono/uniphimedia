export default function VanLifePage() {
  const membershipTiers = [
    {
      name: "Transient",
      price: "$35",
      period: "per night",
      features: [
        "Electric hookup (30 amp)",
        "Water fill station access",
        "Dump station use",
        "WiFi access",
        "Shower & laundry facilities",
        "Community fire pit"
      ]
    },
    {
      name: "Monthly",
      price: "$400",
      period: "per month",
      features: [
        "Dedicated parking spot",
        "All transient amenities",
        "Mail forwarding service",
        "Workshop tool access",
        "Garden plot option",
        "Member forum access"
      ]
    },
    {
      name: "Seasonal",
      price: "$900",
      period: "3 months",
      features: [
        "Premium spot with shade",
        "Extended stay privileges",
        "Storage unit (10x10)",
        "Community event priority",
        "Workshare opportunities",
        "Discounted raffle entries"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Van Life & RV Spots</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Your Nomadic Basecamp in the Heartland
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Whether you're passing through or planning an extended stay, our van life community 
            offers full hookups, modern amenities, and connections with fellow travelers.
          </p>
        </div>
      </section>

      {/* Why Uni-Phi for Van Life */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Why Choose Uni-Phi?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Community Over Commerce</h3>
              <p className="text-bark">
                We're not an RV park - we're a community. Connect with homesteaders, permaculture 
                practitioners, and fellow nomads building intentional lives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Work-Trade Welcome</h3>
              <p className="text-bark">
                Reduce your monthly rate through workshares. Help with gardens, building projects, 
                or media production in exchange for site credits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Skills & Learning</h3>
              <p className="text-bark">
                Free workshops on permaculture, solar systems, water management, and self-reliance. 
                Learn from experienced homesteaders.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Privacy & Freedom</h3>
              <p className="text-bark">
                No pushy management, no strict rules. Quiet hours respected, but this isn't an HOA. 
                Live and let live.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">Amenities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Electric Hookups</h3>
                <p>30-amp and 50-amp service available. Metered usage, fair pricing.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Water & Dump Station</h3>
                <p>Fresh water fill, gray water, and black water disposal. Clean and well-maintained.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">WiFi Access</h3>
                <p>Starlink internet available in common areas. Good for remote work and streaming.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Shower & Laundry</h3>
                <p>Clean bathhouse with hot showers. Coin-op laundry on site.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Community Fire Pit</h3>
                <p>Gather around the fire for stories, music, and connection under the stars.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Tool Library</h3>
                <p>Monthly+ members get access to community tools for van repairs and projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Membership Tiers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {membershipTiers.map((tier, idx) => (
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
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Rules */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Community Guidelines</h2>
          <div className="bg-cream p-8 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Quiet Hours:</strong> 10 PM - 7 AM. Generators off during quiet hours.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Guests:</strong> Welcome! Register guests at arrival. Overnight guests count toward occupancy.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Pets:</strong> Leashed and supervised. Clean up after your animals. No aggressive breeds off-leash.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Fires:</strong> Community fire pit only. No open fires near vehicles. Fire safety first.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Waste:</strong> Pack it in, pack it out. Keep your site clean. Use designated dump stations.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-3">•</span>
                <span><strong>Respect:</strong> Treat others as you want to be treated. Different lifestyles welcome.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Roll In?</h2>
          <p className="text-lg mb-8">
            Apply for a spot today. Short application helps us maintain community quality. 
            Most applications approved within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Apply for Van Life Spot
            </a>
            <a
              href="/membership"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              Learn More About Membership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
