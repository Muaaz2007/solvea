
import React, { useState } from 'react';
import { Lightbulb, CheckCircle, Wrench, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const InboxTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'earlier'>('today');

  const notifications = {
    today: [
      {
        id: 1,
        title: "Application Received",
        preview: "Your profile has been logged in the SOLVEA mainframe.",
        time: "1h ago",
        icon: CheckCircle,
        color: "text-eco-400",
        bg: "bg-eco-400/10"
      },
      {
        id: 2,
        title: "Secretariat Review Started",
        preview: "The core team is currently reviewing your credentials.",
        time: "3h ago",
        icon: Lightbulb,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10"
      }
    ],
    earlier: [
      {
        id: 3,
        title: "System Maintenance",
        preview: "Scheduled downtime for the portal at 02:00 UTC.",
        time: "1d ago",
        icon: Wrench,
        color: "text-slate-400",
        bg: "bg-slate-400/10"
      }
    ]
  };

  return (
    <div className="flex justify-center w-full pt-8">
       <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_-12px_rgba(124,58,237,0.15)]">
          
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-semibold text-white">Notification Center</h2>
             <button className="text-xs text-slate-400 hover:text-white transition-colors">See All</button>
          </div>

          {/* Segmented Control Tabs */}
          <div className="flex p-1 bg-black/20 rounded-xl mb-6 relative">
             {['today', 'earlier'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'today' | 'earlier')}
                  className={`relative flex-1 py-2 text-sm font-medium capitalize z-10 transition-colors ${activeTab === tab ? 'text-black' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
             ))}
          </div>

          {/* List */}
          <div className="space-y-6">
             {notifications[activeTab].map((item) => (
                <div key={item.id} className="flex items-start gap-4 group cursor-pointer">
                   <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${item.bg} ${item.color} border border-white/5`}>
                      <item.icon size={18} />
                   </div>
                   <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                         <h4 className="text-sm font-semibold text-white group-hover:text-electric-400 transition-colors">{item.title}</h4>
                         <span className="text-[10px] text-slate-500 whitespace-nowrap ml-2">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                         {item.preview}
                      </p>
                   </div>
                </div>
             ))}
             
             {notifications[activeTab].length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                    No notifications to display.
                </div>
             )}
          </div>

       </div>
    </div>
  );
};
