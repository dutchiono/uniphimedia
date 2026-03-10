export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-5xl mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Effective Date: January 1, 2025</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">1. Acceptance of Terms</h2>
            <p className="text-bark/80 leading-relaxed">
              By using this site, you agree to these Terms of Service. If you do not agree, please do not use this site or our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">2. Description of Service</h2>
            <p className="text-bark/80 leading-relaxed">
              Uni-Phi Media LLC provides community information, membership services, and land programs. These services are subject to change without notice.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">3. Membership Terms</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              Memberships are personal and non-transferable. You may not share your membership credentials with others.
            </p>
            <p className="text-bark/80 leading-relaxed">
              <strong>Cancellation Policy:</strong> Monthly memberships require 30-day written notice for cancellation. Annual memberships require 90-day written notice for cancellation. No refunds will be issued for partial membership periods.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">4. Payment and Refunds</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              Payments are processed securely through our payment partners. We do not store your credit card information.
            </p>
            <p className="text-bark/80 leading-relaxed">
              <strong>Refund Policy:</strong> Deposits on land programs are refundable within 30 days of payment, minus a 10% processing fee. After 30 days, deposits are non-refundable. Membership fees are non-refundable after the first 7 days.
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">5. Community Rules</h2>
            <p className="text-bark/80 leading-relaxed">
              Members must follow our community guidelines at all times. Violations may result in membership termination without refund. See our <a href="/community-rules" className="text-gold hover:underline">Community Rules</a> for details.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">6. Intellectual Property</h2>
            <p className="text-bark/80 leading-relaxed">
              All content on this site, including text, images, logos, and designs, is owned by Uni-Phi Media LLC or used with permission. You may not reproduce, distribute, or modify any content without written permission.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">7. Disclaimer of Warranties</h2>
            <p className="text-bark/80 leading-relaxed">
              This site and all services are provided "as is" without warranties of any kind. We make no guarantees regarding land availability, investment returns, or the accuracy of information provided.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">8. Limitation of Liability</h2>
            <p className="text-bark/80 leading-relaxed">
              Uni-Phi Media LLC is not liable for any damages exceeding the membership fees you paid in the prior 12 months. This includes direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">9. Governing Law</h2>
            <p className="text-bark/80 leading-relaxed">
              These Terms of Service are governed by the laws of the State of Missouri, without regard to conflict of law principles.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">10. Changes to Terms</h2>
            <p className="text-bark/80 leading-relaxed">
              We may update these terms at any time. Material changes will be communicated via email with at least 30 days' notice. Continued use of our services after changes take effect constitutes acceptance.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">11. Contact Information</h2>
            <p className="text-bark/80 leading-relaxed">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-bark/80 leading-relaxed mt-4">
              <a href="mailto:legal@uniphimedia.com" className="text-gold hover:underline font-semibold">
                legal@uniphimedia.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
