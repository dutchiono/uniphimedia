export default function RafflePrizesPage() {
  const prizes = [
    {
      name: "Grand Prize — Hobbit Home at Hillshire Hollows",
      value: "$42,000",
      winners: 1,
      entry: "$25",
      odds: "1 in 2,000"
    },
    {
      name: "Off-Grid Solar Kit",
      value: "$3,500",
      winners: 3,
      entry: "$10",
      odds: "3 in 5,000"
    },
    {
      name: "1-Year Seed Club Subscription",
      value: "$180",
      winners: 10,
      entry: "$5",
      odds: "10 in 10,000"
    },
    {
      name: "Van Life Annual Pass",
      value: "$4,800",
      winners: 2,
      entry: "$15",
      odds: "2 in 3,000"
    },
    {
      name: "Signed Goldback Collection",
      value: "$500",
      winners: 5,
      entry: "$10",
      odds: "5 in 8,000"
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">The Prizes Worth Playing For</h1>
          <p className="text-xl opacity-90">Real value. Real homes. Real freedom.</p>
        </div>
      </section>

      {/* Prize Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-6">
          {prizes.map((prize, idx) => (
            <div key={idx} className="bg-white border-2 border-forest p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-forest mb-2">{prize.name}</h2>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-gold text-white px-3 py-1 rounded-full font-semibold">
                      Value: {prize.value}
                    </span>
                    <span className="bg-bark text-white px-3 py-1 rounded-full">
                      {prize.winners} {prize.winners === 1 ? 'Winner' : 'Winners'}
                    </span>
                    <span className="bg-forest text-cream px-3 py-1 rounded-full">
                      Entry: {prize.entry}
                    </span>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm">Estimated odds: {prize.odds}</p>
                </div>
                <a
                  href="/raffle"
                  className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors whitespace-nowrap"
                >
                  Enter Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-bark text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg">All prizes fulfilled by Uni-Phi Media LLC</p>
          <p className="text-sm opacity-80 mt-2">No purchase necessary. See official rules for details.</p>
        </div>
      </section>
    </main>
  );
}
