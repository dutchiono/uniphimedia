export default function ContentMediaPage() {
  const videos = [
    {
      title: "How to Build a Hugelkultur Bed",
      duration: "18:32",
      desc: "Step-by-step guide to creating water-retentive raised beds using decaying wood and organic matter."
    },
    {
      title: "Food Forest Design for Beginners",
      duration: "24:15",
      desc: "Learn the seven layers of a food forest and how to design one for your climate and space."
    },
    {
      title: "No-Till Market Garden Setup",
      duration: "16:48",
      desc: "Start a profitable market garden without ever turning the soil. Preserve soil life and reduce labor."
    },
    {
      title: "Seed Saving Masterclass",
      duration: "31:22",
      desc: "Master the art of saving seeds from your best plants. Ensure genetic diversity and food sovereignty."
    }
  ];

  const episodes = [
    {
      title: "The Permaculture Principles",
      duration: "42:18",
      desc: "Deep dive into the 12 permaculture principles and how to apply them to your land and life."
    },
    {
      title: "Midwest Soil Health",
      duration: "38:45",
      desc: "Understanding prairie soils, building organic matter, and working with Midwest clay."
    },
    {
      title: "Water Harvesting 101",
      duration: "35:12",
      desc: "Capture, store, and slow water on your property. Swales, ponds, and rain catchment systems."
    },
    {
      title: "Building with Natural Materials",
      duration: "47:30",
      desc: "Cob, straw bale, cordwood, and earthbag construction. Pros, cons, and best practices."
    },
    {
      title: "Community Economics",
      duration: "40:55",
      desc: "How intentional communities handle money, labor, and resource sharing. Models that work."
    },
    {
      title: "The Homestead Legal Guide",
      duration: "52:10",
      desc: "Land law, zoning, building codes, and legal structures for community land ownership."
    }
  ];

  const series = [
    {
      title: "Permaculture 101",
      count: "8 episodes",
      desc: "Start from zero. Learn the foundations of regenerative land design."
    },
    {
      title: "Midwest Homesteading",
      count: "12 episodes",
      desc: "Climate-specific techniques for farming and building in the heartland."
    },
    {
      title: "Legal Land Series",
      count: "6 episodes",
      desc: "Everything you need to know about buying, owning, and protecting land."
    }
  ];

  const platforms = [
    { name: "Spotify", url: "#" },
    { name: "Apple Podcasts", url: "#" },
    { name: "Google Podcasts", url: "#" },
    { name: "RSS Feed", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Grow Your Knowledge
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            In-depth farming, permaculture, and homesteading education. Learn by doing.
          </p>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Latest Videos</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {videos.map((video, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Thumbnail placeholder */}
                <div className="bg-forest aspect-video flex items-center justify-center">
                  <div className="text-cream text-5xl">▶️</div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl text-forest flex-1">{video.title}</h3>
                    <span className="bg-gold text-white px-3 py-1 rounded text-sm font-bold ml-4">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-bark mb-4">{video.desc}</p>
                  <button className="bg-forest text-cream px-6 py-2 rounded font-semibold hover:bg-opacity-90 transition">
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast Episodes */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Recent Podcast Episodes</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {episodes.map((episode, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  <button className="flex-shrink-0 w-16 h-16 bg-forest text-cream rounded-full flex items-center justify-center text-2xl hover:bg-opacity-90 transition">
                    ▶️
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-2xl text-forest">{episode.title}</h3>
                      <span className="text-bark text-sm ml-4">{episode.duration}</span>
                    </div>
                    <p className="text-bark">{episode.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Series */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Featured Series</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {series.map((s, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-gold text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  🎥
                </div>
                <h3 className="font-serif text-2xl text-forest mb-2">{s.title}</h3>
                <p className="text-bark text-sm mb-4 font-semibold">{s.count}</p>
                <p className="text-bark mb-6">{s.desc}</p>
                <button className="border-2 border-forest text-forest px-6 py-2 rounded hover:bg-forest hover:text-cream transition">
                  View Series
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-8">Subscribe to the Podcast</h2>
          <p className="text-xl text-center max-w-3xl mx-auto mb-12 opacity-90">
            New episodes every week. Deep dives into farming, building, law, and community.
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {platforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                className="bg-white bg-opacity-10 border-2 border-cream rounded-lg p-6 text-center hover:bg-opacity-20 transition"
              >
                <div className="font-semibold text-lg">{platform.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-forest mb-6">Want More Content?</h2>
          <p className="text-bark text-lg max-w-3xl mx-auto mb-8">
            Members get access to our full archive, exclusive workshops, and downloadable guides. 
            Level up your homesteading game.
          </p>
          <a
            href="/membership"
            className="inline-block bg-forest text-cream px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
}
