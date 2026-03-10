import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Uni-Phi Media. We respond within 1-2 business days.',
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-brand-green text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/80">We respond within 1–2 business days.</p>
        </div>
      </section>
      <section className="section max-w-2xl">
        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I'm interested in...</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green">
              <option>Hillshire Hollows property</option>
              <option>Membership</option>
              <option>Workshares</option>
              <option>Booking a tour</option>
              <option>Media / press inquiry</option>
              <option>General question</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows={6} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-green" />
          </div>
          <button type="submit" className="btn-primary w-full text-center text-lg py-4">
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}