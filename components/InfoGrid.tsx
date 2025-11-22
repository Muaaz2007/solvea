import React from 'react';
import { Globe2, Leaf, Zap, Rocket } from 'lucide-react';

export const InfoGrid: React.FC = () => {
  const features = [
    {
      title: "Interplanetary Diplomacy",
      description: "Navigating the complexities of governance beyond Earth's atmosphere.",
      icon: <Globe2 className="text-electric-400" size={32} />,
      delay: "0"
    },
    {
      title: "Sustainable Ecosystems",
      description: "Engineering closed-loop biological systems for long-duration space travel.",
      icon: <Leaf className="text-eco-400" size={32} />,
      delay: "100"
    },
    {
      title: "Energy Innovation",
      description: "Harnessing stellar radiation and dark matter for limitless clean energy.",
      icon: <Zap className="text-yellow-400" size={32} />,
      delay: "200"
    },
    {
      title: "Future Propulsion",
      description: "Breaking the light barrier while maintaining ecological balance.",
      icon: <Rocket className="text-purple-400" size={32} />,
      delay: "300"
    }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Core Pillars</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">Designed to challenge the brightest minds in engineering, policy, and science.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors border border-white/5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};