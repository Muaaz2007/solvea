
import React, { useState } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { ProfileTab } from './dashboard/ProfileTab';
import { InboxTab } from './dashboard/InboxTab';
import { ScheduleTab } from './dashboard/ScheduleTab';
import { NebulaBackground } from './NebulaBackground';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'inbox' | 'schedule'>('profile');

  return (
    <div className="relative flex flex-col md:flex-row h-[calc(100vh-3.5rem)] mt-14 overflow-hidden">
      <NebulaBackground />
      
      {/* Sidebar */}
      <div className="relative z-10 w-full md:w-64 flex-shrink-0 md:border-r border-white/5 bg-black/20 backdrop-blur-lg h-auto md:h-full">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow overflow-y-auto custom-scrollbar">
        <div className="p-4 md:p-8 min-h-full">
           {activeTab === 'profile' && <ProfileTab />}
           {activeTab === 'inbox' && <InboxTab />}
           {activeTab === 'schedule' && <ScheduleTab />}
        </div>
      </div>
    </div>
  );
};
