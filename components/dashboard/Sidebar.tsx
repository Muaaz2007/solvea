
import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';

interface SidebarProps {
  activeTab: 'profile' | 'inbox' | 'schedule';
  onTabChange: (tab: 'profile' | 'inbox' | 'schedule') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ] as const;

  return (
    <nav className="flex md:flex-col justify-center md:justify-start gap-4 p-4">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`relative group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
            activeTab === item.id 
              ? 'bg-white/10 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] border border-white/10' 
              : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
          }`}
        >
          <item.icon size={20} className={activeTab === item.id ? 'text-electric-400' : 'text-slate-500 group-hover:text-slate-300'} />
          <span className="font-medium text-sm hidden md:block">{item.label}</span>
          
          {/* Active Indicator Dot */}
          {activeTab === item.id && (
            <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-electric-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] hidden md:block"></div>
          )}
        </button>
      ))}
    </nav>
  );
};
