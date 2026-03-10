export default function OffsiteBuildingPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Build It There, Live Here — Or Anywhere</h1>
          <p className="text-xl opacity-90">Custom homes built offsite and delivered to your location</p>
        </div>
      </section>

      {/* What Offsite Building Means */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">What is Offsite Building?</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-bark mb-4">
            We design and build your structure in our controlled workshop environment, ensuring quality and precision that's difficult to achieve on traditional job sites.
          </p>
          <p className="text-lg text-bark">
            Once complete, we deliver your home to your property and handle final installation. You get a faster build time, better quality control, and less weather-related delays.
          </p>
        </div>
      </section>

      {/* Home Types */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Home Types</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-forest p-8 rounded-lg">
              <h3 className="font-serif text-2xl text-forest mb-2">Hobbit Home</h3>
              <div className="text-3xl font-bold text-gold mb-4">$28,000</div>
              <p className="text-sm text-bark mb-4">Earth-sheltered round home • 400 sq ft</p>
              <ul className="space-y-2 text-bark">
                <li>• Natural temperature regulation</li>
                <li>• Curved timber frame construction</li>
                <li>• Green roof ready</li>
                <li>• Round door and windows included</li>
              </ul>
            </div>
            <div className="border-2 border-forest p-8 rounded-lg">
              <h3 className="font-serif text-2xl text-forest mb-2">Tiny Home Shell</h3>
              <div className="text-3xl font-bold text-gold mb-4">$18,000</div>
              <p className="text-sm text-bark mb-4">Ready to finish interior • 200 sq ft</p>
              <ul className="space-y-2 text-bark">
                <li>• Insulated walls and roof</li>
                <li>• Exterior siding complete</li>
                <li>• Windows and door installed</li>
                <li>• Wiring rough-in included</li>
              </ul>
            </div>
            <div className="border-2 border-forest p-8 rounded-lg">
              <h3 className="font-serif text-2xl text-forest mb-2">Cabin Kit</h3>
              <div className="text-3xl font-bold text-gold mb-4">$22,000</div>
              <p className="text-sm text-bark mb-4">Traditional cabin design • 300 sq ft</p>
              <ul className="space-y-2 text-bark">
                <li>• Pine log construction</li>
                <li>• Loft sleeping area</li>
                <li>• Wood stove ready</li>
                <li>• Front porch included</li>
              </ul>
            </div>
            <div className="border-2 border-forest p-8 rounded-lg">
              <h3 className="font-serif text-2xl text-forest mb-2">Container Conversion</h3>
              <div className="text-3xl font-bold text-gold mb-4">$35,000</div>
              <p className="text-sm text-bark mb-4">40ft shipping container home • 320 sq ft</p>
              <ul className="space-y-2 text-bark">
                <li>• Full insulation package</li>
                <li>• Modern interior finish</li>
                <li>• Kitchen and bathroom installed</li>
                <li>• Solar-ready electrical</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-12 text-center">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-serif text-xl mb-2">Design Consult</h3>
              <p className="text-sm opacity-90">We discuss your needs, site requirements, and customization options</p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-serif text-xl mb-2">Permits & Plans</h3>
              <p className="text-sm opacity-90">We handle building permits and finalize construction plans</p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-serif text-xl mb-2">Build</h3>
              <p className="text-sm opacity-90">Construction happens in our workshop with regular photo updates</p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-serif text-xl mb-2">Deliver & Install</h3>
              <p className="text-sm opacity-90">We transport and set your home on your foundation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Timeline</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="text-5xl font-bold text-gold mb-4">90-180 Days</div>
          <p className="text-lg text-bark mb-4">From design approval to delivery</p>
          <p className="text-bark">
            Actual timeline depends on design complexity, permit processing time, and current project queue. Most builds are completed within 4-6 months.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Start Your Build?</h2>
          <p className="text-xl mb-8 opacity-90">Schedule a consultation to discuss your project</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  )
}
