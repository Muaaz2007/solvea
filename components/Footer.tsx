import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 bg-black/20">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm mb-4">
          &copy; 2025 The Summit of Solvea. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 text-xs text-slate-600">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Code of Conduct</a>
        </div>
      </div>
    </footer>
  );
};