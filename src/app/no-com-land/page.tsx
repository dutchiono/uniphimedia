export default function NoComLandPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">No Community Land</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Just the Land, Not the Lifestyle
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Want affordable rural acreage without the community obligations? We sell parcels to independent 
            buyers who prefer privacy over participation. Build your homestead your way.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Who Is This For?</h2>
          <p className="text-lg text-bark mb-12 text-center">
            Not everyone wants community living, and that's okay. Some people just need land at a fair price.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Independent Homesteaders</h3>
              <p className="text-bark">
                You're building your dream on your own terms. No shared gardens, no potlucks, no forum drama. 
                Just you, your land, and your vision.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Remote Workers</h3>
              <p className="text-bark">
                Need quiet rural space for remote work without community obligations taking your time. 
                Fast internet, low cost of living, leave-me-alone vibe.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Privacy Seekers</h3>
              <p className="text-bark">
                Value solitude, security, and being left alone. Not antisocial, just selective. 
                Your business is your business.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Investment Buyers</h3>
              <p className="text-bark">
                Land as an asset, not a lifestyle. Hold for appreciation, build for resale, or lease to others. 
                No strings attached.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Clear Deed</h3>
                <p>Full ownership, warranty deed, title insurance available. No co-ops, no land trusts, no shared equity.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Utilities Access</h3>
                <p>Electric at the road, well-friendly geology, septic-approved. Municipal hookups or off-grid - your choice.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Road Access</h3>
                <p>Deeded access to public or private road. Most parcels have direct county road frontage.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Buildable Land</h3>
                <p>Surveyed, legally dividable, zoning allows residential. Build-ready or hold for future.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">No HOA</h3>
                <p>Zero restrictions on building style, livestock, vehicles, or lifestyle. Your land, your rules.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Low Taxes</h3>
                <p>Rural Midwest property taxes. Typically $200-$800/year depending on acreage and county.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's NOT Included */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">What You DON'T Get</h2>
          <p className="text-lg mb-8 text-center">
            Being clear about what's NOT included. No surprises, no fine print.
          </p>
          <div className="bg-cream p-8 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Community Membership:</strong> No access to Uni-Phi community spaces, gardens, workshops, or events. 
                  You're buying land, not joining a community.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Workshare Opportunities:</strong> Can't earn credits through labor-sharing programs. 
                  No community tool library access.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Forum Access:</strong> Private forum is for community members only. No online community support.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Building Support:</strong> No construction help, design consultation, or permaculture workshops included. 
                  Available for separate fee.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Shared Amenities:</strong> No community center, fire pit, commercial kitchen, or shared facilities. 
                  This is standalone land.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-forest font-bold mr-3">✗</span>
                <span>
                  <strong>Mutual Aid Network:</strong> Not part of the community support system. Emergency help, tool sharing, 
                  and neighbor cooperation not guaranteed.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Pricing</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-bark mb-8">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-forest mb-2">$8,000</p>
              <p className="text-xl text-bark">per acre</p>
              <p className="text-sm text-bark opacity-70 mt-2">Starting price - varies by parcel location and features</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold mb-1">5 acres</p>
                <p className="text-bark">$40,000</p>
                <p className="text-sm text-bark opacity-70">Most popular size</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold mb-1">10 acres</p>
                <p className="text-bark">$75,000</p>
                <p className="text-sm text-bark opacity-70">5% bulk discount</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold mb-1">20+ acres</p>
                <p className="text-bark">$140,000+</p>
                <p className="text-sm text-bark opacity-70">10% bulk discount</p>
              </div>
            </div>
          </div>
          <div className="bg-bark text-cream p-6 rounded-lg">
            <h3 className="font-serif text-2xl mb-4 text-center">Financing Available</h3>
            <ul className="space-y-2 max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Owner financing with 20% down, 7% interest, 10-year terms</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bank financing accepted (we work with rural land lenders)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Cash purchases receive 5% discount</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Crypto payments accepted (see Bitcoin Bundles page)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Can I join the community later if I change my mind?</h3>
              <p className="text-bark">
                Yes, but you'll pay standard membership fees like anyone else. Land purchase doesn't include membership.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Are there any building restrictions?</h3>
              <p className="text-bark">
                County zoning applies (setbacks, septic requirements). No Uni-Phi rules on style, size, or materials. 
                Build whatever you want within local codes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Can I resell whenever I want?</h3>
              <p className="text-bark">
                Absolutely. You own it free and clear. No right of first refusal, no community approval needed. 
                Sell to whoever you want.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Will I have neighbors?</h3>
              <p className="text-bark">
                Most parcels have 300+ feet between buildings. Some are surrounded by Uni-Phi community members, 
                others by conventional homeowners. We'll show you the specific context for each parcel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Buy Land Without the Community?</h2>
          <p className="text-lg mb-8">
            View available parcels or schedule a site tour. Straight-forward land sales with no pressure, 
            no upselling, no community pitch. Just land.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              View Available Parcels
            </a>
            <a
              href="/membership"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              Or Learn About Community Membership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
