export default function ForumIntroductionsPage() {
  const introductions = [
    {
      name: "Sarah M.",
      location: "Rural Kansas",
      bio: "I've been Farmsteading for 5 years and found Uni-Phi through the podcast. I grow heirloom tomatoes and want to connect with others doing the same.",
      memberSince: "2025",
    },
    {
      name: "James T.",
      location: "St. Louis, MO",
      bio: "Retired Army veteran, 22 years. Looking for land and community after years on the move. Hillshire Hollows caught my eye.",
      memberSince: "2025",
    },
    {
      name: "Luna R.",
      location: "Traveling (van life)",
      bio: "I've been on the road for 3 years. Spending winters at Uni-Phi spots, summers in the mountains. Love this community.",
      memberSince: "2025",
    },
    {
      name: "David & Maria C.",
      location: "Chicago, IL",
      bio: "We're a family of four looking to make the move off-grid. We're in the planning phase and Uni-Phi has been a wealth of info.",
      memberSince: "2025",
    },
    {
      name: "Tom W.",
      location: "Indianapolis",
      bio: "Permaculture designer and teacher. Excited to share knowledge and learn from this community.",
      memberSince: "2025",
    },
    {
      name: "Renee B.",
      location: "Rural Iowa",
      bio: "Single mom, self-taught herbalist, backyard farmer. Found Uni-Phi when researching intentional communities. This feels like home.",
      memberSince: "2025",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-6">
            <a href="/forum" className="text-gold hover:underline text-sm">
              ← Back to Forum
            </a>
          </div>
          <h1 className="font-serif text-5xl mb-4">Say Hello to the Community</h1>
          <p className="text-xl opacity-90">
            New here? Tell us who you are, where you're from, and what brought you to Uni-Phi.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Introduction Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {introductions.map((intro, idx) => (
            <div key={idx} className="bg-white border-2 border-bark/20 p-6 rounded-lg">
              <div className="mb-4">
                <h3 className="font-serif text-2xl text-forest font-bold">{intro.name}</h3>
                <p className="text-gold text-sm font-semibold">{intro.location}</p>
              </div>
              <p className="text-bark mb-4 leading-relaxed">{intro.bio}</p>
              <p className="text-bark/50 text-sm">Member since {intro.memberSince}</p>
            </div>
          ))}
        </div>

        {/* CTA to Join */}
        <div className="bg-gold/10 border-2 border-gold p-8 rounded-lg text-center">
          <h3 className="font-serif text-3xl text-forest mb-3">Post Your Introduction</h3>
          <p className="text-bark mb-6 text-lg">Join as a member to introduce yourself and connect with the community.</p>
          <a
            href="/membership"
            className="inline-block bg-forest text-cream px-8 py-3 rounded-lg hover:bg-forest/90 transition-colors font-semibold text-lg"
          >
            Become a Member
          </a>
        </div>
      </main>
    </div>
  );
}
