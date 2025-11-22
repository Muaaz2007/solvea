
import React from 'react';
import { Globe } from 'lucide-react';

export const Navbar: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-space-900/70 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand Area */}
        <div className="flex items-center gap-3">
          {/* Circular Logo Container */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-black shadow-[0_0_15px_rgba(255,255,255,0.1)] group">
            {/* Primary Image - Expects 'logo.png' in public folder */}
            <img 
              src="/logo.png" 
              alt="Soulweaver Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback logic: Hide broken image, show SVG fallback
                e.currentTarget.style.display = 'none';
                const fallback = document.getElementById('logo-fallback');
                if (fallback) fallback.classList.remove('hidden');
                if (fallback) fallback.classList.add('flex');
              }}
            />
            
            {/* Fallback Icon (Matches the wireframe globe aesthetic of the image) */}
            <div id="logo-fallback" className="hidden absolute inset-0 items-center justify-center bg-space-900 text-white">
               <Globe size={24} strokeWidth={1.5} />
            </div>
          </div>

          {/* Brand Text */}
          <span className="font-bold text-xl tracking-tight text-white">Soulweaver</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Mission</a>
          <a href="#" className="hover:text-white transition-colors">Speakers</a>
          <a href="#" className="hover:text-white transition-colors">Agenda</a>
          <a href="#" className="hover:text-white transition-colors">FAQ</a>
        </div>

        {/* CTA */}
        <button 
          onClick={onRegister}
          className="text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          Join Waitlist
        </button>
      </div>
    </nav>
  );
};
