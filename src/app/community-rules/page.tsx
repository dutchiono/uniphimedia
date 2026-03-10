export default function CommunityRulesPage() {
  const propertyRules = [
    { title: "Quiet Hours 10pm-7am", description: "Respect your neighbors' rest. Keep noise levels down during quiet hours." },
    { title: "Guest Policy", description: "Max 2 overnight guests at a time. Guests may stay up to 3 nights without community approval. Longer stays require member vote." },
    { title: "Fire Safety", description: "Burn permits required for all open fires. Never leave fires unattended. Keep water source nearby at all times." },
    { title: "Waste Management", description: "Composting is required for organic waste. Recycling is required. No dumping anywhere on property." },
    { title: "Common Area Care", description: "Leave shared spaces better than you found them. Sign up for monthly community work days." },
    { title: "Animals", description: "Pets welcome on leash in common areas. Livestock requires zone approval and proper fencing." },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-serif text-5xl mb-4">The Rules We Live By</h1>
          <p className="text-xl opacity-90">Simple principles for a community that works.</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Core Values */}
        <section className="mb-16 bg-forest text-cream p-8 rounded-lg">
          <h2 className="font-serif text-3xl mb-6">Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gold text-xl mb-2">Permaculture Ethics</h3>
              <p className="opacity-90">Earth care, people care, fair share — these guide everything we do.</p>
            </div>
            <div>
              <h3 className="font-bold text-gold text-xl mb-2">Cooperation Over Competition</h3>
              <p className="opacity-90">We rise by lifting each other. Share skills, resources, and knowledge freely.</p>
            </div>
            <div>
              <h3 className="font-bold text-gold text-xl mb-2">Self-Reliance and Mutual Aid</h3>
              <p className="opacity-90">Build your own capacity while supporting your neighbors in need.</p>
            </div>
            <div>
              <h3 className="font-bold text-gold text-xl mb-2">Radical Honesty and Transparency</h3>
              <p className="opacity-90">Speak truth with kindness. Keep financial and governance decisions open.</p>
            </div>
          </div>
        </section>

        {/* On-Property Rules */}
        <section className="mb-16">
          <h2 className="font-serif text-4xl text-forest mb-8">On-Property Rules</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {propertyRules.map((rule, idx) => (
              <div key={idx} className="bg-white border-2 border-bark/20 p-6 rounded-lg">
                <h3 className="font-serif text-2xl text-forest font-bold mb-3">{rule.title}</h3>
                <p className="text-bark/80 leading-relaxed">{rule.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Membership Obligations */}
        <section className="mb-16 bg-gold/10 border-2 border-gold p-8 rounded-lg">
          <h2 className="font-serif text-3xl text-forest mb-6">Membership Obligations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-bark text-xl mb-2">Workshare Requirements</h3>
              <p className="text-bark/80 leading-relaxed">
                All workshare members must contribute a minimum of 4 hours per month. Track your hours and submit monthly reports.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-bark text-xl mb-2">Dues</h3>
              <p className="text-bark/80 leading-relaxed">
                Membership dues are due on the 1st of each month. Grace period: 5 days. Late fees apply after the grace period.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-bark text-xl mb-2">Dispute Resolution</h3>
              <p className="text-bark/80 leading-relaxed">
                Step 1: Talk directly to the person involved. Step 2: Bring in a steward for mediation if unresolved. Step 3: Submit a formal concern to the steward panel for binding resolution.
              </p>
            </div>
          </div>
        </section>

        {/* Grounds for Removal */}
        <section className="mb-16 bg-red-50 border-2 border-red-300 p-8 rounded-lg">
          <h2 className="font-serif text-3xl text-red-900 mb-6">Grounds for Removal</h2>
          <p className="text-red-900/80 mb-4 leading-relaxed">
            These behaviors will result in immediate membership termination and removal from property:
          </p>
          <ul className="list-disc pl-6 text-red-900/80 space-y-2">
            <li>Violence or threats of violence against any person</li>
            <li>Theft of personal or community property</li>
            <li>Repeated violations of community rules after warnings</li>
            <li>Harassment, discrimination, or hate speech</li>
            <li>Illegal activity on community property</li>
          </ul>
        </section>

        {/* How to Raise a Concern */}
        <section className="bg-white border-2 border-bark/20 p-8 rounded-lg">
          <h2 className="font-serif text-3xl text-forest mb-6">How to Raise a Concern</h2>
          <p className="text-bark/80 mb-6 leading-relaxed">
            We believe in direct communication and restorative justice. If you have a concern about another member's behavior:
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-forest text-cream rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="font-bold text-bark text-lg mb-1">Talk Directly to the Person</h3>
                <p className="text-bark/80">Most issues can be resolved through honest, direct conversation. Approach with curiosity, not judgment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-forest text-cream rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="font-bold text-bark text-lg mb-1">Bring a Steward if Unresolved</h3>
                <p className="text-bark/80">If direct conversation doesn't work, ask a community steward to mediate. Stewards are trained in conflict resolution.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-forest text-cream rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="font-bold text-bark text-lg mb-1">Submit Formal Concern</h3>
                <p className="text-bark/80">If mediation fails, submit a formal written concern to the steward panel. Email: <a href="mailto:community@uniphimedia.com" className="text-gold hover:underline">community@uniphimedia.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
