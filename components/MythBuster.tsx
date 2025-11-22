import React from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';

export const MythBuster: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 -mt-8 relative z-20">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border border-yellow-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(234,179,8,0.15)]">
        
        {/* Animated warning stripes background */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent 100%)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <div className="flex-shrink-0 bg-yellow-500/20 p-4 rounded-full animate-pulse">
            <AlertTriangle className="text-yellow-400 w-8 h-8" />
          </div>
          
          <div className="flex-grow">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
              SOLVEA IS <span className="text-yellow-400">NOT</span> JUST AN MUN
            </h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              It is a platform where <span className="text-white font-semibold">Innovation, Diplomacy, Creativity, and Sustainability</span> come together. 
              If you do not have an MUN background, <span className="text-electric-400 font-bold underline decoration-electric-400/50 underline-offset-4">YOU ARE WELCOMED TO APPLY</span>.
            </p>
            <div className="mt-3 text-xs font-mono text-slate-500 bg-black/30 inline-block px-3 py-1 rounded border border-white/5">
              * MUN background only required for Chair/Director positions.
            </div>
          </div>

          <div className="hidden md:block">
             <Sparkles className="text-yellow-400/50 w-12 h-12 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
