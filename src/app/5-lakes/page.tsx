export default function FiveLakesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">5 Lakes Community</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Lakeside Living Meets Permaculture Paradise
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Reserve your lakefront lot in our newest intentional community. Five spring-fed lakes, 
            dock access, fishing rights, and cabin-ready building pads await your homestead vision.
          </p>
        </div>
      </section>

      {/* Property Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">What Makes 5 Lakes Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Spring-Fed Lakes</h3>
              <p className="text-bark">
                Five pristine lakes fed by natural springs. Crystal clear water year-round, 
                stocked with bass, bluegill, and catfish.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Water Activities</h3>
              <p className="text-bark">
                Kayaking, canoeing, swimming, and fishing access included. Community dock spaces 
                and boat storage available.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Cabin-Ready Pads</h3>
              <p className="text-bark">
                Cleared building sites with lake views. Utilities stubbed, road access, and 
                community amenities in place.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Community Fire Pit</h3>
              <p className="text-bark">
                Lakeside gathering space for campfires, storytelling, and community connection 
                under the stars.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Permaculture Design</h3>
              <p className="text-bark">
                Community food forest, shared gardens, and water-wise landscaping throughout 
                the property.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Wildlife Habitat</h3>
              <p className="text-bark">
                Protected wetlands and woods. Deer, turkey, heron, and eagle sightings common. 
                Nature lovers' dream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deposit Information */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">Reserve Your Lakeside Lot</h2>
          <div className="bg-gold text-forest p-8 rounded-lg mb-8">
            <h3 className="font-serif text-3xl mb-4 text-center">$500 Deposit Holds Your Spot</h3>
            <p className="text-lg text-center mb-6">
              Fully refundable within 30 days. Applied to lot purchase price.
            </p>
            <ul className="space-y-3 max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="mr-3 font-bold">✓</span>
                <span>Priority lot selection when sales open in Spring 2026</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold">✓</span>
                <span>Exclusive site tours and member events before public launch</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold">✓</span>
                <span>Access to community planning meetings and design input</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold">✓</span>
                <span>Early-bird pricing locked in (expected 15% increase at launch)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-bold">✓</span>
                <span>Complimentary 1-year Seed Club membership ($180 value)</span>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <a
              href="/contact"
              className="inline-block bg-gold text-forest py-4 px-10 rounded-lg font-bold text-lg hover:bg-cream transition-colors"
            >
              Reserve Your Lot Today
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">What are the lot sizes and prices?</h3>
              <p className="text-bark">
                Lots range from 1-5 acres. Pricing starts at $25,000 for a 1-acre lakefront lot, 
                up to $65,000 for premium 5-acre parcels with private dock access.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Can I fish and swim in the lakes?</h3>
              <p className="text-bark">
                Yes! All lot owners have full recreational access to all five lakes. Catch-and-release 
                fishing encouraged; keep limits apply for food fish. Swimming areas designated.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Are utilities available?</h3>
              <p className="text-bark">
                Electric and water hookups available at each lot. Many members choose solar + well systems. 
                Septic systems required; we can connect you with local installers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">What are the community rules?</h3>
              <p className="text-bark">
                Permaculture principles encouraged. No HOA, but voluntary stewardship guidelines cover 
                noise, guest policies, and shared space care. Full rules provided with deposit.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-bark">
              <h3 className="font-serif text-xl text-forest mb-2">Is the deposit refundable?</h3>
              <p className="text-bark">
                Yes, 100% refundable within 30 days of deposit. After 30 days, deposit is non-refundable 
                but fully applied to your lot purchase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Start Your Lakeside Homestead Journey</h2>
          <p className="text-lg mb-8">
            Limited lots available. Deposit holders get first access when sales open this spring.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gold text-forest py-4 px-10 rounded-lg font-bold text-lg hover:bg-cream transition-colors"
          >
            Contact Us to Learn More
          </a>
        </div>
      </section>
    </div>
  );
}
