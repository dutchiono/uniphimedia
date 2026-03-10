export default function ForumRulesPage() {
  const rules = [
    "Treat every member with respect — no personal attacks.",
    "No spam, self-promotion, or repetitive posts.",
    "No hate speech, slurs, or discriminatory language.",
    "Stay on topic within each category.",
    "Protect your privacy and others' — no sharing personal info without consent.",
    "No illegal content, links, or discussions.",
    "Support each other — this is a community, not a debate stage.",
    "Give credit when sharing others' work or ideas.",
    "Report problems to moderators — don't engage trolls.",
    "Have fun and grow together.",
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <a href="/forum" className="text-gold hover:underline text-sm">
              ← Back to Forum
            </a>
          </div>
          <h1 className="font-serif text-5xl mb-4">Community Guidelines</h1>
          <p className="text-xl opacity-90">We built this forum on respect. Help us keep it that way.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Rules List */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl text-forest mb-8">The Rules</h2>
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="bg-white border-2 border-bark/20 p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-forest text-cream rounded-full flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <p className="text-bark text-lg pt-1">{rule}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Consequences */}
        <section className="mb-16 bg-gold/10 border-2 border-gold p-8 rounded-lg">
          <h2 className="font-serif text-3xl text-forest mb-6">Consequences</h2>
          <p className="text-bark mb-6 text-lg">We use a three-strike system to keep things fair:</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="font-bold text-gold text-xl">1st Strike:</span>
              <p className="text-bark">Warning from moderators — you'll receive a message explaining the violation.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-bold text-gold text-xl">2nd Strike:</span>
              <p className="text-bark">7-day suspension from posting (you can still read).</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="font-bold text-gold text-xl">3rd Strike:</span>
              <p className="text-bark">Permanent ban from the forum and possible membership termination.</p>
            </div>
          </div>
        </section>

        {/* How to Report */}
        <section className="bg-white border-2 border-bark/20 p-8 rounded-lg">
          <h2 className="font-serif text-3xl text-forest mb-6">How to Report a Problem</h2>
          <p className="text-bark mb-6">
            If you see a post or member violating these rules, please report it to our moderators. 
            Do not engage with trolls or rule-breakers directly.
          </p>
          <div className="bg-forest/5 p-6 rounded-lg">
            <p className="text-bark font-semibold mb-2">Contact the Moderation Team:</p>
            <a href="mailto:moderators@uniphimedia.com" className="text-gold hover:underline text-lg">
              moderators@uniphimedia.com
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
