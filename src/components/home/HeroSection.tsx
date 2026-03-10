import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-brand-green text-white overflow-hidden">
      {/* Background image placeholder — replace with actual HSH aerial photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-green/80 to-brand-dark/60" />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold mb-4">
          Midwest Community Building
        </p>
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Reignite the<br />American Dream
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
          Self-sustaining, profit-sharing communities rooted in permaculture, 
          financial freedom, and real human connection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/hsh" className="btn-secondary text-lg px-8 py-4">
            Explore Hillshire Hollows
          </Link>
          <Link href="/communities" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
            See All Communities
          </Link>
        </div>
      </div>
    </section>
  );
}