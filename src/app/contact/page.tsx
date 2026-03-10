export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-white/80 text-xl max-w-xl mx-auto">Questions about land, membership, workshares, or tours — we want to hear from you.</p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max max-w-2xl mx-auto">
          <form className="bg-white rounded-xl shadow-sm p-8 md:p-12 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-brand-bark mb-2">First Name</label>
                <input type="text" className="w-full border border-brand-stone/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green bg-brand-cream" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-brand-bark mb-2">Last Name</label>
                <input type="text" className="w-full border border-brand-stone/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green bg-brand-cream" placeholder="Smith" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-bark mb-2">Email</label>
              <input type="email" className="w-full border border-brand-stone/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green bg-brand-cream" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-bark mb-2">I am interested in...</label>
              <select className="w-full border border-brand-stone/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green bg-brand-cream">
                <option>Hillshire Hollows land / property</option>
                <option>Membership</option>
                <option>Workshare program</option>
                <option>Scheduling a tour</option>
                <option>The raffle</option>
                <option>Media / content</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-bark mb-2">Message</label>
              <textarea rows={5} className="w-full border border-brand-stone/30 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green bg-brand-cream resize-none" placeholder="Tell us about yourself and what you're looking for..." />
            </div>
            <button type="submit" className="btn-primary w-full text-lg py-4">Send Message</button>
          </form>
        </div>
      </section>
    </>
  )
}