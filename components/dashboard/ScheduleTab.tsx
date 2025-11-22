
import React from 'react';
import { CalendarClock, Lock } from 'lucide-react';

export const ScheduleTab: React.FC = () => {
  return (
    <div className="flex justify-center w-full pt-8">
      <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center shadow-[0_0_50px_-12px_rgba(124,58,237,0.1)]">
         
         <div className="w-16 h-16 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock size={24} className="text-slate-500" />
         </div>
         
         <h2 className="text-xl font-bold text-white mb-2">Schedule Locked</h2>
         <p className="text-sm text-slate-400 leading-relaxed mb-8">
            Interview slots and event timelines have not been decrypted yet. The Secretariat will notify you via the Inbox when slots open.
         </p>
         
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest">
            <CalendarClock size={12} />
            Decrypting Dec 2025
         </div>
      </div>
    </div>
  );
};
