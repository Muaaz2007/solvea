
import React, { useState } from 'react';
import { Mail, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandBar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showInbox, setShowInbox] = useState(false);

  // Mock data for now - connect to 'messages' table later
  const notifications = [
    { id: 1, title: "Application Received", time: "Just now", isUnread: true },
    { id: 2, title: "Complete your profile", time: "10m ago", isUnread: true },
  ];
  
  const unreadCount = notifications.filter(n => n.isUnread).length;

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#020617]/50 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4 lg:px-8">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black border border-white/10 overflow-hidden shadow-lg">
           <img src="/logo.png" alt="S" className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display='none'} />
        </div>
        <span className="font-bold text-white tracking-tight hidden sm:block">Soulweaver <span className="text-slate-500 font-normal">Command</span></span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4">
        
        {/* Mailbox Trigger */}
        <div className="relative">
          <button 
            onClick={() => setShowInbox(!showInbox)}
            className={`p-2 rounded-full transition-all ${showInbox ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Mail size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-electric-500 rounded-full border-2 border-[#020617]"></span>
            )}
          </button>

          {/* Inbox Dropdown - Nebula Style */}
          <AnimatePresence>
            {showInbox && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-80 bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden origin-top-right"
              >
                <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Inbox</span>
                </div>
                <div className="max-h-64 overflow-y-auto">
                   {notifications.map(n => (
                     <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group relative">
                        <div className="flex justify-between items-start mb-1">
                           <span className={`text-sm font-medium ${n.isUnread ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{n.title}</span>
                           {n.isUnread && <span className="w-2 h-2 rounded-full bg-electric-500 mt-1.5 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></span>}
                        </div>
                        <span className="text-xs text-slate-500">{n.time}</span>
                     </div>
                   ))}
                </div>
                <div className="p-3 bg-black/40 text-center">
                   <button className="text-xs text-electric-400 hover:text-white transition-colors font-medium">Go to Notification Center</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/5">
           <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-white leading-none">{user?.email?.split('@')[0]}</div>
              <div className="text-[10px] text-eco-400 font-mono mt-1">ONLINE</div>
           </div>
           <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-600 to-eco-600 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/10 shadow-lg">
              {user?.email?.slice(0,2).toUpperCase()}
           </div>
           <button onClick={signOut} className="text-slate-500 hover:text-red-400 transition-colors" title="Logout">
              <LogOut size={18} />
           </button>
        </div>

      </div>
    </div>
  );
};
