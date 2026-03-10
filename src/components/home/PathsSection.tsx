import Link from 'next/link';
import { Home, Users, Radio } from 'lucide-react';

const paths = [
  {
    icon: Home,
    title: 'Buy Land & Build',
    description: 'Secure your place in Hillshire Hollows or another community. Choose from hobbit homes, hillside packages, van life spots, and more.',
    cta: 'View Properties',
    href: '/hsh',
    color: 'bg-brand-green',
  },
  {
    icon: Users,
    title: 'Join a Community',
    description: 'Become a member, worksharer, or community leader. Multiple tiers fit every situation — from retirees to nomads to families.',
    cta: 'See Membership',
    href: '/membership',
    color: 'bg-brand-earth',
  },
  {
    icon: Radio,
    title: 'Follow the Media',
    description: 'Podcasts, livestreams, DIY guides, and permaculture education. Stay connected and learn at your own pace.',
    cta: 'Watch & Listen',
    href: '/media',
    color: 'bg-brand-gold',
  },
];

export function PathsSection() {
  return (
    <section className="bg-brand-dark text-white py-16">
      <div className="section">
        <h2 className="font-heading text-4xl font-bold text-center mb-12 text-brand-gold">
          Three Ways to Get Involved
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {paths.map(p => (
            <div key={p.title} className="bg-white/5 rounded-2xl p-8 flex flex-col">
              <div className={`${p.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                <p.icon size={24} className="text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed flex-1">{p.description}</p>
              <Link href={p.href} className="mt-6 btn-primary inline-block text-center text-sm">
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}