export default function HealerCommunitiesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Healer Communities</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Trauma-Informed Intentional Living
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Build regenerative communities centered on healing, mutual aid, and permaculture ethics. 
            For survivors, healers, and those seeking to break cycles of trauma through connection to land and people.
          </p>
        </div>
      </section>

      {/* What Is a Healer Community */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">What Is a Healer Community?</h2>
          <p className="text-lg text-bark mb-8 text-center">
            A healer community is an intentional village focused on collective healing through land stewardship, 
            cooperative economics, and trauma-informed relationships. We create spaces where people can recover, 
            grow, and thrive without replicating harmful systems.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Trauma-Informed Design</h3>
              <p className="text-bark">
                Physical and social spaces designed with safety, consent, and autonomy in mind. 
                No triggers, no hierarchies of abuse, no replication of toxic patterns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Permaculture Foundation</h3>
              <p className="text-bark">
                Healing through connection to land. Food forests, regenerative agriculture, and 
                ecosystem restoration as metaphors and methods for personal healing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Cooperative Economics</h3>
              <p className="text-bark">
                Shared resources, mutual aid, and gift economy principles. Break free from 
                extractive capitalism while building real security.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <h3 className="font-serif text-2xl text-forest mb-3">Sovereignty & Consent</h3>
              <p className="text-bark">
                Your body, your choices. Your land, your rules. Community agreements based on 
                consent, not coercion. Exit always an option.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">Our Core Principles</h2>
          <div className="space-y-6">
            <div className="bg-gold text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-2">1. Safety First, Always</h3>
              <p>
                Physical, emotional, and psychological safety are non-negotiable. Conflict resolution 
                through restorative justice, not punishment. Abusers not welcome.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-2">2. Land as Medicine</h3>
              <p>
                Reconnecting with soil, plants, water, and animals heals nervous systems damaged by 
                modern trauma. Permaculture is therapy that feeds you.
              </p>
            </div>
            <div className="bg-gold text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-2">3. Mutual Aid Over Competition</h3>
              <p>
                We succeed together or not at all. Share skills, resources, emotional support, and 
                labor. No one left behind. No bootstrap lies.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-2">4. Nervous System Awareness</h3>
              <p>
                Understanding triggers, regulation, and co-regulation. Creating environments that 
                support healing, not retraumatization.
              </p>
            </div>
            <div className="bg-gold text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-2">5. Equity & Access</h3>
              <p>
                Healing shouldn't require wealth. Sliding scale, workshare, and grant-funded spots available. 
                Anti-racist, anti-ableist, LGBTQ+ affirming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-8 text-center">Current Projects</h2>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Sanctuary Village (Iowa)</h3>
              <p className="text-bark mb-3">
                15-person community for survivors of domestic violence and sexual trauma. Women-centered, 
                children welcome. 40 acres with food forest, healing gardens, and private cabins.
              </p>
              <p className="text-sm text-bark opacity-70">Status: Accepting applications - 6 spots remaining</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Veterans' Respite (Missouri)</h3>
              <p className="text-bark mb-3">
                Combat veteran-focused community. PTSD-informed design, shared agricultural therapy, 
                peer support. 8 homestead lots on 60 acres.
              </p>
              <p className="text-sm text-bark opacity-70">Status: Planning phase - launching Fall 2026</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold">
              <h3 className="font-serif text-2xl text-forest mb-3">Queer Homestead Collective (Kansas)</h3>
              <p className="text-bark mb-3">
                LGBTQ+ led community on 25 acres. Trans-affirming, neurodivergent-friendly, polyamory-positive. 
                Building safe rural space for queer folx.
              </p>
              <p className="text-sm text-bark opacity-70">Status: Land secured - seeking founding members</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join or Start */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-8 text-center">How to Join or Start One</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">Join an Existing Project</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">1.</span>
                  <span>Review current projects above and visit our forum for updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">2.</span>
                  <span>Submit an application with your story and what you bring to community</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">3.</span>
                  <span>Video call interview with project coordinators (not interrogation, just connection)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">4.</span>
                  <span>Trial visit (1-2 weeks) to ensure mutual fit before commitment</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">5.</span>
                  <span>Move-in and begin your healing journey with community support</span>
                </li>
              </ul>
            </div>
            <div className="bg-cream p-8 rounded-lg">
              <h3 className="font-serif text-2xl mb-4">Start Your Own Community</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-3">1.</span>
                  <span>Contact us to discuss your vision and population focus</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">2.</span>
                  <span>We help with land search, funding strategies, and legal structure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">3.</span>
                  <span>Design consultation on trauma-informed layouts and permaculture integration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">4.</span>
                  <span>Connect with grant writers and mutual aid networks for funding</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">5.</span>
                  <span>Launch under the Uni-Phi network umbrella with ongoing support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Voices from the Community</h2>
          <div className="space-y-6">
            <div className="bg-bark text-cream p-6 rounded-lg">
              <p className="text-lg mb-4 italic">
                "After years of therapy that barely scratched the surface, three months working with soil 
                and community here did what pills never could. My hands remember how to feel safe."
              </p>
              <p className="text-gold font-bold">- Sarah, Sanctuary Village</p>
            </div>
            <div className="bg-bark text-cream p-6 rounded-lg">
              <p className="text-lg mb-4 italic">
                "I came here broken from combat and broken from how the VA treats veterans. Found brothers 
                who get it and land that doesn't judge. Finally sleeping through the night."
              </p>
              <p className="text-gold font-bold">- Marcus, Veterans' Respite</p>
            </div>
            <div className="bg-bark text-cream p-6 rounded-lg">
              <p className="text-lg mb-4 italic">
                "Being queer in rural spaces meant hiding. Here I can be fully myself AND have chickens. 
                That combination shouldn't be revolutionary, but it is. We're making it normal."
              </p>
              <p className="text-gold font-bold">- Alex, Queer Homestead Collective</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Begin Your Healing Journey</h2>
          <p className="text-lg mb-8">
            Whether you're ready to join a community or want to start one, we're here to support you. 
            Healing is possible. Land is medicine. Community is strength.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Apply to Join
            </a>
            <a
              href="/forum"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              Visit Our Forum
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
