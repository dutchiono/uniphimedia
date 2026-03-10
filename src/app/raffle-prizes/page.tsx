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
      odds: "1 in 500"
    },
    {
      name: "1-Year Seed Club Subscription",
      value: "$180",
      winners: 10,
      entry: "$5",
      odds: "1 in 100"
    },
    {
      name: "Van Life Annual Pass",
      value: "$4,800",
      winners: 2,
      entry: "$15",
      odds: "1 in 750"
    },
    {
      name: "Signed Goldback Collection",
      value: "$500",
      winners: 5,
      entry: "$10",
      odds: "1 in 200"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            The Prizes Worth Playing For
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Real prizes. Real value. Real opportunities to win.
          </p>
        </div>
      </section>

      {/* Prizes Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {prizes.map((prize, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-forest rounded-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl text-forest flex-1">
                    {prize.name}
                  </h3>
                  <div className="bg-gold text-white px-3 py-1 rounded text-sm font-bold ml-4">
                    {prize.value}
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 text-bark">
                  <p className="flex justify-between">
                    <span className="font-semibold">Winners:</span>
                    <span>{prize.winners}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Entry Cost:</span>
                    <span>{prize.entry}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-semibold">Estimated Odds:</span>
                    <span className="text-sm">{prize.odds}</span>
                  </p>
                </div>

                <a
                  href="/raffle"
                  className="block w-full bg-forest text-cream text-center py-3 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Enter to Win
                </a>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-bark bg-opacity-10 border-l-4 border-forest p-6 rounded">
              <p className="text-bark text-center">
                <span className="font-semibold">Legal Notice:</span> All prizes are fulfilled by Uni-Phi Media LLC. 
                Winners will be contacted via email. Odds vary based on total entries. 
                No purchase necessary. See official rules for details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
