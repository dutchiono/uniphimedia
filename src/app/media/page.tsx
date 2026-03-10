export default function MediaPage() {
  const videos = [
    { title: "Building a Hugelkultur Bed", category: "Farming", views: "2.4K" },
    { title: "Off-Grid Solar Setup Tour", category: "DIY", views: "5.1K" },
    { title: "Community Land Basics", category: "Legal", views: "3.8K" },
    { title: "Food Forest Year One", category: "Permaculture", views: "1.9K" },
    { title: "Tiny Home Building Tips", category: "DIY", views: "7.2K" },
    { title: "Midwest Homestead Tour", category: "Community", views: "4.5K" }
  ];

  const schedule = [
    { day: "Monday", time: "7:00 PM", show: "Weekly Community Call", description: "Open Q&A and community updates" },
    { day: "Wednesday", time: "8:00 PM", show: "Permaculture Deep Dive", description: "Advanced growing techniques" },
    { day: "Friday", time: "6:00 PM", show: "Open Q&A", description: "Ask us anything about land and living" },
    { day: "Sunday", time: "2:00 PM", show: "Land Tour Live", description: "Virtual tour of Uni-Phi properties" }
  ];

  const categories = ["All", "Farming", "Legal", "DIY", "Permaculture", "Community"];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">The Uni-Phi Signal</h1>
          <p className="text-xl opacity-90">Podcasts, videos, and livestreams from the land</p>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white border-4 border-gold rounded-lg p-8 shadow-xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/5">
              <div className="bg-bark rounded-lg aspect-video flex items-center justify-center">
                <div className="text-white text-6xl">▶</div>
              </div>
            </div>
            <div className="md:w-3/5">
              <div className="bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                FEATURED EPISODE
              </div>
              <h2 className="font-serif text-3xl text-forest mb-3">Community Land: The Next American Frontier</h2>
              <p className="text-gray-700 mb-4">
                Why traditional homeownership is failing, and how community-based land models are creating a new path to security, affordability, and freedom.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>Duration: 1hr 12min</span>
                <span>•</span>
                <span>Released: March 1, 2026</span>
              </div>
              <button className="bg-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                idx === 0
                  ? 'bg-forest text-cream'
                  : 'bg-white text-forest border-2 border-forest hover:bg-forest hover:text-cream'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Video Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Recent Videos</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <div key={idx} className="bg-white border-2 border-bark rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-bark aspect-video flex items-center justify-center">
                <div className="text-white text-4xl">▶</div>
              </div>
              <div className="p-4">
                <div className="bg-gold text-white px-2 py-1 rounded text-xs font-semibold inline-block mb-2">
                  {video.category}
                </div>
                <h3 className="font-serif text-lg text-forest mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Livestream Schedule */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Livestream Schedule</h2>
        <div className="bg-white border-2 border-forest rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-forest text-cream">
              <tr>
                <th className="px-6 py-4 text-left font-serif text-lg">Day</th>
                <th className="px-6 py-4 text-left font-serif text-lg">Time</th>
                <th className="px-6 py-4 text-left font-serif text-lg">Show</th>
                <th className="px-6 py-4 text-left font-serif text-lg">Description</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                  <td className="px-6 py-4 font-semibold text-forest">{item.day}</td>
                  <td className="px-6 py-4 text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 font-semibold text-bark">{item.show}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-center text-gray-600 mt-4 text-sm">All times Eastern (ET)</p>
      </section>

      {/* Subscribe Section */}
      <section className="bg-bark text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-6">Never Miss an Episode</h2>
          <p className="text-lg mb-8 opacity-90">Subscribe on your favorite platform</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              YouTube
            </a>
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              Spotify
            </a>
            <a href="#" className="bg-white text-bark px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-colors">
              Apple Podcasts
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
