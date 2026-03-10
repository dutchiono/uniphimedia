export default function FoodGrowingPage() {
  const gettingStarted = [
    { title: "Soil Basics", desc: "Understanding soil composition, pH, and how to build healthy living soil" },
    { title: "Composting 101", desc: "Turn kitchen scraps and yard waste into black gold for your garden" },
    { title: "Companion Planting", desc: "Learn which plants grow better together and which to keep apart" },
    { title: "Seed Saving", desc: "Preserve heirloom varieties and become seed-independent" }
  ];

  const seasonal = {
    Spring: ["Peas", "Lettuce", "Onions", "Spinach", "Radishes"],
    Summer: ["Tomatoes", "Squash", "Beans", "Cucumbers", "Peppers"],
    Fall: ["Kale", "Carrots", "Garlic", "Broccoli", "Turnips"],
    Winter: ["Microgreens", "Planning", "Cover Crops", "Indoor Herbs"]
  };

  const methods = [
    {
      title: "Food Forest Design",
      desc: "A seven-layer edible ecosystem mimicking natural forests. Includes canopy trees (nuts, fruits), understory (dwarf fruits), shrubs (berries), herbaceous layer (perennial vegetables), ground cover (strawberries, herbs), root layer (potatoes, roots), and vertical layer (vines, climbers). Once established, requires minimal maintenance."
    },
    {
      title: "Hugelkultur Beds",
      desc: "Raised beds built on a foundation of decaying wood and organic matter. As the wood decomposes, it creates nutrient-rich, water-retentive soil while reducing the need for irrigation. Perfect for the Midwest climate with variable rainfall patterns."
    },
    {
      title: "No-Till Farming",
      desc: "Preserve soil structure and microbial life by never turning the soil. Use mulch, cover crops, and compost to build fertility from the top down. Reduces erosion, improves water retention, and sequesters carbon. The Uni-Phi way."
    }
  ];

  const workshops = [
    { title: "Spring Seed Starting Workshop", date: "TBD", desc: "Learn to start seeds indoors and transplant outdoors" },
    { title: "Summer Preserving & Canning", date: "TBD", desc: "Put up your harvest for winter with safe canning techniques" },
    { title: "Fall Permaculture Design Course", date: "TBD", desc: "72-hour intensive certification course in permaculture design" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            From Seed to Table
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Grow your own food, build resilient systems, and reconnect with the land.
          </p>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Getting Started</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {gettingStarted.map((item, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-serif text-xl text-forest mb-3">{item.title}</h3>
                <p className="text-bark text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Growing Guide */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Seasonal Growing Guide</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {Object.entries(seasonal).map(([season, crops]) => (
              <div key={season} className="bg-white border-2 border-forest rounded-lg p-6">
                <h3 className="font-serif text-2xl text-forest mb-4 text-center">{season}</h3>
                <ul className="space-y-2">
                  {crops.map((crop, idx) => (
                    <li key={idx} className="text-bark flex items-center">
                      <span className="text-gold mr-2">•</span>
                      {crop}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uni-Phi Methods */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">The Uni-Phi Methods</h2>
          <div className="max-w-5xl mx-auto space-y-8">
            {methods.map((method, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg p-8">
                <h3 className="font-serif text-3xl text-forest mb-4">{method.title}</h3>
                <p className="text-bark leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Seed Library */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Community Seed Library</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-cream border-2 border-forest rounded-lg p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="font-serif text-2xl text-forest mb-4">Borrow. Grow. Save. Return.</h3>
              </div>
              <div className="space-y-4 text-bark">
                <p>
                  <strong className="text-forest">How it works:</strong> Members can borrow heirloom seeds from our library, 
                  grow them out, save seeds from the best plants, and return seeds to the library for others to use.
                </p>
                <p>
                  <strong className="text-forest">Current varieties available:</strong> Over 50 heirloom varieties including 
                  Cherokee Purple Tomatoes, Detroit Dark Red Beets, Marketmore Cucumbers, Provider Beans, and more.
                </p>
                <p className="text-sm italic">
                  Full catalog available to members in the member portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Upcoming Workshops</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {workshops.map((workshop, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
                <div className="bg-gold text-white px-3 py-1 rounded text-sm font-bold inline-block mb-4">
                  {workshop.date}
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">{workshop.title}</h3>
                <p className="text-bark mb-4">{workshop.desc}</p>
                <a
                  href="/contact"
                  className="inline-block border-2 border-forest text-forest px-4 py-2 rounded hover:bg-forest hover:text-cream transition"
                >
                  Get Notified
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Get Growing Tips Weekly</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for seasonal tips, planting guides, and community updates.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="your.email@example.com"
              className="flex-1 px-4 py-3 rounded text-bark"
            />
            <button className="bg-gold text-white px-6 py-3 rounded font-semibold hover:bg-opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
