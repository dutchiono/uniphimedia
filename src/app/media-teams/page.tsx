export default function MediaTeamsPage() {
  const roles = [
    {
      title: "Field Reporter",
      description: "Cover community events, property stories, and member spotlights. Interview community leaders and document life on the land.",
      skills: "Writing, interviewing, photography, storytelling"
    },
    {
      title: "Video Editor",
      description: "Transform raw footage into polished content for YouTube, social media, and our website. Create engaging educational videos.",
      skills: "Premiere, Final Cut, DaVinci Resolve, or similar"
    },
    {
      title: "Podcast Co-Host",
      description: "Join our weekly show to discuss land, permaculture, community, and freedom. Bring your perspective and expertise to the conversation.",
      skills: "Speaking, interviewing, subject matter knowledge"
    },
    {
      title: "Social Media Manager",
      description: "Grow the Uni-Phi presence across platforms. Create posts, engage with followers, and amplify our message to new audiences.",
      skills: "Instagram, Twitter, TikTok, Facebook, content strategy"
    }
  ];

  const responsibilities = [
    "Field reporting and on-location coverage",
    "Video production and editing",
    "Podcast recording and production",
    "Social media content and engagement",
    "Live streaming events and workshops"
  ];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Tell the Story of the Land</h1>
          <p className="text-xl opacity-90">Join the media team and earn while you create</p>
        </div>
      </section>

      {/* What the Media Team Does */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">What the Media Team Does</h2>
        <div className="bg-white border-2 border-forest rounded-lg p-8">
          <p className="text-lg text-gray-700 mb-6">
            Our media team creates content that educates, inspires, and grows the Uni-Phi community. From field reporting to video editing to social media, we document the reality of land-based living and share it with the world.
          </p>
          <ul className="space-y-3">
            {responsibilities.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-gold text-xl mr-3">✓</span>
                <span className="text-gray-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Open Roles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-white border-2 border-bark rounded-lg p-6">
              <h3 className="font-serif text-2xl text-forest mb-3">{role.title}</h3>
              <p className="text-gray-700 mb-4">{role.description}</p>
              <div className="bg-cream p-3 rounded">
                <p className="text-sm text-gray-600">
                  <strong>Skills:</strong> {role.skills}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">How It Works</h2>
        <div className="bg-gold text-white rounded-lg p-8">
          <h3 className="font-serif text-2xl mb-4">Volunteer + Profit Share Model</h3>
          <p className="text-lg mb-6">
            Media team members work on a volunteer basis with profit-sharing incentives. As our media grows, so does your compensation.
          </p>
          <div className="bg-white text-gray-900 rounded-lg p-6">
            <p className="text-lg font-semibold mb-2">Earn 3% of ad/sponsorship revenue per piece</p>
            <ul className="space-y-2 text-sm">
              <li>• Create a video that earns $500 → You get $15</li>
              <li>• Write an article that brings in $200 → You get $6</li>
              <li>• Co-host a sponsored episode worth $1,000 → You get $30</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Plus: Portfolio building, networking, skill development, and community impact
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Apply to Join</h2>
        <form className="bg-white border-2 border-forest rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-forest font-semibold mb-2">Full Name</label>
            <input type="text" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" />
          </div>
          <div>
            <label className="block text-forest font-semibold mb-2">Email</label>
            <input type="email" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" />
          </div>
          <div>
            <label className="block text-forest font-semibold mb-2">Role You're Interested In</label>
            <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
              <option>Field Reporter</option>
              <option>Video Editor</option>
              <option>Podcast Co-Host</option>
              <option>Social Media Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-forest font-semibold mb-2">Portfolio / Links</label>
            <textarea
              rows={4}
              placeholder="Share links to your previous work, social profiles, or samples"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
            ></textarea>
          </div>
          <div>
            <label className="block text-forest font-semibold mb-2">Your Availability</label>
            <textarea
              rows={3}
              placeholder="How many hours per week can you contribute?"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
            ></textarea>
          </div>
          <a
            href="/contact"
            className="block w-full bg-gold text-white text-center py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors"
          >
            Submit Application
          </a>
        </form>
      </section>

      {/* Why Join */}
      <section className="bg-bark text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-8 text-center">Why Join the Media Team?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-serif text-xl mb-2">Earn Revenue</h3>
              <p className="text-sm opacity-90">Get paid as content generates income</p>
            </div>
            <div>
              <div className="text-5xl mb-4">📈</div>
              <h3 className="font-serif text-xl mb-2">Build Your Portfolio</h3>
              <p className="text-sm opacity-90">Real work, real audience, real impact</p>
            </div>
            <div>
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-serif text-xl mb-2">Make a Difference</h3>
              <p className="text-sm opacity-90">Share knowledge that changes lives</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
