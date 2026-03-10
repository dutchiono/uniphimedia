export default function LawPage() {
  const deedTypes = [
    { name: "Warranty Deed", description: "Seller guarantees clear title and defends against all claims. The gold standard for land purchases." },
    { name: "Quitclaim Deed", description: "Seller transfers whatever interest they have, with no guarantees. Common in family transfers or clearing title issues." },
    { name: "Easements", description: "Rights to use someone else's land for specific purposes (access, utilities, water). Can increase or decrease property value." },
    { name: "Adverse Possession", description: "Claiming land through continuous, open, and hostile use over time. State-specific rules apply — research carefully." }
  ];

  const memberRights = [
    "Right to use all common areas (gardens, workshops, gathering spaces)",
    "Right to sublease your workshare hours to other members",
    "Right to participate in community decision-making and voting",
    "Right to exit membership and receive deposit refund per contract terms"
  ];

  const faqs = [
    { q: "Can I build a tiny home on zoned agricultural land?", a: "Depends on county. Some allow ADUs (accessory dwelling units) or agricultural worker housing. Others require minimum square footage. Always check local codes." },
    { q: "Do I need a permit to build?", a: "Most counties require permits for permanent structures. Some rural areas have more flexibility for temporary or agricultural buildings. Unpermitted building carries risks — fines, inability to sell, insurance issues." },
    { q: "Who owns water rights?", a: "In the Midwest, water rights are typically riparian (tied to land adjacent to water) or regulated by state law. Rainwater harvesting is generally legal, but groundwater pumping may require permits." },
    { q: "Can I claim a homestead exemption?", a: "Most Midwest states offer homestead exemptions that protect some property value from creditors and reduce property taxes. Requirements vary — usually must be your primary residence." },
    { q: "What's the difference between HOA and land trust?", a: "HOAs are corporate entities that enforce rules and maintain common areas. Land trusts hold legal title to land for the benefit of members, prioritizing stewardship over profit." }
  ];

  const resources = [
    { name: "NOLO Law", url: "nolo.com", description: "Plain-English legal guides for property, contracts, and estate planning" },
    { name: "Farm Commons", url: "farmcommons.org", description: "Legal resources specifically for farmers and land-based businesses" },
    { name: "Homesteaders of America", url: "homesteadersofamerica.com", description: "Community and legal advocacy for homesteaders" }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Know Your Rights. Protect Your Land.</h1>
          <p className="text-xl opacity-90">Legal knowledge is freedom</p>
        </div>
      </section>

      {/* Land Ownership Basics */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Land Ownership Basics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {deedTypes.map((type, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-xl text-forest mb-3">{type.name}</h3>
              <p className="text-gray-700">{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Legal Structure */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Uni-Phi Legal Structure</h2>
        <div className="bg-gold text-white rounded-lg p-8">
          <p className="text-lg leading-relaxed mb-4">
            Uni-Phi operates as an <strong>LLC/land trust hybrid</strong>. The LLC owns the land, and members hold lease rights to specific lots or access to common areas.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            <strong>Community lots:</strong> Members receive long-term lease agreements (up to 99 years), not deeds. This keeps land affordable and prevents speculation.
          </p>
          <p className="text-lg leading-relaxed">
            <strong>No-Com-Land parcels:</strong> Fee-simple deeds available for purchase. You own the land outright, with minimal community obligations.
          </p>
        </div>
      </section>

      {/* Your Rights as a Member */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Your Rights as a Member</h2>
        <div className="bg-white border-2 border-bark rounded-lg p-8">
          <ul className="space-y-4">
            {memberRights.map((right, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-gold text-2xl mr-3">✓</span>
                <span className="text-gray-700 text-lg">{right}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Common Legal Questions */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Common Legal Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-xl text-forest mb-3">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-red-600 text-white border-4 border-red-700 rounded-lg p-8">
          <h3 className="font-serif text-2xl mb-4">⚠️ Legal Disclaimer</h3>
          <p className="text-lg leading-relaxed">
            This is educational content, not legal advice. Laws vary by state and county. Always consult a licensed attorney in your jurisdiction before making property or legal decisions.
          </p>
        </div>
      </section>

      {/* External Resources */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">External Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <div key={idx} className="bg-bark text-white rounded-lg p-6">
              <h3 className="font-serif text-xl mb-2">{resource.name}</h3>
              <p className="text-sm opacity-90 mb-3">{resource.description}</p>
              <a href={`https://${resource.url}`} className="text-gold hover:underline">
                {resource.url}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
