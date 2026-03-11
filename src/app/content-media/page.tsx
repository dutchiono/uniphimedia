export default function ContentMediaPage() {
  const videos = [
    {
      title: "How to Build a Hugelkultur Bed",
      duration: "24:15",
      description: "Step-by-step guide to creating self-watering raised beds using the hugelkultur method"
    },
    {
      title: "Food Forest Design for Beginners",
      duration: "38:42",
      description: "Learn to design a layered perennial food system that mimics natural forests"
    },
    {
      title: "No-Till Market Garden Setup",
      duration: "31:20",
      description: "Transform any space into a productive no-till garden with minimal equipment"
    },
    {
      title: "Seed Saving Masterclass",
      duration: "45:18",
      description: "Preserve heirloom varieties and build your own seed library for generations"
    }
  ];

  const podcasts = [
    {
      title: "The Permaculture Principles",
      duration: "52:14",
      description: "Deep dive into the 12 principles that guide regenerative land design"
    },
    {
      title: "Midwest Soil Health",
      duration: "48:33",
      description: "Understanding prairie soils and how to build fertility naturally"
    },
    {
      title: "Water Harvesting 101",
      duration: "41:27",
      description: "Capture and store water on your property without expensive infrastructure"
    },
    {
      title: "Building with Natural Materials",
      duration: "56:09",
      description: "Earthbag, cob, straw bale, and timber framing for DIY builders"
    },
    {
      title: "Community Economics",
      duration: "44:55",
      description: "How community land models create wealth while maintaining affordability"
    },
    {
      title: "The Farmstead Legal Guide",
      duration: "39:42",
      description: "Navigate zoning, permits, and property rights as a Farmsteader"
    }
  ];

  const series = [
    {
      title: "Permaculture 101",
      episodes: "12 episodes",
      description: "Complete beginner's journey into regenerative land design and systems thinking"
    },
    {
      title: "Midwest Farmsteading",
      episodes: "8 episodes",
      description: "Climate-specific strategies for growing food and building resilience in the heartland"
    },
    {
      title: "Legal Land Series",
      episodes: "6 episodes",
      description: "Everything you need to know about buying, owning, and protecting your land"
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Grow Your Knowledge</h1>
          <p className="text-xl opacity-90">Free farming and permaculture education for everyone</p>
        </div>
      </section>

      {/* Latest Videos */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Latest Videos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {videos.map((video, idx) => (
            <div key={idx} className="bg-white border-2 border-forest rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-bark aspect-video flex items-center justify-center">
                <div className="text-white text-5xl">▶</div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl text-forest">{video.title}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-2">{video.duration}</span>
                </div>
                <p className="text-gray-700 text-sm">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Podcast Episodes */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Podcast Episodes</h2>
        <div className="bg-white border-2 border-bark rounded-lg divide-y-2 divide-cream">
          {podcasts.map((episode, idx) => (
            <div key={idx} className="p-6 hover:bg-cream transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <button className="bg-gold text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 hover:bg-opacity-90 transition-colors">
                  ▶
                </button>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-forest mb-1">{episode.title}</h3>
                  <p className="text-gray-700 text-sm">{episode.description}</p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{episode.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Series */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Featured Series</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {series.map((item, idx) => (
            <div key={idx} className="bg-gold text-white rounded-lg p-8">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
              <p className="text-sm opacity-90 mb-3">{item.episodes}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="bg-bark text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Subscribe & Never Miss New Content</h2>
          <p className="text-lg mb-8 opacity-90">New videos and podcast episodes every week</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              Spotify
            </a>
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              Apple Podcasts
            </a>
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              Google Podcasts
            </a>
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              RSS Feed
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
