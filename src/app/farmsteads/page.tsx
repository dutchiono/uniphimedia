export default function FarmsteadsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Farmstead Operators</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Join the Uni-Phi Farmstead Network
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Operate a regenerative farmstead within the Uni-Phi community network. Get land, support, 
            marketing help, and profit sharing while building the food system we need.
          </p>
        </div>
      </section>

      {/* What Is a Farmstead Operator */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">What Does a Farmstead Operator Do?</h2>
          <p className="text-lg text-bark mb-12 text-center">
            You run a small-scale regenerative farm on Uni-Phi land (2-10 acres), producing food for 
            community members and local markets. You keep profits, we provide infrastructure and support.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-xl text-forest mb-3">Grow Food</h3>
              <p className="text-bark">
                Vegetables, fruits, herbs, mushrooms - whatever suits your land and skills. 
                Permaculture methods encouraged.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-xl text-forest mb-3">Steward Land</h3>
              <p className="text-bark">
                Build soil health, protect water, increase biodiversity. Leave the land better 
                than you found it.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gold w-16 h-16 rounded-full mx-auto mb-4"></div>
              <h3 className="font-serif text-xl text-forest mb-3">Share Knowledge</h3>
              <p className="text-bark">
                Teach workshops, mentor new farmers, document your methods. Build the next 
                generation of growers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Access to Land</h3>
                <p>
                  2-10 acre farmstead plot with water access, road access, and basic infrastructure. 
                  Long-term lease with purchase option after 5 years.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Community Support</h3>
                <p>
                  Labor sharing, equipment pooling, collective purchasing power. Never farm alone again.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Marketing Help</h3>
                <p>
                  We handle CSA coordination, farmers market booth, online store, and member deliveries. 
                  You focus on growing.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Wholesale Seed Access</h3>
                <p>
                  Bulk seed purchases at 40-60% off retail. Open-pollinated, heirloom, and hybrid options.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Profit Sharing</h3>
                <p>
                  You keep 70% of sales revenue. 20% to Uni-Phi for marketing/infrastructure. 
                  10% to community mutual aid fund.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-gold text-2xl mr-4">✓</span>
              <div>
                <h3 className="font-serif text-xl mb-2">Training & Mentorship</h3>
                <p>
                  Learn from experienced farmers in the network. Monthly calls, annual gatherings, 
                  and one-on-one mentorship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Requirements</h2>
          <p className="text-lg text-bark mb-8 text-center">
            We're looking for committed growers who align with our values and can make this work long-term.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-4">Experience Required</h3>
              <ul className="space-y-2 text-bark">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>2+ years farming experience (can include home gardens, apprenticeships, or education)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Knowledge of season extension, crop planning, and soil health</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Physical ability to perform farm labor (accommodations considered)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Business basics: record keeping, inventory, customer communication</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-4">Values Alignment</h3>
              <ul className="space-y-2 text-bark">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Commitment to regenerative agriculture (no-till, cover crops, minimal inputs)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Cooperative mindset - willing to share tools, labor, knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Teaching spirit - mentor apprentices and lead workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Long-term vision - minimum 3-year commitment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">How It Works</h2>
          <div className="space-y-6">
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-3">Year 1: Establish</h3>
              <p>
                Build soil, install infrastructure (fencing, irrigation, compost), plant perennials, 
                and establish your farm identity. Subsidized rent first year. Mentorship intensive.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-3">Years 2-3: Grow</h3>
              <p>
                Full production mode. Expand your crop list, build customer base, refine systems. 
                Standard profit-share applies. Take on apprentices if desired.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-3">Years 4-5: Scale</h3>
              <p>
                Expand acreage if needed, invest in equipment, solidify year-round production. 
                Prepare for land purchase option.
              </p>
            </div>
            <div className="bg-cream p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-3">Year 5+: Own (Optional)</h3>
              <p>
                Option to purchase your farmstead land at below-market rate. All infrastructure 
                improvements credited toward purchase price. Or continue leasing long-term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Candidate */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Who Thrives Here?</h2>
          <div className="bg-bark text-cream p-8 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Experienced gardeners</strong> ready to farm commercially but lacking land access
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Farm apprentices</strong> graduating from WWOOF, CRAFT, or farming programs
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Career changers</strong> with agriculture education seeking land access
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Urban farmers</strong> wanting more space and rural community
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Permaculture designers</strong> ready to implement your food forest vision
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-3">✓</span>
                <span className="text-lg">
                  <strong>Veterans & first responders</strong> seeking agricultural therapy + income
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Start Your Farmstead?</h2>
          <p className="text-lg mb-8">
            Applications reviewed on a rolling basis. We have 5 farmstead plots available for 2026 season. 
            Priority given to local applicants and those with demonstrated experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Submit Application
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
