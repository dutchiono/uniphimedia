export default function ProtectionPage() {
  const physicalSecurity = [
    { title: "Perimeter Fencing", description: "Define boundaries and deter casual trespass" },
    { title: "Motion Lighting", description: "Solar-powered lights that activate on movement" },
    { title: "Door & Window Hardening", description: "Reinforce entry points with deadbolts and security film" },
    { title: "Safe Room Basics", description: "Dedicated interior space for shelter during emergencies" }
  ];

  const checklist = [
    "Water: 1 gallon per person per day (3 days minimum)",
    "Food: Non-perishable meals and snacks (3 days minimum)",
    "First Aid Kit: Bandages, medications, antiseptic",
    "Flashlight & Batteries: LED flashlight with extra batteries",
    "Radio: Battery or hand-crank emergency radio",
    "Whistle: For signaling help",
    "Dust Masks: For contaminated air",
    "Plastic Sheeting & Duct Tape: For shelter",
    "Wrench/Pliers: To turn off utilities",
    "Manual Can Opener: For canned food",
    "Local Maps: Paper maps of your area",
    "Phone Charger: Battery pack or solar charger"
  ];

  const midwestRisks = [
    {
      title: "Tornado Preparedness",
      description: "Know your shelter location. Underground is best. Interior room on lowest floor if no basement. Stay away from windows. Have a plan and practice it."
    },
    {
      title: "Ice Storm Readiness",
      description: "Stock up on food and water before winter. Keep generators and fuel on hand. Insulate pipes. Have alternative heating sources (wood stove, propane heater)."
    },
    {
      title: "Flood Basics",
      description: "Know your flood zone. Never drive through water. Move valuables to higher ground. Have an evacuation route planned. Consider flood insurance."
    },
    {
      title: "Power Grid Outage",
      description: "Solar panels + battery backup. Generator with stored fuel. Wood stove for heat. Hand tools that don't require electricity. Community support network."
    }
  ];

  const skills = [
    { title: "First Aid", description: "Treat injuries when help is delayed" },
    { title: "Fire Starting", description: "Multiple methods without matches" },
    { title: "Navigation", description: "Map and compass basics" },
    { title: "Foraging", description: "Identify safe, edible wild plants" }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Prepared. Protected. Resilient.</h1>
          <p className="text-xl opacity-90">Security starts with knowledge and planning</p>
        </div>
      </section>

      {/* Physical Security */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Physical Security</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {physicalSecurity.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-lg text-forest mb-3">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Watch */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Community Watch Program</h2>
        <div className="bg-gold text-white rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl mb-3">Mutual Aid Network</h3>
              <p>Neighbors helping neighbors in times of need</p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Communication Tree</h3>
              <p>Rapid alert system for emergencies</p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-3">Signal System</h3>
              <p>Visual and audio codes for common situations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">72-Hour Emergency Kit</h2>
        <div className="bg-white border-2 border-bark rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-4">
            {checklist.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-gold text-xl mr-3">☑</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-bark text-white rounded">
            <p className="font-semibold">Food & Water Storage:</p>
            <p className="text-sm mt-2">Minimum 3 days supply. Recommended: 2 weeks to 3 months for true resilience. Store in cool, dry place. Rotate stock regularly.</p>
          </div>
        </div>
      </section>

      {/* Midwest-Specific Risks */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Midwest-Specific Risks</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {midwestRisks.map((risk, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-xl text-forest mb-3">{risk.title}</h3>
              <p className="text-gray-700">{risk.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Self-Reliance Skills */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Self-Reliance Skills</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <div key={idx} className="bg-bark text-white rounded-lg p-6 text-center">
              <h3 className="font-serif text-xl mb-3">{skill.title}</h3>
              <p className="text-sm opacity-90">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Considerations */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Legal Considerations</h2>
        <div className="bg-white border-2 border-gold rounded-lg p-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Most Midwest states recognize the right to self-defense and allow lawful firearm ownership for home protection. However, laws vary significantly:
          </p>
          <ul className="space-y-2 text-gray-700 ml-6">
            <li>• <strong>Castle Doctrine:</strong> Many states allow use of force to defend your home</li>
            <li>• <strong>Stand Your Ground:</strong> Some states extend this right beyond the home</li>
            <li>• <strong>Duty to Retreat:</strong> Other states require you to retreat if safely possible</li>
            <li>• <strong>Firearm Laws:</strong> Permits, registration, and carry laws differ by state</li>
          </ul>
          <p className="mt-6 text-gray-600 text-sm italic">
            Always know your specific state and local laws. Consider legal insurance or consultation with an attorney familiar with self-defense law.
          </p>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-4">Learn More</h2>
          <p className="text-lg mb-6 opacity-90">Explore our full catalog of preparedness resources</p>
          <a
            href="/catalog"
            className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
          >
            Browse Catalog
          </a>
        </div>
      </section>
    </main>
  );
}
