export default function PerksPage() {
  const tiers = [
    { name: "Basic", perks: ["Weekly Newsletter", "Community Forum Access", "Monthly Drawing Entry"] },
    { name: "Seed Club", perks: ["Everything in Basic", "Quarterly Seed Packets", "Exclusive Content Library", "10% Raffle Discount"] },
    { name: "Premium", perks: ["Everything in Seed Club", "Event Tickets", "Priority Property Access", "Member Spotlight Eligibility", "20% Raffle Discount"] }
  ];

  const events = [
    { name: "Spring Planting Festival", month: "May", description: "Kick off the growing season together" },
    { name: "Summer Permaculture Camp", month: "July", description: "Intensive hands-on learning experience" },
    { name: "Fall Harvest Celebration", month: "October", description: "Celebrate the abundance of the season" },
    { name: "Winter Solstice Gathering", month: "December", description: "Community connection and reflection" }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Being a Member Has Its Rewards</h1>
          <p className="text-xl opacity-90">More than just land access — it's a lifestyle</p>
        </div>
      </section>

      {/* Monthly Drawings */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Monthly Drawings</h2>
        <div className="bg-gold text-white p-8 rounded-lg text-center">
          <p className="text-xl mb-4">Every member is automatically entered every month</p>
          <p className="text-3xl font-bold mb-2">3 Winners Per Month</p>
          <p className="opacity-90">Prizes rotate: gift cards, gear, membership extensions, and more</p>
        </div>
      </section>

      {/* Subscription Perks Table */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Perks by Membership Tier</h2>
        <div className="bg-white border-2 border-forest rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-forest text-cream">
              <tr>
                <th className="px-6 py-4 text-left font-serif text-xl">Tier</th>
                <th className="px-6 py-4 text-left font-serif text-xl">What You Get</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                  <td className="px-6 py-4 font-semibold text-forest">{tier.name}</td>
                  <td className="px-6 py-4">
                    <ul className="space-y-1">
                      {tier.perks.map((perk, pidx) => (
                        <li key={pidx} className="text-gray-700">• {perk}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Seasonal Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white border-2 border-bark p-6 rounded-lg">
              <div className="bg-bark text-white px-3 py-1 rounded-full text-sm font-semibold inline-block mb-3">
                {event.month}
              </div>
              <h3 className="font-serif text-2xl text-forest mb-2">{event.name}</h3>
              <p className="text-gray-700">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Early Access */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Early Access Perks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gold text-white p-8 rounded-lg">
            <h3 className="font-serif text-2xl mb-3">New Property Listings</h3>
            <p className="text-lg">See new land 48 hours before the public</p>
          </div>
          <div className="bg-gold text-white p-8 rounded-lg">
            <h3 className="font-serif text-2xl mb-3">Raffle Ticket Discounts</h3>
            <p className="text-lg">Save 10-20% on every entry based on tier</p>
          </div>
        </div>
      </section>

      {/* Member Spotlight */}
      <section className="bg-bark text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Member Spotlight</h2>
          <p className="text-xl opacity-90">One member featured monthly in our newsletter and podcast</p>
          <p className="mt-4">Share your story, inspire the community, and grow your network</p>
        </div>
      </section>
    </main>
  );
}
