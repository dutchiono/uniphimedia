export default function CatalogPage() {
  const featured = [
    {
      title: "The One-Straw Revolution",
      author: "Masanobu Fukuoka",
      description: "A radical philosophy of natural farming that inspired the permaculture movement. Learn to work with nature, not against it.",
      category: "Farming"
    },
    {
      title: "Gaia's Garden",
      author: "Toby Hemenway",
      description: "The definitive guide to home-scale permaculture. Design edible landscapes that sustain themselves and your family.",
      category: "Farming"
    },
    {
      title: "The Art of Natural Building",
      author: "Joseph F. Kennedy et al.",
      description: "Comprehensive guide to building with earth, straw, wood, and stone. Beautiful, affordable, and sustainable structures.",
      category: "Building"
    }
  ];

  const categories = [
    {
      name: "Food & Farming",
      description: "Permaculture, gardening, soil health, seed saving, food preservation",
      count: "42 resources"
    },
    {
      name: "Legal & Financial",
      description: "Land ownership, homestead law, off-grid regulations, community structure",
      count: "28 resources"
    },
    {
      name: "Health & Wellness",
      description: "Herbal medicine, first aid, mental resilience, natural healing",
      count: "35 resources"
    },
    {
      name: "Building & Construction",
      description: "Natural building, tiny homes, off-grid systems, DIY skills",
      count: "51 resources"
    },
    {
      name: "Community & Social",
      description: "Intentional communities, governance, conflict resolution, mutual aid",
      count: "22 resources"
    },
    {
      name: "Preparedness & Security",
      description: "Emergency prep, self-defense, water storage, resilience planning",
      count: "38 resources"
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">The Knowledge They Don't Want You to Find</h1>
          <p className="text-xl opacity-90">Curated resources for land, freedom, and self-reliance</p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for books, articles, guides..."
            className="w-full border-2 border-forest rounded-lg px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
            Search
          </button>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Featured Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((resource, idx) => (
            <div key={idx} className="bg-white border-2 border-gold rounded-lg p-6 shadow-lg">
              <div className="bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                {resource.category}
              </div>
              <h3 className="font-serif text-2xl text-forest mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-3">by {resource.author}</p>
              <p className="text-gray-700 mb-4">{resource.description}</p>
              <a
                href="#"
                className="inline-block bg-bark text-white px-4 py-2 rounded text-sm font-semibold hover:bg-opacity-90 transition-colors"
              >
                Find It
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Resource Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="font-serif text-2xl text-forest mb-2">{category.name}</h3>
              <p className="text-gray-700 text-sm mb-3">{category.description}</p>
              <p className="text-gold font-semibold text-sm">{category.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Resource */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-bark text-white rounded-lg p-8">
          <h2 className="font-serif text-3xl mb-4 text-center">Know a Resource We're Missing?</h2>
          <p className="text-center mb-6 opacity-90">Help us build the ultimate library for land-based living</p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Resource Title</label>
              <input type="text" className="w-full rounded-lg px-4 py-3 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Author / Creator</label>
              <input type="text" className="w-full rounded-lg px-4 py-3 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">URL or Where to Find It</label>
              <input type="text" className="w-full rounded-lg px-4 py-3 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select className="w-full rounded-lg px-4 py-3 text-gray-900">
                <option>Food & Farming</option>
                <option>Legal & Financial</option>
                <option>Health & Wellness</option>
                <option>Building & Construction</option>
                <option>Community & Social</option>
                <option>Preparedness & Security</option>
              </select>
            </div>
            <a
              href="/contact"
              className="block w-full bg-gold text-white text-center py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
            >
              Submit Resource
            </a>
          </form>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-4">Get New Resources Weekly</h2>
          <p className="text-lg mb-6 opacity-90">We add new books, guides, and articles every week</p>
          <a
            href="/contact"
            className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-colors"
          >
            Subscribe to Newsletter
          </a>
        </div>
      </section>
    </main>
  );
}
