export default function FarmsteadsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Grow More Than Food</h1>
          <p className="text-xl opacity-90">Become a farmstead operator in our regenerative network</p>
        </div>
      </section>

      {/* What a Farmstead Operator Does */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">What Does a Farmstead Operator Do?</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <p className="text-lg text-bark mb-6">
            As a farmstead operator, you manage a plot within the Uni-Phi land network, growing food for both the community and for sale at local markets. You're part farmer, part entrepreneur, part community builder.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="font-semibold text-forest mb-2">Grow</h3>
              <p className="text-bark text-sm">Cultivate vegetables, herbs, or specialty crops using regenerative methods</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-semibold text-forest mb-2">Share</h3>
              <p className="text-bark text-sm">Contribute surplus to community members and food security initiatives</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-semibold text-forest mb-2">Profit</h3>
              <p className="text-bark text-sm">Keep majority of sales revenue and build your farming business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Operator Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Profit Sharing on Harvests</h3>
              <p className="text-bark">Keep 80% of market sales, 20% supports community infrastructure and shared resources</p>
            </div>
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Seed Library Access</h3>
              <p className="text-bark">Free seeds from our extensive heirloom and hybrid collection, save your own to contribute</p>
            </div>
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Tool Library</h3>
              <p className="text-bark">Access to tractors, tillers, irrigation equipment, and hand tools without the capital investment</p>
            </div>
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Marketing Support</h3>
              <p className="text-bark">We handle farmers market booth fees, social media promotion, and wholesale connections</p>
            </div>
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Community Labor Days</h3>
              <p className="text-bark">Tap into volunteer workforce during planting and harvest seasons for big jobs</p>
            </div>
            <div className="border-l-4 border-gold pl-6 py-4">
              <h3 className="font-serif text-xl text-forest mb-2">Mentorship Network</h3>
              <p className="text-bark">Connect with experienced farmers and access ongoing training workshops</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">Requirements</h2>
        <div className="bg-bark/10 p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-3">Minimum 1-Acre Commitment</h3>
              <p className="text-bark">You'll be assigned at least 1 acre to manage, with option to expand based on performance</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-3">2 Workshops Per Year</h3>
              <p className="text-bark">Attend at least two skill-building workshops annually on topics like soil health, pest management, or marketing</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-forest mb-3">Share Surplus with Community</h3>
              <p className="text-bark">Contribute 10% of harvest to community food programs and member access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Form Section */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-8 text-center">Apply to Become a Farmstead Operator</h2>
          <div className="bg-bark/30 p-8 rounded-lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded bg-white text-bark" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded bg-white text-bark" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Experience Level</label>
                  <select className="w-full px-4 py-3 rounded bg-white text-bark">
                    <option>Select your experience</option>
                    <option>Complete Beginner</option>
                    <option>Home Gardener</option>
                    <option>Some Farm Experience</option>
                    <option>Professional Farmer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Acreage Available</label>
                  <select className="w-full px-4 py-3 rounded bg-white text-bark">
                    <option>How many acres can you manage?</option>
                    <option>1-2 acres</option>
                    <option>3-5 acres</option>
                    <option>6-10 acres</option>
                    <option>10+ acres</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tell Us About Your Vision</label>
                <textarea className="w-full px-4 py-3 rounded bg-white text-bark h-32" placeholder="What do you want to grow? What's your farming philosophy? What are your goals?"></textarea>
              </div>
              <div className="text-center">
                <button type="button" className="bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
                  Submit Application
                </button>
                <p className="text-sm mt-4 opacity-75">We'll review your application and reach out within 7 days</p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-4xl text-forest mb-4">Root Yourself in Purpose</h2>
        <p className="text-lg text-bark">Join a network of growers building food security and community resilience</p>
      </section>
    </div>
  )
}
