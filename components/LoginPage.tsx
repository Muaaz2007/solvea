
import React, { useState } from 'react';
import { Rocket, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { NebulaBackground } from './NebulaBackground';
import { useAuth } from '../context/AuthContext';

interface LoginPageProps {
  onSuccess: () => void;
  onSignUpSuccess: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess, onSignUpSuccess, onBack }) => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error, data } = await signUp(email, password);
        if (error) throw error;
        
        // If user exists but no session, email confirmation is required (standard Supabase flow)
        if (data?.user && !data.session) {
            onSignUpSuccess();
        } else {
            // If session exists immediately (auto-confirm enabled), go straight to dashboard
            onSuccess();
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative font-sans">
      <NebulaBackground />

      {/* Top Left Navigation / Home Button */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center pointer-events-none">
        <button 
          onClick={onBack} 
          className="pointer-events-auto flex items-center gap-3 group transition-opacity hover:opacity-100 opacity-90"
          aria-label="Back to Home"
        >
           <div className="w-10 h-10 rounded-full bg-black border border-white/10 overflow-hidden shadow-lg group-hover:shadow-electric-500/20 transition-all flex items-center justify-center">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover" 
                  onError={() => setLogoError(true)} 
                />
              ) : (
                <ArrowLeft size={20} className="text-white" />
              )}
           </div>
           <div className="text-left">
              <span className="block font-bold text-white text-lg leading-tight tracking-tight">Soulweaver</span>
              <span className="text-xs text-slate-400 flex items-center gap-1 group-hover:text-electric-400 transition-colors">
                 <ArrowLeft size={12} /> Back to Home
              </span>
           </div>
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
            opacity: 1, 
            y: [0, -10, 0], 
        }}
        transition={{ 
            opacity: { duration: 0.5 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" } 
        }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Glass Card */}
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(8,145,178,0.2)]">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/10 mb-4 shadow-inner">
                <Rocket className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isSignUp ? "Join the Summit" : "Sign in with email"}
            </h2>
            <p className="text-slate-400 text-sm">
              Make a new future to bring your innovation, diplomacy, and teams together.
            </p>
          </div>

          {error && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-4">
                {/* Email Input */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-slate-500 group-focus-within:text-electric-400 transition-colors" />
                    </div>
                    <input
                        type="email"
                        required
                        className="w-full bg-black/20 border border-white/5 text-white text-sm rounded-xl block pl-11 pr-4 py-3.5 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 focus:ring-4 focus:ring-electric-500/10 transition-all"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={18} className="text-slate-500 group-focus-within:text-electric-400 transition-colors" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full bg-black/20 border border-white/5 text-white text-sm rounded-xl block pl-11 pr-10 py-3.5 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 focus:ring-4 focus:ring-electric-500/10 transition-all"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {!isSignUp && (
                <div className="flex justify-end">
                    <button type="button" className="text-xs text-slate-400 hover:text-white transition-colors">
                        Forgot password?
                    </button>
                </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1e293b] to-[#0f172a] hover:from-electric-900 hover:to-electric-800 border border-white/10 text-white font-medium py-3.5 rounded-xl shadow-lg hover:shadow-electric-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : (isSignUp ? "Get Started" : "Sign In")}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button onClick={() => setIsSignUp(!isSignUp)} className="ml-1 text-white font-medium hover:underline">
                {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
