export default function HealerCommunitiesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Spaces That Restore</h1>
          <p className="text-xl opacity-90">Intentional communities designed for healing and growth</p>
        </div>
      </section>

      {/* What is a Healer Community */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">What is a Healer Community?</h2>
        <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
          <p className="text-lg text-bark mb-6">
            A healer community is an intentional living space designed to support emotional, physical, and spiritual restoration. These communities integrate trauma-informed design principles with cooperative living and nature-based healing modalities.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Trauma-Informed Design</h3>
              <p className="text-bark">Spaces built with safety, choice, and empowerment in mind</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Sound Healing Circles</h3>
              <p className="text-bark">Regular group sessions using frequency and vibration</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Permaculture as Therapy</h3>
              <p className="text-bark">Working with the land as a healing practice</p>
            </div>
            <div className="border-l-4 border-gold pl-4">
              <h3 className="font-semibold text-forest mb-2">Cooperative Living</h3>
              <p className="text-bark">Shared resources, responsibilities, and support systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Current Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-2 border-forest p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-forest">Prairie Sanctuary</h3>
                <span className="bg-bark/20 text-bark text-xs px-3 py-1 rounded-full">Planning</span>
              </div>
              <p className="text-bark mb-4">
                80-acre prairie restoration site with 12 residential units. Focus on grief work and somatic healing practices.
              </p>
              <ul className="text-sm text-bark space-y-1">
                <li>• 12 private cabins</li>
                <li>• Central healing hall</li>
                <li>• Medicine garden</li>
                <li>• Launch: Fall 2027</li>
              </ul>
            </div>
            <div className="border-2 border-gold bg-gold/5 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-forest">River Bend Healing Circle</h3>
                <span className="bg-forest text-cream text-xs px-3 py-1 rounded-full">Active</span>
              </div>
              <p className="text-bark mb-4">
                Riverside property with existing structures. Currently housing 8 residents in various stages of recovery.
              </p>
              <ul className="text-sm text-bark space-y-1">
                <li>• 8 residents (2 spots open)</li>
                <li>• Weekly sound baths</li>
                <li>• Forest bathing trails</li>
                <li>• Apply now</li>
              </ul>
            </div>
            <div className="border-2 border-forest p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl text-forest">Woodland Retreat</h3>
                <span className="bg-gold text-forest text-xs px-3 py-1 rounded-full">Deposits Open</span>
              </div>
              <p className="text-bark mb-4">
                Forest-edge property designed for nervous system regulation and nature immersion therapy.
              </p>
              <ul className="text-sm text-bark space-y-1">
                <li>• 6 earth-sheltered homes</li>
                <li>• Cold plunge & sauna</li>
                <li>• Meditation labyrinth</li>
                <li>• Launch: Spring 2027</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8 text-center">How to Join</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-4">As a Resident</h3>
            <p className="text-bark mb-4">
              Join an existing healer community as a member. Most communities require a brief application and interview process to ensure good fit.
            </p>
            <ul className="space-y-2 text-bark mb-6">
              <li>• Share your healing journey</li>
              <li>• Describe what support you need</li>
              <li>• Interview with community members</li>
              <li>• 30-day trial period</li>
            </ul>
            <a href="/contact" className="inline-block bg-forest text-cream px-6 py-3 rounded font-semibold hover:bg-forest/90 transition">
              Apply as Resident
            </a>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-4">As a Healer-in-Residence</h3>
            <p className="text-bark mb-4">
              Bring your healing practice to a community. Provide services to residents in exchange for reduced rent and community support.
            </p>
            <ul className="space-y-2 text-bark mb-6">
              <li>• Licensed or trained practitioners</li>
              <li>• 10 hours/week minimum service</li>
              <li>• Private treatment space provided</li>
              <li>• 6-month minimum commitment</li>
            </ul>
            <a href="/contact" className="inline-block bg-gold text-forest px-6 py-3 rounded font-semibold hover:bg-gold/90 transition">
              Apply as Healer
            </a>
          </div>
        </div>
      </section>

      {/* How to Start One */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-6 text-center">Want to Start Your Own?</h2>
          <p className="text-lg text-center mb-8 opacity-90">
            We support visionary leaders in creating new healer communities. Submit a proposal with your vision, target population, and desired location.
          </p>
          <div className="bg-bark/30 p-6 rounded-lg mb-8">
            <h3 className="font-serif text-xl mb-4">What We Provide</h3>
            <ul className="space-y-2">
              <li>• Land access and site selection</li>
              <li>• Legal structure and liability guidance</li>
              <li>• Build support and design consultation</li>
              <li>• Connection to funding and grants</li>
              <li>• Network of experienced community leaders</li>
            </ul>
          </div>
          <div className="text-center">
            <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
              Submit a Proposal
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-4xl text-forest mb-4">Healing Happens in Community</h2>
        <p className="text-lg text-bark">Let's create spaces where restoration is possible</p>
      </section>
    </div>
  )
}
