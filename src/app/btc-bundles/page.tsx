export default function BTCBundlesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl mb-4">Financial Sovereignty Meets Land Ownership</h1>
          <p className="text-xl opacity-90">Buy land with Bitcoin and alternative currencies</p>
        </div>
      </section>

      {/* Why Crypto */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Why Cryptocurrency?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Inflation Hedge</h3>
            <p className="text-bark">Protect your purchasing power with sound money that can't be inflated away</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Privacy</h3>
            <p className="text-bark">Transact without unnecessary third-party surveillance or approval</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl text-forest mb-3">Sound Money</h3>
            <p className="text-bark">Built on mathematics and scarcity, not political promises</p>
          </div>
        </div>
      </section>

      {/* What We Accept */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest mb-8">What We Accept</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-gold p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">₿</div>
              <h3 className="text-xl font-semibold text-forest mb-2">Bitcoin</h3>
              <p className="text-sm text-bark">BTC - Primary option</p>
            </div>
            <div className="border-2 border-forest p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">ɱ</div>
              <h3 className="text-xl font-semibold text-forest mb-2">Monero</h3>
              <p className="text-sm text-bark">XMR - Privacy focused</p>
            </div>
            <div className="border-2 border-forest p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">Ξ</div>
              <h3 className="text-xl font-semibold text-forest mb-2">Ethereum</h3>
              <p className="text-sm text-bark">ETH - Smart contracts</p>
            </div>
            <div className="border-2 border-forest p-6 rounded-lg text-center">
              <div className="text-4xl mb-3">🥇</div>
              <h3 className="text-xl font-semibold text-forest mb-2">Gold/Silver</h3>
              <p className="text-sm text-bark">Physical precious metals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gold text-forest p-8 rounded-lg text-center shadow-lg">
          <h2 className="font-serif text-3xl mb-4">5% Discount for Full BTC Payment</h2>
          <p className="text-lg">Pay the entire purchase price in Bitcoin and receive an automatic 5% discount on any land package or property.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-forest text-cream py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-serif text-2xl mb-3">Choose Your Package</h3>
              <p className="opacity-90">Select the land package or property that fits your needs</p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-serif text-2xl mb-3">Send Crypto to Escrow</h3>
              <p className="opacity-90">Transfer your cryptocurrency to our secure escrow wallet</p>
            </div>
            <div className="text-center">
              <div className="bg-gold text-forest w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-serif text-2xl mb-3">Receive Deed/Contract</h3>
              <p className="opacity-90">Once confirmed, we process your deed and send all legal documents</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="font-serif text-4xl text-forest mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-2">Is BTC payment legal?</h3>
            <p className="text-bark">Yes. Cryptocurrency is recognized as property by the IRS and is a legal form of payment for real estate transactions in the United States.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-2">Do you accept altcoins?</h3>
            <p className="text-bark">We accept Bitcoin, Monero, and Ethereum. Other cryptocurrencies may be considered on a case-by-case basis — contact us to discuss.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-forest mb-2">What about price volatility?</h3>
            <p className="text-bark">The purchase price is locked in USD at the time of agreement. The crypto amount is calculated at that moment to match the agreed USD price.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark text-cream py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl mb-4">Ready to Buy with Bitcoin?</h2>
          <p className="text-xl mb-8 opacity-90">Contact us to discuss crypto payment options</p>
          <a href="/contact" className="inline-block bg-gold text-forest px-8 py-4 rounded-lg font-semibold hover:bg-gold/90 transition">
            Get Started
          </a>
        </div>
      </section>
    </div>
  )
}
