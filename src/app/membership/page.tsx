import Link from 'next/link'

const tiers = [
  {
    name: 'Workshare',
    icon: '🌾',
    desc: 'Work a set schedule in exchange for community access, land use, and skill-building. Perfect for those who want to contribute hands-on.',
    features: ['Flexible work schedule', 'Land access & garden plot', 'Community housing credit', 'Skills training', 'Forum access'],
    cta: 'Apply for Workshare',
    href: '/workshares',
  },
  {
    name: 'Community',
    icon: '🏘️',
    desc: 'Standard membership with full access to community events, forum, media library, and member perks.',
    features: ['Community events access', 'Member forum', 'Media library', 'Monthly giveaways', 'Discount on tours'],
    cta: 'Join Now',
    href: '/contact',
  },
  {
    name: 'Retiree',
    icon: '🌅',
    desc: 'Designed for retirees seeking intentional community living with peace, purpose, and like-minded neighbors.',
    features: ['Dedicated retiree community', 'On-site social programs', 'Medical resource network', 'Gardening programs', 'Low-stress lifestyle design'],
    cta: 'Learn More',
    href: '/contact',
  },
  {
    name: 'Van Life',
    icon: '🚐',
    desc: 'For the nomads. Hook up at Hillshire Hollows, stay as long as you need, and tap into community resources while on the road.',
    features: ['Monthly hookup access', 'Electric & water', 'Community WiFi', 'Laundry access', 'Mail handling'],
    cta: 'Get Hooked Up',
    href: '/contact',
  },
  {
    name: 'Lifetime',
    icon: '♾️',
    desc: 'One payment, permanent stake. The highest tier — includes profit-sharing, priority land access, and all future perks.',
    features: ['One-time payment', 'Profit-sharing model', 'Priority property access', 'All future benefits included', 'Founding member status'],
    cta: 'Become a Lifer',
    href: '/contact',
    featured: true,
  },
]

const clubs = [
  { name: 'Monthly Seed Club', icon: '🌱', desc: 'Rare and heirloom seeds delivered to your door each month.' },
  { name: 'Sticker Club', icon: '🎨', desc: 'Exclusive Uni-Phi sticker drops — community art and branding.' },
  { name: 'Veteran Support Sub', icon: '🎖️', desc: 'Monthly support package for veterans in and around the community.' },
]

export default function MembershipPage() {
  return (
    <>
      <section className="bg-brand-green text-white section-pad py-24 text-center">
        <div className="container-max">
          <h1 className="font-heading text-5xl md:text-6xl font-black mb-6">Membership</h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">Five ways to belong — from working the land to holding a lifetime stake. Find the path that fits your life.</p>
        </div>
      </section>

      <section className="bg-brand-cream section-pad">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers.map(tier => (
              <div key={tier.name} className={`rounded-xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow ${tier.featured ? 'bg-brand-green text-white ring-2 ring-brand-gold lg:col-span-1' : 'bg-white'}`}>
                <span className="text-4xl mb-4">{tier.icon}</span>
                <h3 className={`font-heading text-2xl font-bold mb-3 ${tier.featured ? 'text-brand-gold' : 'text-brand-green'}`}>{tier.name}</h3>
                <p className={`text-sm mb-5 flex-1 ${tier.featured ? 'text-white/80' : 'text-brand-bark/70'}`}>{tier.desc}</p>
                <ul className="space-y-1 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${tier.featured ? 'text-white/70' : 'text-brand-bark/60'}`}>
                      <span className="text-brand-gold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={tier.featured ? 'btn-gold' : 'btn-primary'}>{tier.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Clubs */}
      <section className="bg-white section-pad">
        <div className="container-max">
          <h2 className="font-heading text-4xl font-bold text-brand-green text-center mb-4">Monthly Subscription Clubs</h2>
          <p className="text-center text-brand-bark/60 mb-12 max-w-xl mx-auto">Add-on subscriptions open to all members.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {clubs.map(c => (
              <div key={c.name} className="bg-brand-cream rounded-xl p-8 text-center">
                <span className="text-5xl mb-4 block">{c.icon}</span>
                <h3 className="font-heading text-xl font-bold text-brand-green mb-3">{c.name}</h3>
                <p className="text-brand-bark/70 text-sm mb-6">{c.desc}</p>
                <Link href="/contact" className="btn-outline">Subscribe</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}