export default function MediaPage() {
  const videos = [
    { title: "Building a Food Forest from Scratch", category: "Permaculture", views: "12.4K" },
    { title: "Tiny Home Tour: Off-Grid in Missouri", category: "DIY", views: "8.2K" },
    { title: "Understanding Land Trusts vs HOAs", category: "Legal", views: "5.7K" },
    { title: "No-Till Market Garden Setup", category: "Farming", views: "9.1K" },
    { title: "Community Conflict Resolution 101", category: "Community", views: "3.4K" },
    { title: "Solar Power Basics for Homesteaders", category: "DIY", views: "15.3K" }
  ];

  const schedule = [
    { day: "Monday", time: "7:00 PM ET", show: "Weekly Community Call", desc: "Open forum for members" },
    { day: "Wednesday", time: "8:00 PM ET", show: "Permaculture Deep Dive", desc: "Technical education series" },
    { day: "Friday", time: "6:00 PM ET", show: "Open Q&A", desc: "Ask us anything" },
    { day: "Sunday", time: "2:00 PM ET", show: "Land Tour Live", desc: "Virtual property walkthroughs" }
  ];

  const categories = ["All", "Farming", "Legal", "DIY", "Permaculture", "Community"];

  const platforms = [
    { name: "YouTube", icon: "📺", url: "#" },
    { name: "Spotify", icon: "🎵", url: "#" },
    { name: "Apple Podcasts", icon: "🎧", url: "#" },
    { name: "RSS Feed", icon: "📡", url: "#" }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            The Uni-Phi Signal
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Real stories. Real land. Real community. Watch, listen, learn.
          </p>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Featured Episode</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-cream border-4 border-gold rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Placeholder thumbnail */}
                <div className="bg-forest rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-cream text-6xl">▶️</div>
                </div>
                
                <div>
                  <div className="bg-gold text-white px-3 py-1 rounded text-sm font-bold inline-block mb-4">
                    NEW EPISODE
                  </div>
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    Community Land: The Next American Frontier
                  </h3>
                  <p className="text-bark mb-4">
                    We explore how community land ownership is reshaping the American Dream. 
                    From land trusts to intentional communities, this is the future of property rights.
                  </p>
                  <p className="text-bark text-sm mb-6">
                    <strong>Duration:</strong> 1hr 12min
                  </p>
                  <button className="bg-forest text-cream px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-cream">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className="px-6 py-2 border-2 border-forest rounded-full text-forest font-semibold hover:bg-forest hover:text-cream transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Latest Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {videos.map((video, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {/* Thumbnail placeholder */}
                <div className="bg-bark aspect-video flex items-center justify-center">
                  <div className="text-cream text-4xl">▶️</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gold text-white px-3 py-1 rounded text-xs font-bold">
                      {video.category}
                    </span>
                    <span className="text-bark text-sm">{video.views} views</span>
                  </div>
                  <h3 className="font-serif text-xl text-forest">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Livestream Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Livestream Schedule</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-cream border-2 border-forest rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-forest text-cream">
                  <tr>
                    <th className="py-4 px-6 text-left font-serif text-lg">Day</th>
                    <th className="py-4 px-6 text-left font-serif text-lg">Time</th>
                    <th className="py-4 px-6 text-left font-serif text-lg">Show</th>
                    <th className="py-4 px-6 text-left font-serif text-lg">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, idx) => (
                    <tr key={idx} className="border-t-2 border-forest border-opacity-20">
                      <td className="py-4 px-6 font-bold text-forest">{item.day}</td>
                      <td className="py-4 px-6 text-bark">{item.time}</td>
                      <td className="py-4 px-6 font-semibold text-bark">{item.show}</td>
                      <td className="py-4 px-6 text-bark text-sm">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-bark mt-6">
              All times Eastern. Recordings available for members who can't attend live.
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Subscribe & Follow</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 opacity-90">
            Never miss an episode. Subscribe on your favorite platform.
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {platforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                className="bg-white bg-opacity-10 border-2 border-cream rounded-lg p-6 hover:bg-opacity-20 transition text-center"
              >
                <div className="text-5xl mb-3">{platform.icon}</div>
                <div className="font-semibold">{platform.name}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-forest mb-6">Want to Be Featured?</h2>
          <p className="text-bark text-lg max-w-3xl mx-auto mb-8">
            Got a story to tell? A skill to share? We're always looking for community members 
            to interview, feature, and amplify.
          </p>
          <a
            href="/contact"
            className="inline-block bg-forest text-cream px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
