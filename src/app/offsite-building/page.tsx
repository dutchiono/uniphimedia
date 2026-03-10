export default function OffsiteBuildingPage() {
  const homeTypes = [
    {
      name: "Hobbit Home",
      priceRange: "$35k - $55k",
      size: "400-800 sq ft",
      features: ["Earth-sheltered design", "Living roof system", "Custom round door", "Timber frame"]
    },
    {
      name: "Tiny Home",
      priceRange: "$18k - $35k",
      size: "200-400 sq ft",
      features: ["Trailer-mounted or foundation", "Full kitchen & bath", "Loft sleeping", "Off-grid ready"]
    },
    {
      name: "Cabin Shell",
      priceRange: "$25k - $45k",
      size: "400-600 sq ft",
      features: ["Log or timber frame", "Weathertight exterior", "DIY finish interior", "Porch included"]
    },
    {
      name: "Container Home",
      priceRange: "$30k - $65k",
      size: "320-640 sq ft",
      features: ["Shipping container base", "Insulated & finished", "Modern industrial look", "Modular expansion"]
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Offsite Home Building</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            We Build, Deliver, Install - You Live
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Get a Uni-Phi designed structure built offsite by our crew, then delivered and installed 
            on your land. Skip the DIY headaches while still getting a custom homestead.
          </p>
        </div>
      </section>

      {/* What Is Offsite Building */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">What Is Offsite Building?</h2>
          <p className="text-lg text-bark text-center mb-12">
            Also called prefab or modular construction, offsite building means we construct your home 
            in our workshop, then transport and install it on your property. Faster, more affordable, 
            and better quality control than traditional stick-building.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-forest text-2xl font-bold">
                1
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">Build in Workshop</h3>
              <p className="text-bark">
                Weather-protected construction with proper tools and staging. No delays from rain or snow.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-forest text-2xl font-bold">
                2
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">Deliver to Site</h3>
              <p className="text-bark">
                Truck or trailer transport to your property. Crane or heavy equipment for placement.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-forest text-2xl font-bold">
                3
              </div>
              <h3 className="font-serif text-xl text-forest mb-3">Install & Connect</h3>
              <p className="text-bark">
                Set on foundation, anchor down, connect utilities. Move-in ready in days, not months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Home Types Available */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">Home Types Available</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {homeTypes.map((home, idx) => (
              <div key={idx} className="bg-cream text-forest p-8 rounded-lg">
                <h3 className="font-serif text-3xl mb-2">{home.name}</h3>
                <p className="text-2xl font-bold text-gold mb-2">{home.priceRange}</p>
                <p className="text-lg mb-4 opacity-70">{home.size}</p>
                <ul className="space-y-2">
                  {home.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gold mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Our Process</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Step 1: Design Consultation</h3>
              <p className="text-bark mb-2">
                We meet (virtually or in-person) to discuss your vision, budget, and site conditions. 
                Review design options and customize your build.
              </p>
              <p className="text-sm text-bark opacity-70">Timeline: 1-2 weeks</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Step 2: Permits & Site Prep</h3>
              <p className="text-bark mb-2">
                We help with permit applications (varies by county). You prepare the site: foundation pad, 
                utilities stubbed, and access road for delivery truck.
              </p>
              <p className="text-sm text-bark opacity-70">Timeline: 2-8 weeks (permit-dependent)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Step 3: Offsite Build</h3>
              <p className="text-bark mb-2">
                We construct your home in our workshop. Updates and photos provided weekly. 
                Quality control inspections throughout.
              </p>
              <p className="text-sm text-bark opacity-70">Timeline: 4-12 weeks (size-dependent)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Step 4: Delivery</h3>
              <p className="text-bark mb-2">
                Scheduled transport to your property. We coordinate delivery window and arrival time. 
                Crane service included for structures over 400 sq ft.
              </p>
              <p className="text-sm text-bark opacity-70">Timeline: 1-3 days</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Step 5: Installation</h3>
              <p className="text-bark mb-2">
                Set and anchor the structure, connect utilities (if applicable), final walkthrough and punch list. 
                We don't leave until you're satisfied.
              </p>
              <p className="text-sm text-bark opacity-70">Timeline: 1-5 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Timeline */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Pricing & Timeline</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">What's Included</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Complete design & engineering</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>All materials & labor for build</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Delivery within 200 miles</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Installation & utility hookup</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>1-year workmanship warranty</span>
                </li>
              </ul>
            </div>
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">NOT Included</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Foundation (your responsibility)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Permits & fees (we help, you pay)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Site access prep (grading, road)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Delivery beyond 200 miles (extra fee)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✗</span>
                  <span>Land purchase (unless bundled)</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-forest text-cream p-6 rounded-lg text-center">
            <p className="text-xl mb-2">
              <strong>Total Timeline:</strong> 8-24 weeks from deposit to move-in
            </p>
            <p className="text-sm opacity-80">
              Actual time depends on permits, weather, and design complexity
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Offsite */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Why Choose Offsite?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-gold text-3xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl text-forest mb-2">Faster Build Time</h3>
                <p className="text-bark">
                  No weather delays. Parallel site prep and building. Move in months sooner than stick-built.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-3xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl text-forest mb-2">Better Quality Control</h3>
                <p className="text-bark">
                  Workshop environment means precision cuts, proper staging, and protected materials.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-3xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl text-forest mb-2">Lower Cost</h3>
                <p className="text-bark">
                  Efficient construction saves 20-30% vs. traditional builds. Bulk material buying power.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-3xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl text-forest mb-2">Less Site Disruption</h3>
                <p className="text-bark">
                  Minimal time on your property. No construction mess or months of workers onsite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Build Your Dream Home?</h2>
          <p className="text-lg mb-8">
            Schedule a free consultation to discuss your project. We'll provide a detailed quote 
            and timeline based on your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Schedule Consultation
            </a>
            <a
              href="/hsh/packages"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              View Package Bundles
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
