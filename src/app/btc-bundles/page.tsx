export default function BTCBundlesPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Bitcoin Bundles</h1>
          <p className="text-xl md:text-2xl mb-4 text-gold">
            Buy Your Homestead with Crypto
          </p>
          <p className="text-lg max-w-2xl mx-auto">
            Financial sovereignty meets land sovereignty. Pay for your off-grid homestead with Bitcoin, 
            Monero, Ethereum, or even gold and silver. Get 5% off for full BTC payment.
          </p>
        </div>
      </section>

      {/* Why Crypto */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">Why Pay with Crypto?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Financial Sovereignty</h3>
              <p className="text-bark">
                Your money, your rules. No banks, no permission, no financial surveillance. 
                True peer-to-peer value transfer for your land purchase.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Privacy</h3>
              <p className="text-bark">
                Keep your land purchase private. Monero and Bitcoin Lightning offer transaction privacy. 
                No credit checks, no paper trail beyond the deed.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Inflation Hedge</h3>
              <p className="text-bark">
                Convert volatile crypto gains into tangible land assets. Dollar loses value daily - 
                land holds value forever.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-bark">
              <div className="bg-gold w-12 h-12 rounded-full mb-4"></div>
              <h3 className="font-serif text-2xl text-forest mb-3">Fast Closing</h3>
              <p className="text-bark">
                No waiting for bank approvals or wire transfers. Bitcoin settles in minutes. 
                From payment to deed in days, not months.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Accept */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">What We Accept</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gold text-forest p-6 rounded-lg">
              <h3 className="font-serif text-2xl mb-3">Bitcoin (BTC)</h3>
              <p className="mb-4">
                On-chain or Lightning Network. 5% discount for full BTC payment. 
                Multi-sig escrow available for large purchases.
              </p>
              <p className="text-sm font-bold">Preferred method - best discount</p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg border-2 border-gold">
              <h3 className="font-serif text-2xl mb-3">Monero (XMR)</h3>
              <p className="mb-4">
                Privacy-first payments welcome. 3% discount for full XMR payment. 
                True financial anonymity for your land purchase.
              </p>
              <p className="text-sm font-bold">Maximum privacy option</p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg border-2 border-gold">
              <h3 className="font-serif text-2xl mb-3">Ethereum (ETH)</h3>
              <p className="mb-4">
                ETH and major stablecoins (USDC, DAI) accepted. Standard pricing. 
                Smart contract escrow available.
              </p>
              <p className="text-sm font-bold">Stablecoin-friendly</p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg border-2 border-gold">
              <h3 className="font-serif text-2xl mb-3">Gold & Silver</h3>
              <p className="mb-4">
                Physical precious metals accepted for partial or full payment. 
                Spot price + 2% premium. In-person verification required.
              </p>
              <p className="text-sm font-bold">Barter economy option</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="bg-gold text-forest py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-5xl mb-6">5% Bitcoin Discount</h2>
          <p className="text-2xl mb-8">
            Pay in full with Bitcoin and save $2,100 on a $42,000 Hobbit Home Bundle
          </p>
          <div className="bg-forest text-cream p-8 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl mb-4">Example Pricing</h3>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center border-b border-gold pb-3">
                <span>Hobbit Home Bundle (USD)</span>
                <span className="font-bold">$42,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-gold pb-3">
                <span>5% BTC Discount</span>
                <span className="font-bold text-gold">-$2,100</span>
              </div>
              <div className="flex justify-between items-center text-xl">
                <span>Your BTC Price</span>
                <span className="font-bold text-gold">$39,900 / ~0.40 BTC</span>
              </div>
            </div>
            <p className="text-sm mt-6 opacity-80">
              *BTC amount calculated at time of payment using 24-hour average spot price
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl text-forest mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-forest text-cream w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0 text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="font-serif text-2xl text-forest mb-2">Choose Your Package</h3>
                <p className="text-bark">
                  Select any homestead package, lot, or bunker. All properties available for crypto payment. 
                  Contact us to confirm current crypto pricing.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-forest text-cream w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0 text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="font-serif text-2xl text-forest mb-2">Lock In Your Rate</h3>
                <p className="text-bark">
                  We provide a payment address and lock the crypto amount for 24 hours. 
                  Price guaranteed during lock period to protect against volatility.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-forest text-cream w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0 text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="font-serif text-2xl text-forest mb-2">Send Payment</h3>
                <p className="text-bark">
                  Send crypto to the provided address. We'll provide txid confirmation. 
                  Escrow service available for purchases over $50k.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-forest text-cream w-12 h-12 rounded-full flex items-center justify-center mr-6 flex-shrink-0 text-xl font-bold">
                4
              </div>
              <div>
                <h3 className="font-serif text-2xl text-forest mb-2">Close & Transfer</h3>
                <p className="text-bark">
                  After confirmation, we process the deed transfer. Most crypto purchases close within 
                  5-7 business days. Welcome to land ownership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bark text-cream py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-12 text-center">Crypto Payment FAQ</h2>
          <div className="space-y-6">
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-2">Do I have to pay the full amount in crypto?</h3>
              <p>
                No. You can pay partial amounts in crypto and the rest in USD. The 5% discount only 
                applies to the crypto portion.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-2">What about taxes?</h3>
              <p>
                You're responsible for any capital gains taxes on crypto sales. We report the deed 
                transaction to the county at the USD value. Consult a tax professional.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-2">Is this legal?</h3>
              <p>
                Yes. Crypto is legal property under US law. We're selling land for consideration - 
                whether that's dollars, bitcoin, or chickens is up to the parties.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-2">What if I send the wrong amount?</h3>
              <p>
                Overpayments are refunded to your sending address minus network fees. Underpayments 
                will be held pending the remainder. Always double-check amounts.
              </p>
            </div>
            <div className="bg-cream text-forest p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-2">Do you accept altcoins besides ETH?</h3>
              <p>
                Contact us for special requests. We've accepted LTC, BCH, and others on a case-by-case basis. 
                Minimum purchase $10k for altcoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest text-cream py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl mb-6">Ready to Buy Land with Bitcoin?</h2>
          <p className="text-lg mb-8">
            Contact us to discuss crypto payment options. We'll walk you through the process 
            and answer all your questions. Financial freedom starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gold text-forest py-4 px-8 rounded-lg font-bold hover:bg-cream transition-colors"
            >
              Contact Us About Crypto
            </a>
            <a
              href="/hsh/packages"
              className="bg-bark text-cream py-4 px-8 rounded-lg font-bold hover:bg-gold hover:text-forest transition-colors"
            >
              View All Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
