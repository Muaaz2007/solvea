
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserProfile } from '../../types';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const ProfileTab: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (loading) {
      return <div className="w-full text-center text-slate-500 py-10">Loading profile data...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start w-full pt-8">
       {/* Glass Card Container with Hover Glow Effect */}
       <div className="w-full max-w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(8,145,178,0.2)] transition-all duration-500 hover:border-electric-400/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.3)]">
          
          {/* Banner Image (Nebula Texture) */}
          <div className="h-32 w-full bg-space-900 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-electric-600 via-purple-600 to-eco-500 opacity-60"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
             {/* Top Right Action Button */}
             <div className="absolute top-4 right-4">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1 transition-all cursor-not-allowed opacity-70">
                    Edit Locked <Plus size={12} />
                </button>
             </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 pb-8 relative">
             
             {/* Avatar - Overlapping */}
             <div className="flex justify-center -mt-12 mb-4">
                <div className="p-1.5 rounded-full bg-gradient-to-tr from-electric-400 via-white/50 to-eco-400 shadow-lg">
                    <div className="w-24 h-24 rounded-full bg-space-900 border-4 border-[#0a0f1d] flex items-center justify-center overflow-hidden relative">
                        {/* Placeholder Avatar if no image */}
                         <div className="text-2xl font-bold text-white z-10">{profile?.full_name ? profile.full_name.charAt(0) : user?.email?.slice(0,2).toUpperCase()}</div>
                         <div className="absolute inset-0 bg-gradient-to-br from-electric-900 to-space-900"></div>
                    </div>
                </div>
             </div>

             {/* Text Info */}
             <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-white mb-1">{profile?.full_name || "Candidate"}</h2>
                <p className="text-sm text-slate-400 leading-relaxed max-w-[80%] mx-auto">
                   Candidate | {profile?.role_preference_1 || "Role Pending"}
                </p>
                {/* Status Indicator */}
                <div className="mt-3 flex justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">
                            {profile?.application_status?.replace('_', ' ') || "Under Review"}
                        </span>
                    </div>
                </div>
             </div>

             {/* Stats Row */}
             <div className="grid grid-cols-3 gap-2 bg-black/20 rounded-2xl p-4 border border-white/5">
                <div className="text-center border-r border-white/5">
                    <div className="text-sm font-bold text-white">Step 2</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">Stage</div>
                </div>
                <div className="text-center border-r border-white/5">
                    <div className="text-sm font-bold text-white">{profile?.role_preference_1 ? '100%' : '0%'}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">Profile</div>
                </div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-white truncate px-1">{profile?.role_preference_1?.split(' ').pop() || "General"}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">Team</div>
                </div>
             </div>

             {/* Social/Contact Row (Bottom) */}
             <div className="mt-6 flex justify-center gap-6 border-t border-white/5 pt-4">
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </button>
                <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </button>
             </div>

          </div>
       </div>
    </div>
  );
};
