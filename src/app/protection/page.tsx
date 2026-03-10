export default function ProtectionPage() {
  const physicalSecurity = [
    { title: "Perimeter Fencing", desc: "Strategic fencing for visibility and deterrence, not isolation" },
    { title: "Motion Lighting", desc: "Solar-powered lights that activate on movement" },
    { title: "Door & Window Hardening", desc: "Reinforced frames, quality locks, and security film" },
    { title: "Safe Room Basics", desc: "Secure interior space for tornado shelter and emergency refuge" }
  ];

  const communityWatch = [
    "Mutual aid network connecting neighbors for rapid response",
    "Communication tree using radios, phone trees, and signal systems",
    "Neighborhood signal system for emergencies (bells, flags, lights)",
    "Regular community safety meetings and drills"
  ];

  const checklistItems = [
    "Water (1 gallon per person per day)",
    "Non-perishable food (3 days minimum)",
    "First aid kit and medications",
    "Flashlight, radio, extra batteries",
    "Whistle for signaling",
    "Dust masks and plastic sheeting",
    "Local maps and emergency contacts",
    "Cash and important documents"
  ];

  const midwestRisks = [
    {
      title: "Tornado Preparedness",
      desc: "Know your safe room or basement shelter. Have a NOAA weather radio. Practice your plan. Most tornadoes occur March-June in late afternoon."
    },
    {
      title: "Ice Storm Readiness",
      desc: "Backup heating source (wood stove, propane). Insulated pipes. Generator or battery backup. Stock up before winter hits."
    },
    {
      title: "Flood Basics",
      desc: "Know your property elevation and flood zone. Never drive through standing water. Keep important documents in waterproof containers."
    },
    {
      title: "Power Grid Outage",
      desc: "Solar panels with battery storage. Generator with fuel supply. Propane appliances. Be ready for extended outages."
    }
  ];

  const skills = [
    {
      title: "First Aid",
      icon: "🩹",
      desc: "CPR, wound care, fracture stabilization, and when to seek professional help"
    },
    {
      title: "Fire Starting",
      icon: "🔥",
      desc: "Multiple methods without matches: friction, flint, magnification, battery"
    },
    {
      title: "Navigation",
      icon: "🧭",
      desc: "Map and compass skills, natural navigation, GPS backup strategies"
    },
    {
      title: "Foraging",
      icon: "🍄",
      desc: "Safe identification of edible plants, mushrooms, and wild foods in your region"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-forest text-cream py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-5xl md:text-6xl mb-6">
            Prepared. Protected. Resilient.
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Security isn't about fear. It's about readiness, community, and peace of mind.
          </p>
        </div>
      </section>

      {/* Physical Security */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Physical Security</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {physicalSecurity.map((item, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-6 text-center">
                <h3 className="font-serif text-xl text-forest mb-3">{item.title}</h3>
                <p className="text-bark text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Watch */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Community Watch Network</h2>
          <div className="max-w-4xl mx-auto bg-white border-2 border-forest rounded-lg p-8">
            <p className="text-bark text-lg mb-6 text-center">
              <strong className="text-forest">Safety is a team sport.</strong> We watch out for each other.
            </p>
            <ul className="space-y-4">
              {communityWatch.map((item, idx) => (
                <li key={idx} className="flex items-start text-bark">
                  <span className="text-gold text-2xl mr-4 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Emergency Preparedness</h2>
          
          {/* 72-Hour Kit */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="font-serif text-3xl text-forest text-center mb-8">72-Hour Emergency Kit</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="bg-cream border-2 border-forest rounded-lg p-4 flex items-center">
                  <input type="checkbox" className="mr-3 w-5 h-5" />
                  <span className="text-bark">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Basics */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-2xl text-forest mb-4">Food Storage Basics</h3>
              <p className="text-bark mb-3">
                Store what you eat, eat what you store. Start with 2 weeks, build to 3-6 months.
              </p>
              <ul className="space-y-2 text-bark text-sm">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Dry goods: rice, beans, pasta, oats
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Canned goods: vegetables, fruits, proteins
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Rotate stock: first in, first out
                </li>
              </ul>
            </div>
            
            <div className="border-2 border-forest rounded-lg p-6">
              <h3 className="font-serif text-2xl text-forest mb-4">Water Storage</h3>
              <p className="text-bark mb-3">
                <strong>1 gallon per person per day</strong> for drinking and sanitation.
              </p>
              <ul className="space-y-2 text-bark text-sm">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Food-grade containers only
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Store in cool, dark location
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Replace every 6-12 months
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  Have filtration backup (Berkey, LifeStraw)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Midwest-Specific Risks */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Midwest-Specific Risks</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {midwestRisks.map((risk, idx) => (
              <div key={idx} className="bg-white border-2 border-forest rounded-lg p-6">
                <h3 className="font-serif text-2xl text-forest mb-3">{risk.title}</h3>
                <p className="text-bark">{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Reliance Skills */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-forest text-center mb-12">Self-Reliance Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, idx) => (
              <div key={idx} className="border-2 border-forest rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{skill.icon}</div>
                <h3 className="font-serif text-xl text-forest mb-3">{skill.title}</h3>
                <p className="text-bark text-sm">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Considerations */}
      <section className="py-16 bg-forest text-cream">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-8">Legal Considerations</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white bg-opacity-10 border-2 border-cream rounded-lg p-8">
              <p className="text-lg mb-4">
                <strong>Know your state laws.</strong> Midwest states generally support the right to self-defense and firearm ownership, 
                but specific laws vary.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-3 flex-shrink-0">•</span>
                  <span>Most Midwest states have "Stand Your Ground" or "Castle Doctrine" laws</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 flex-shrink-0">•</span>
                  <span>Concealed carry permits recognized with reciprocity agreements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 flex-shrink-0">•</span>
                  <span>Use of force must be reasonable and proportional to the threat</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 flex-shrink-0">•</span>
                  <span>Consult an attorney and get proper training before carrying</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources CTA */}
      <section className="py-16 bg-gold bg-opacity-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-forest mb-6">Learn More</h2>
          <p className="text-bark text-lg max-w-3xl mx-auto mb-8">
            We offer workshops on emergency preparedness, self-defense, and survival skills. 
            Members get priority access and discounted rates.
          </p>
          <a
            href="/contact"
            className="inline-block bg-forest text-cream px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Get Workshop Schedule
          </a>
        </div>
      </section>
    </div>
  );
}
