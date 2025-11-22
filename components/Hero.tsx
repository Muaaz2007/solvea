
import React from 'react';
import { Button } from './Button';
import { ArrowRight, Users } from 'lucide-react';

interface HeroProps {
  onRegister: () => void;
  onViewPositions: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRegister, onViewPositions }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-eco-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none mask-gradient"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* Badge/Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-electric-300 uppercase">Team Recruitment Open</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
          JOIN THE TEAM OF <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 via-eco-400 to-electric-400 bg-[length:200%_auto] animate-shimmer">
            SOLVEA
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Be part of the Core Secretariat. Shape the future of diplomacy, sustainability, and innovation. 
          We are looking for visionaries to lead the next summit.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onRegister} className="w-full sm:w-auto group">
            Apply Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" onClick={onViewPositions} className="w-full sm:w-auto">
            <Users className="mr-2 w-4 h-4" />
            View Positions
          </Button>
        </div>

        {/* Social Proof / Trust */}
        <div className="mt-24 pt-10 border-t border-white/5">
           <p className="text-sm text-slate-500 mb-6 uppercase tracking-widest">Collaborating With</p>
           <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-bold font-serif">AERO<span className="font-light">SPACE</span></span>
              <span className="text-xl font-bold tracking-tighter">NOVA.LABS</span>
              <span className="text-xl font-black italic">ORBITAL</span>
              <span className="text-xl font-semibold">Eco<span className="text-eco-500">Systems</span></span>
           </div>
        </div>

      </div>
    </section>
  );
};
