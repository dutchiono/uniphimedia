export default function CatalogPage() {
  const featuredResources = [
    {
      title: "The One-Straw Revolution",
      author: "Masanobu Fukuoka",
      desc: "The philosophy and practice of natural farming. A must-read for anyone serious about regenerative agriculture.",
      link: "#"
    },
    {
      title: "Gaia's Garden",
      author: "Toby Hemenway",
      desc: "A comprehensive guide to home-scale permaculture. Practical, accessible, and transformative.",
      link: "#"
    },
    {
      title: "The Art of Natural Building",
      author: "Various Contributors",
      desc: "Design and construction with natural materials. From cob to cordwood, timber frame to earthbag.",
      link: "#"
    }
  ];

  const categories = [
    {
      title: "Food & Farming",
      icon: "🌾",
      desc: "Permaculture, regenerative ag, food forests, seed saving, livestock management",
      count: 47
    },
    {
      title: "Legal & Financial",
      icon: "⚖️",
      desc: "Land law, homestead exemptions, tax strategies, alternative currencies",
      count: 23
    },
    {
      title: "Health & Wellness",
      icon: "🌿",
      desc: "Herbal medicine, natural remedies, mental health, fitness for homesteaders",
      count: 31
    },
    {
      title: "Building & Construction",
      icon: "🔨",
      desc: "Natural building, off-grid systems, tiny homes, workshop design",
      count: 38
    },
    {
      title: "Community & Social",
      icon: "🤝",
      desc: "Intentional communities, conflict resolution, governance, mutual aid",
      count: 19
    },
    {
      title: "Preparedness & Security",
      icon: "🛡️",
      desc: "Emergency prep, self-defense, food storage, resilience planning",
      count: 25
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            The Knowledge They Don't Want You to Find
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Curated resources for land ownership, self-reliance, and community building.
          </p>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredResources.map((resource, idx) => (
              <div key={idx} className="border-2 border-gold rounded-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="font-serif text-2xl text-forest mb-2">{resource.title}</h3>
                <p className="text-bark text-sm mb-4 italic">by {resource.author}</p>
                <p className="text-bark mb-6">{resource.desc}</p>
                <a
                  href={resource.link}
                  className="inline-block bg-forest text-cream px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition"
                >
                  Find It
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-forest rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-5xl mb-4 text-center">{category.icon}</div>
                <h3 className="font-serif text-2xl text-forest mb-3 text-center">{category.title}</h3>
                <p className="text-bark text-sm text-center mb-4">{category.desc}</p>
                <div className="text-center">
                  <span className="inline-block bg-gold text-white px-4 py-1 rounded text-sm font-bold">
                    {category.count} Resources
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-8">Search the Catalog</h2>
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for books, articles, courses, tools..."
                className="flex-1 border-2 border-forest rounded px-6 py-4 text-lg"
              />
              <button className="bg-forest text-cream px-8 py-4 rounded font-semibold hover:bg-opacity-90 transition">
                Search
              </button>
            </div>
            <p className="text-bark text-sm text-center mt-4">
              Search by title, author, topic, or keyword. Members get full access to the catalog.
            </p>
          </div>
        </div>
      </section>

      {/* Submit a Resource */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Submit a Resource</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-cream border-2 border-forest rounded-lg p-8">
              <p className="text-bark text-center mb-8">
                Found something valuable? Share it with the community. We review all submissions.
              </p>
              <form className="space-y-6">
                <div>
                  <label className="block text-forest font-semibold mb-2">Resource Title *</label>
                  <input
                    type="text"
                    className="w-full border-2 border-forest rounded px-4 py-3"
                    placeholder="Book title, article name, course title..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-forest font-semibold mb-2">Author / Creator</label>
                  <input
                    type="text"
                    className="w-full border-2 border-forest rounded px-4 py-3"
                    placeholder="Author name or organization"
                  />
                </div>
                
                <div>
                  <label className="block text-forest font-semibold mb-2">URL / Link</label>
                  <input
                    type="url"
                    className="w-full border-2 border-forest rounded px-4 py-3"
                    placeholder="https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-forest font-semibold mb-2">Category *</label>
                  <select className="w-full border-2 border-forest rounded px-4 py-3" required>
                    <option value="">Select a category...</option>
                    <option value="food-farming">Food & Farming</option>
                    <option value="legal-financial">Legal & Financial</option>
                    <option value="health-wellness">Health & Wellness</option>
                    <option value="building-construction">Building & Construction</option>
                    <option value="community-social">Community & Social</option>
                    <option value="preparedness-security">Preparedness & Security</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-forest font-semibold mb-2">Description</label>
                  <textarea
                    className="w-full border-2 border-forest rounded px-4 py-3 h-32"
                    placeholder="Why is this resource valuable? What does it cover?"
                  ></textarea>
                </div>

                <div className="text-center">
                  <a
                    href="/contact"
                    className="inline-block bg-forest text-cream px-12 py-4 rounded font-semibold text-lg hover:bg-opacity-90 transition"
                  >
                    Submit Resource
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Get New Resources Weekly</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Every week we share new additions to the catalog. Stay sharp, stay informed.
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
