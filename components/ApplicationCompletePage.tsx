
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar } from 'lucide-react';
import { NebulaBackground } from './NebulaBackground';
import { Button } from './Button';

interface ApplicationCompletePageProps {
  onGoToDashboard: () => void;
}

export const ApplicationCompletePage: React.FC<ApplicationCompletePageProps> = ({ onGoToDashboard }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative font-sans overflow-hidden">
      <NebulaBackground />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_-15px_rgba(8,145,178,0.3)]">
          
          {/* Success Icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
             <div className="absolute inset-0 rounded-full border border-green-500/30 animate-[ping_3s_linear_infinite]"></div>
             <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-full border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <CheckCircle className="text-green-400 w-10 h-10" />
             </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">
            Your application has been received!
          </h2>
          
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            We appreciate your interest in joining the Summit of Solvea team. We will review your submission and let you know if you are a selected candidate for the next stage.
          </p>

          <div className="bg-electric-900/20 border border-electric-500/30 rounded-xl p-6 mb-10 text-left flex gap-4">
             <div className="flex-shrink-0 bg-electric-500/20 p-3 rounded-lg h-fit">
                <Calendar className="text-electric-400 w-6 h-6" />
             </div>
             <div>
                <h4 className="text-white font-semibold mb-1">Important Next Step</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                   Please Note: There will be a mandatory interview process after the first round of selection.
                </p>
             </div>
          </div>

          <Button onClick={onGoToDashboard} className="w-full md:w-auto">
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

        </div>
      </motion.div>
    </div>
  );
};
