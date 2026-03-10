export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-forest text-cream py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-serif text-5xl mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">Effective Date: January 1, 2025</p>
          <p className="text-lg opacity-80 mt-2">Last Updated: January 1, 2025</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">1. Information We Collect</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-bark/80 space-y-2">
              <li>Name and email address</li>
              <li>Payment information (processed via Stripe; we never store your credit card details)</li>
              <li>IP address and browser information</li>
              <li>Usage data (pages visited, time spent on site)</li>
              <li>Cookies for site functionality and analytics</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">2. How We Use Your Information</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-bark/80 space-y-2">
              <li>Process membership applications and payments</li>
              <li>Send newsletters and updates (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about your account</li>
              <li>Respond to your questions and support requests</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">3. Cookies</h2>
            <p className="text-bark/80 leading-relaxed">
              We use essential cookies for site functionality and optional analytics cookies (Google Analytics) to understand how visitors use our site. You can opt out of analytics cookies through your browser settings or by using browser extensions.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">4. Third-Party Services</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              We use the following third-party services, each with their own privacy policies:
            </p>
            <ul className="list-disc pl-6 text-bark/80 space-y-2">
              <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" className="text-gold hover:underline">privacy policy</a>)</li>
              <li><strong>Google Analytics</strong> — website analytics (<a href="https://policies.google.com/privacy" className="text-gold hover:underline">privacy policy</a>)</li>
              <li><strong>Mailchimp</strong> — email newsletters (<a href="https://mailchimp.com/legal/privacy/" className="text-gold hover:underline">privacy policy</a>)</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">5. Data Retention</h2>
            <p className="text-bark/80 leading-relaxed">
              We retain your account data while your membership is active, plus 1 year after cancellation for record-keeping purposes. You may request deletion of your data at any time by contacting us.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">6. Your Rights</h2>
            <p className="text-bark/80 leading-relaxed mb-4">
              <strong>CCPA (California Residents):</strong> You have the right to request data deletion or opt out of data sale. We do not sell your personal information.
            </p>
            <p className="text-bark/80 leading-relaxed mb-4">
              <strong>GDPR (EU Residents):</strong> You have the right to access, correct, delete, and port your personal data.
            </p>
            <p className="text-bark/80 leading-relaxed">
              To exercise these rights, email us at <a href="mailto:privacy@uniphimedia.com" className="text-gold hover:underline">privacy@uniphimedia.com</a>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">7. Children's Privacy</h2>
            <p className="text-bark/80 leading-relaxed">
              We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">8. Changes to This Policy</h2>
            <p className="text-bark/80 leading-relaxed">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email. Your continued use of our services after changes take effect constitutes acceptance.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="font-serif text-3xl text-forest mb-4 font-bold">9. Contact Us</h2>
            <p className="text-bark/80 leading-relaxed">
              For questions about this Privacy Policy or to exercise your data rights, please contact us at:
            </p>
            <p className="text-bark/80 leading-relaxed mt-4">
              <a href="mailto:privacy@uniphimedia.com" className="text-gold hover:underline font-semibold">
                privacy@uniphimedia.com
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
