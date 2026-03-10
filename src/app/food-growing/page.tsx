export default function FoodGrowingPage() {
  const gettingStarted = [
    { title: "Soil Basics", description: "Understanding pH, texture, and organic matter" },
    { title: "Composting 101", description: "Turn waste into black gold for your garden" },
    { title: "Companion Planting", description: "Plants that help each other thrive" },
    { title: "Seed Saving", description: "Preserve heirloom varieties for future seasons" }
  ];

  const seasonal = [
    { season: "Spring", crops: ["Peas", "Lettuce", "Onions", "Radishes", "Spinach"] },
    { season: "Summer", crops: ["Tomatoes", "Squash", "Beans", "Peppers", "Cucumbers"] },
    { season: "Fall", crops: ["Kale", "Carrots", "Garlic", "Broccoli", "Beets"] },
    { season: "Winter", crops: ["Microgreens", "Planning", "Cover Crops", "Indoor Herbs"] }
  ];

  const methods = [
    {
      title: "Food Forest Design",
      description: "Layered perennial systems that mimic natural forests. Plant fruit and nut trees as the canopy, shrubs in the mid-layer, herbs and vegetables below, with root crops and ground covers filling the gaps. Low maintenance, high yield."
    },
    {
      title: "Hugelkultur Beds",
      description: "Raised beds built on a foundation of logs and woody debris. As the wood decomposes, it feeds the soil, retains water, and creates warmth. Perfect for the Midwest climate — plant once and harvest for years."
    },
    {
      title: "No-Till Farming",
      description: "Keep the soil structure intact by never turning it over. Use mulch, compost, and cover crops to build fertility naturally. Healthier microbes, fewer weeds, less work."
    }
  ];

  const workshops = [
    { title: "Spring Seed Starting Workshop", date: "TBD", description: "Learn to start seeds indoors for early transplants" },
    { title: "Summer Fermentation & Food Preservation", date: "TBD", description: "Turn your harvest into shelf-stable nutrition" },
    { title: "Fall Garlic Planting Day", date: "TBD", description: "Community planting event with garlic for all" }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">From Seed to Table</h1>
          <p className="text-xl opacity-90">Grow real food. Feed your family. Build resilience.</p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Getting Started</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {gettingStarted.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-xl text-forest mb-3">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seasonal Growing Guide */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Seasonal Growing Guide</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {seasonal.map((item, idx) => (
            <div key={idx} className="bg-bark text-white rounded-lg p-6">
              <h3 className="font-serif text-2xl mb-4">{item.season}</h3>
              <ul className="space-y-2">
                {item.crops.map((crop, cidx) => (
                  <li key={cidx} className="flex items-center">
                    <span className="text-gold mr-2">•</span>
                    <span>{crop}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Uni-Phi Methods */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Uni-Phi Growing Methods</h2>
        <div className="space-y-6">
          {methods.map((method, idx) => (
            <div key={idx} className="bg-white border-2 border-gold rounded-lg p-8">
              <h3 className="font-serif text-2xl text-forest mb-3">{method.title}</h3>
              <p className="text-gray-700 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Seed Library */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Community Seed Library</h2>
        <div className="bg-gold text-white rounded-lg p-8">
          <h3 className="font-serif text-2xl mb-4">Borrow. Grow. Return.</h3>
          <p className="text-lg mb-4">Members can borrow seeds from our community library. Grow them out, save seeds from the best plants, and return double what you borrowed.</p>
          <p className="opacity-90">Current varieties available: heirloom tomatoes, beans, squash, lettuce, herbs, and more. Check back for updated inventory.</p>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Upcoming Workshops</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {workshops.map((workshop, idx) => (
            <div key={idx} className="bg-white border-2 border-bark rounded-lg p-6">
              <div className="bg-bark text-white px-3 py-1 rounded-full text-sm inline-block mb-3">
                {workshop.date}
              </div>
              <h3 className="font-serif text-xl text-forest mb-2">{workshop.title}</h3>
              <p className="text-gray-700 text-sm">{workshop.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-4">Get Growing Tips Weekly</h2>
          <p className="text-lg mb-6 opacity-90">Join our newsletter for seasonal guides, growing tips, and workshop announcements</p>
          <a
            href="/contact"
            className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
          >
            Subscribe Now
          </a>
        </div>
      </section>
    </main>
  );
}
