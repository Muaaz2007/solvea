
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { NebulaBackground } from './NebulaBackground';

interface ConfirmEmailPageProps {
  onBack: () => void;
}

export const ConfirmEmailPage: React.FC<ConfirmEmailPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative font-sans overflow-hidden">
      <NebulaBackground />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(8,145,178,0.2)]">
          
          {/* Animated Icon Container */}
          <div className="relative w-24 h-24 mx-auto mb-8">
             {/* Pulsing Rings */}
             <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-electric-500/50"
             />
             <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-2 rounded-full border border-eco-500/50"
             />
             
             <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full border border-white/10 backdrop-blur-md">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Mail className="text-white w-10 h-10" />
                </motion.div>
             </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Check Your Inbox
          </h2>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Please check your mail to confirm your account and accepted link.
          </p>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-8">
            <p className="text-xs text-slate-500">
               Tip: If you don't see it, check your Spam folder or wait a few minutes for the interstellar transmission to arrive.
            </p>
          </div>

          <button 
            onClick={onBack}
            className="text-sm text-electric-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} />
            Back to Login
          </button>

        </div>
      </motion.div>
    </div>
  );
};
