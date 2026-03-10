export default function ForumPage() {
  const categories = [
    {
      emoji: "💬",
      name: "General Discussion",
      description: "Open conversation about land, community, and living free",
      posts: "156 posts",
      lastPost: "2 hours ago"
    },
    {
      emoji: "👋",
      name: "Introduce Yourself",
      description: "New to Uni-Phi? Say hello and tell us your story",
      posts: "89 posts",
      lastPost: "1 hour ago"
    },
    {
      emoji: "🌾",
      name: "Farming Tips",
      description: "Share what works. Learn from others. Grow together.",
      posts: "203 posts",
      lastPost: "4 hours ago"
    },
    {
      emoji: "⚖️",
      name: "Legal Q&A",
      description: "Know your rights. Help each other navigate land law.",
      posts: "67 posts",
      lastPost: "Today"
    },
    {
      emoji: "🔄",
      name: "Buy/Sell/Trade",
      description: "Community marketplace for goods, services, and skills",
      posts: "124 posts",
      lastPost: "30 minutes ago"
    },
    {
      emoji: "📢",
      name: "Announcements",
      description: "Official updates from Uni-Phi Media and community leaders",
      posts: "42 posts",
      lastPost: "Yesterday"
    }
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Community Forum</h1>
          <p className="text-xl opacity-90">Connect. Share. Learn. Grow.</p>
        </div>
      </section>

      {/* Forum Notice */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-gold text-white rounded-lg p-6 text-center">
          <p className="text-lg font-semibold">Forum powered by community members. Be kind, be real. Be Uni-Phi.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-forest rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl flex-shrink-0">{category.emoji}</div>
                <div className="flex-1">
                  <h2 className="font-serif text-2xl text-forest mb-2">{category.name}</h2>
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold">{category.posts}</span>
                    <span>•</span>
                    <span>Last post: {category.lastPost}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#"
                    className="bg-forest text-cream px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-bark text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Join the Discussion</h2>
          <p className="text-xl mb-8 opacity-90">Become a member to post, comment, and connect with the community</p>
          <a
            href="/membership"
            className="inline-block bg-gold text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
          >
            Become a Member
          </a>
        </div>
      </section>

      {/* Forum Guidelines Preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Community Guidelines</h2>
        <div className="bg-white border-2 border-bark rounded-lg p-8">
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="text-gold text-xl mr-3">✓</span>
              <span><strong>Be Respectful:</strong> Disagree without being disagreeable. Everyone's on their own journey.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold text-xl mr-3">✓</span>
              <span><strong>Stay On Topic:</strong> Keep discussions relevant to the category. Off-topic posts may be moved.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold text-xl mr-3">✓</span>
              <span><strong>No Spam:</strong> Self-promotion is allowed in Buy/Sell/Trade only. Don't spam links.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold text-xl mr-3">✓</span>
              <span><strong>Help Each Other:</strong> Share knowledge freely. Answer questions when you can.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gold text-xl mr-3">✓</span>
              <span><strong>Report Issues:</strong> Flag inappropriate content. Let moderators handle conflicts.</span>
            </li>
          </ul>
          <div className="mt-6 text-center">
            <a href="/forum/rules" className="text-forest font-semibold hover:underline">
              Read Full Forum Rules →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
