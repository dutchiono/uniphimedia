export default function LawPage() {
  const ownershipBasics = [
    {
      title: "Warranty Deed",
      desc: "The seller guarantees clear title and will defend against any claims. The gold standard for land purchases."
    },
    {
      title: "Quitclaim Deed",
      desc: "The seller transfers whatever interest they have, with no guarantees. Common in family transfers or clearing title issues."
    },
    {
      title: "Easements",
      desc: "Legal rights to use someone else's land for specific purposes (access roads, utilities, water rights). Can be a benefit or a burden."
    },
    {
      title: "Adverse Possession",
      desc: "In some states, continuous, open, and hostile use of land for a statutory period can lead to ownership. Know your boundaries."
    }
  ];

  const memberRights = [
    "Right to use all common areas including gardens, forests, and gathering spaces",
    "Right to sublease your workshare duties to other members with approval",
    "Right to exit the community and receive your deposit refund per membership terms",
    "Right to participate in community governance and decision-making processes",
    "Right to privacy and peaceful enjoyment of your leased lot or dwelling"
  ];

  const questions = [
    {
      q: "Can I build a tiny home without permits?",
      a: "It depends on county zoning. Some Midwest counties have minimal building codes for structures under 200 sq ft or on wheels. Others require full permitting. We help members navigate local regulations and can connect you with code-friendly counties."
    },
    {
      q: "What's the difference between an HOA and a land trust?",
      a: "HOAs are corporate entities with strict rules and enforcement. Land trusts are member-governed cooperatives focused on stewardship, not control. Uni-Phi operates as a land trust hybrid—members have autonomy with shared values, not rigid restrictions."
    },
    {
      q: "Do I own the land or lease it?",
      a: "Community lots are leased through the land trust structure, giving you secure long-term occupancy without traditional ownership burdens. No-com-land parcels are sold via fee-simple deed—you own it outright."
    },
    {
      q: "What are my water rights?",
      a: "Water rights vary by state. In the Midwest, riparian rights typically allow reasonable use of surface water on your property. Groundwater (well water) is usually yours to use. We provide guidance specific to each property location."
    },
    {
      q: "Can I claim a homestead exemption?",
      a: "Most Midwest states offer homestead exemptions that protect your primary residence from creditors and reduce property taxes. Requirements vary—typically you must occupy the property as your primary residence."
    },
    {
      q: "What about zoning for agriculture?",
      a: "Agricultural zoning is generally permissive for farming, livestock, and farm structures. Many counties allow agricultural dwellings with minimal restrictions. We target ag-zoned properties specifically."
    }
  ];

  const resources = [
    { name: "NOLO", url: "https://www.nolo.com", desc: "Legal guides for property and land law" },
    { name: "Farm Commons", url: "https://farmcommons.org", desc: "Legal resources for farmers and land stewards" },
    { name: "Homesteaders of America", url: "https://homesteadersofamerica.com", desc: "Community and education for homesteaders" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Know Your Rights. Protect Your Land.
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Legal knowledge is power. Understand the basics before you buy.
          </p>
        </div>
      </section>

      {/* Land Ownership Basics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Land Ownership Basics</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ownershipBasics.map((item, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-6">
                <h3 className="font-serif text-2xl text-forest mb-3">{item.title}</h3>
                <p className="text-bark">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Legal Structure */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Uni-Phi Legal Structure</h2>
          <div className="max-w-4xl mx-auto bg-white border-2 border-forest rounded-lg p-8">
            <div className="space-y-6 text-bark">
              <p className="text-lg">
                <strong className="text-forest">How It Works:</strong> Uni-Phi Media LLC operates as a hybrid LLC and land trust. 
                This structure protects members while maintaining flexibility.
              </p>
              <div className="border-l-4 border-forest pl-6">
                <p className="mb-4">
                  <strong className="text-forest">Community Lots:</strong> Members hold secure long-term lease rights, not deeds. 
                  This reduces costs, simplifies transfers, and keeps land in the trust for future generations.
                </p>
                <p>
                  <strong className="text-forest">No-Com-Land Parcels:</strong> Sold via traditional fee-simple deed. 
                  You own it outright—no HOA, no restrictions, just your land.
                </p>
              </div>
              <p className="text-sm italic">
                Legal documents available to members in the member portal. All agreements reviewed by licensed attorneys.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Rights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Your Rights as a Member</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream border-2 border-forest rounded-lg p-8">
              <ul className="space-y-4">
                {memberRights.map((right, idx) => (
                  <li key={idx} className="flex items-start text-bark">
                    <span className="text-gold text-2xl mr-4 flex-shrink-0">✓</span>
                    <span className="text-lg">{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Legal Questions */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Common Legal Questions</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {questions.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg overflow-hidden">
                <div className="bg-forest text-cream p-4">
                  <h3 className="font-serif text-xl">{item.q}</h3>
                </div>
                <div className="p-6">
                  <p className="text-bark">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded">
              <p className="text-red-900 font-semibold text-lg mb-2">⚠️ Legal Disclaimer</p>
              <p className="text-red-800">
                This information is provided for educational purposes only and does not constitute legal advice. 
                Laws vary by state and county. Always consult a licensed attorney in your jurisdiction before making 
                land purchases or legal decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-12">Legal Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 border-2 border-cream rounded-lg p-6 hover:bg-opacity-20 transition"
              >
                <h3 className="font-serif text-2xl mb-3">{resource.name}</h3>
                <p className="opacity-90">{resource.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
