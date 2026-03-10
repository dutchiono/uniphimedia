export default function PerksPage() {
  const tiers = [
    { name: "Basic", perks: ["Weekly Newsletter", "Forum Access", "Monthly Drawing Entry"] },
    { name: "Seed Club", perks: ["All Basic", "Heirloom Seeds Monthly", "Exclusive Content", "10% Raffle Discount"] },
    { name: "Premium", perks: ["All Seed Club", "Event Tickets", "Property Access", "Early Listings", "20% Raffle Discount"] }
  ];

  const events = [
    { name: "Spring Planting Festival", month: "May", description: "Celebrate new growth with seed swaps and workshops" },
    { name: "Summer Permaculture Camp", month: "July", description: "Week-long intensive learning experience" },
    { name: "Fall Harvest Celebration", month: "October", description: "Gather, feast, and preserve the season's bounty" },
    { name: "Winter Solstice Gathering", month: "December", description: "Reflect, plan, and build community bonds" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Being a Member Has Its Rewards
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            From monthly giveaways to exclusive events, membership means more than access.
          </p>
        </div>
      </section>

      {/* Monthly Drawings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Monthly Drawings</h2>
          <div className="max-w-4xl mx-auto bg-gold bg-opacity-10 border-2 border-gold rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="font-serif text-3xl text-forest mb-4">Automatic Entry for All Members</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-forest mb-2">3</div>
                <div className="text-bark">Winners Every Month</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest mb-2">$500+</div>
                <div className="text-bark">Total Prize Value</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest mb-2">100%</div>
                <div className="text-bark">Free to Enter</div>
              </div>
            </div>
            <p className="text-center text-bark mt-6">Prizes rotate monthly: seeds, tools, memberships, and more.</p>
          </div>
        </div>
      </section>

      {/* Subscription Perks Table */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Perks by Tier</h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white border-2 border-forest rounded-lg">
              <thead className="bg-forest text-cream">
                <tr>
                  <th className="py-4 px-6 text-left font-serif text-xl">Membership Tier</th>
                  <th className="py-4 px-6 text-left font-serif text-xl">Included Perks</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, idx) => (
                  <tr key={idx} className="border-t-2 border-forest border-opacity-20">
                    <td className="py-4 px-6 font-bold text-forest">{tier.name}</td>
                    <td className="py-4 px-6">
                      <ul className="space-y-2">
                        {tier.perks.map((perk, pIdx) => (
                          <li key={pIdx} className="text-bark flex items-center">
                            <span className="text-gold mr-2">✓</span> {perk}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Seasonal Events</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {events.map((event, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-2xl text-forest">{event.name}</h3>
                  <span className="bg-gold text-white px-3 py-1 rounded text-sm font-bold">{event.month}</span>
                </div>
                <p className="text-bark">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Early Access Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-forest rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🏡</div>
              <h3 className="font-serif text-2xl text-forest mb-3">Property Listings</h3>
              <p className="text-bark">See new land offerings 48 hours before the public</p>
            </div>
            <div className="bg-white border-2 border-forest rounded-lg p-8 text-center">
              <div className="text-5xl mb-4">🎟️</div>
              <h3 className="font-serif text-2xl text-forest mb-3">Raffle Discounts</h3>
              <p className="text-bark">Members save 10-20% on all raffle ticket purchases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Spotlight */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Member Spotlight</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Every month, we feature one member's story in our newsletter and podcast. 
            Share your journey, inspire the community, and get recognized for your contributions.
          </p>
          <a href="/contact" className="inline-block bg-gold text-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">
            Nominate a Member
          </a>
        </div>
      </section>
    </div>
  );
}
