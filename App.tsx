
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfoGrid } from './components/InfoGrid';
import { Footer } from './components/Footer';
import { RegistrationBadge } from './components/RegistrationBadge';
import { RoleDiscoveryModal } from './components/RoleDiscoveryModal';
import { MythBuster } from './components/MythBuster';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';
import { CommandBar } from './components/CommandBar';
import { ConfirmEmailPage } from './components/ConfirmEmailPage';
import { ApplicationCompletePage } from './components/ApplicationCompletePage';
import { useAuth } from './context/AuthContext';
import { Users } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  // Added 'application-complete' to view state type
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'confirm-email' | 'application-complete'>('landing');
  
  // Modals on top of landing
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  
  // State to track if user was trying to apply before login
  const [pendingApplication, setPendingApplication] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is logged in
        if (pendingApplication) {
          // If they came from "Apply Now", show form immediately
          setView('landing');
          setIsRegistrationOpen(true);
          setPendingApplication(false);
        } else {
          // Default logged in view is dashboard, BUT we respect if view is 'application-complete'
          // Also respect 'confirm-email' if they just verified (though auth logic usually handles this via link redirect)
          if (view !== 'application-complete' && view !== 'confirm-email') {
             setView('dashboard');
          }
        }
      } else {
        // If not logged in, show landing (default)
        // Note: If they were on 'dashboard' or 'application-complete', kick them to 'landing'
        // Also do not kick them if they are on confirm-email
        if (view === 'dashboard' || view === 'application-complete') setView('landing');
      }
    }
  }, [user, loading]);

  // Gatekeeper Logic
  const handleApplyClick = () => {
    if (user) {
      setIsRegistrationOpen(true);
    } else {
      setPendingApplication(true);
      setView('login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-electric-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 1. Confirm Email View
  if (view === 'confirm-email') {
    return <ConfirmEmailPage onBack={() => setView('login')} />;
  }
  
  // 2. Application Complete View (New)
  if (view === 'application-complete') {
    return <ApplicationCompletePage onGoToDashboard={() => setView('dashboard')} />;
  }

  // 3. Login View
  if (view === 'login') {
    return <LoginPage 
        onSuccess={() => {
             // Auth Context listener will handle the redirect logic in useEffect
        }}
        onSignUpSuccess={() => {
             setView('confirm-email');
        }}
        onBack={() => setView('landing')}
    />;
  }

  // 4. Dashboard View
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-space-900 flex flex-col">
        <CommandBar />
        <Dashboard />
      </div>
    );
  }

  // 5. Landing View (Default)
  return (
    <div className="min-h-screen flex flex-col relative">
      {user ? <CommandBar /> : <Navbar onRegister={handleApplyClick} />}
      
      <main className="flex-grow">
        <Hero onRegister={handleApplyClick} onViewPositions={() => setIsRolesOpen(true)} />
        
        <div className="mb-12">
          <MythBuster />
        </div>

        <InfoGrid />

        <section className="py-20 bg-black/40 border-t border-white/5 relative overflow-hidden">
           <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-block p-4 rounded-full bg-white/5 mb-6 animate-pulse">
                <Users size={32} className="text-eco-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Secretariat Reveal
              </h2>
              <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-white font-light tracking-[0.2em] uppercase">
                Coming Soon
              </p>
           </div>
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-electric-500 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-eco-500 rounded-full blur-[100px]"></div>
           </div>
        </section>
      </main>
      
      <Footer />

      {/* Application Wizard */}
      <RegistrationBadge 
        isOpen={isRegistrationOpen} 
        onClose={() => setIsRegistrationOpen(false)} 
        onSuccessRedirect={() => {
            setIsRegistrationOpen(false);
            setView('application-complete');
        }}
      />
      
      <RoleDiscoveryModal 
        isOpen={isRolesOpen}
        onClose={() => setIsRolesOpen(false)}
        onApply={handleApplyClick}
      />
    </div>
  );
};

export default AppContent;
