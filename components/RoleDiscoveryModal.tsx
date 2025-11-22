
import React, { useState } from 'react';
import { X, Info, Briefcase, ArrowRight, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface RoleDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

interface Role {
  title: string;
  requiresMunExp: boolean;
  responsibilities: string[];
}

const ROLES: Role[] = [
  // --- MEDIA & MARKETING ---
  { 
    title: "Deputy Head of Media", 
    requiresMunExp: false,
    responsibilities: [
      "Lead the creative direction for SOLVEA’s visual identity.",
      "Manage social media handles (Instagram/LinkedIn), creating high-impact posts, Reels, and stories.",
      "Oversee photography, graphic design, and video editing requirements."
    ]
  },
  { 
    title: "Deputy Head of Marketing", 
    requiresMunExp: false,
    responsibilities: [
      "Develop the \"Master Marketing Plan\": defining how, when, and where to promote the Summit.",
      "Ensure maximum visibility and brand awareness across schools and universities.",
      "Drive engagement strategies to boost registrations."
    ]
  },

  // --- LOGISTICS & OPERATIONS ---
  { 
    title: "Deputy Head of Logistics", 
    requiresMunExp: false,
    responsibilities: [
      "Manage the end-to-end registration database (Delegates & Staff).",
      "Coordinate with the Head of Affairs to ensure seamless delegate onboarding.",
      "Manage official email accounts and communication channels (WhatsApp/Groups).",
      "Oversee venue operations: Tracking delegate attendance and managing Google Meet links for virtual sessions."
    ]
  },

  // --- RESEARCH & ACADEMICS ---
  { 
    title: "Deputy Head of Research", 
    requiresMunExp: false,
    responsibilities: [
      "Spearhead academic research for all competition topics and agendas.",
      "Develop background guides and resource materials for participants.",
      "Ensure factual accuracy and depth in all summit documentation."
    ]
  },

  // --- AFFAIRS & DELEGATE RELATIONS ---
  { 
    title: "Deputy Head of Affairs", 
    requiresMunExp: false,
    responsibilities: [
      "Assist the Head of Affairs in managing stakeholder relations and delegate welfare.",
      "Oversee the response team for participant inquiries."
    ]
  },
  { 
    title: "Affairs Team", 
    requiresMunExp: false,
    responsibilities: [
      "Support the execution of delegate services and registration help-desks."
    ]
  },

  // --- MUN SPECIFIC ROLES ---
  { 
    title: "Committee Directors", 
    requiresMunExp: true,
    responsibilities: [
      "Ensure the smooth academic flow of the MUN committee.",
      "Manage the schedule, agenda, and procedural integrity of sessions.",
      "Resolve academic doubts to ensure a seamless debate experience."
    ]
  },
  { 
    title: "Crisis Directors", 
    requiresMunExp: true,
    responsibilities: [
      "Design and direct dynamic crisis arcs and updates during the MUN.",
      "Manage the \"Backroom\" operations and narrative flow."
    ]
  },
  { 
    title: "Deputy Crisis Directors", 
    requiresMunExp: true,
    responsibilities: [
      "Assist in drafting crisis updates and managing delegate directives."
    ]
  },
  { 
    title: "Head Chair and Co-Chair applications", 
    requiresMunExp: true,
    responsibilities: [
      "Moderate committee sessions and enforce Rules of Procedure.",
      "Facilitate debate and evaluate delegate performance."
    ]
  },
  { 
    title: "MUN Delegate Affairs", 
    requiresMunExp: true,
    responsibilities: [
      "Specialized support for MUN delegates only.",
      "Clarify doubts regarding Rules of Procedure, Study Guides, and Country Matrix allocations."
    ]
  },
];

const RoleCard: React.FC<{ role: Role; index: number; onApply: () => void }> = ({ role, index, onApply }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative flex flex-col rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden min-h-[240px]"
    >
      <AnimatePresence mode="wait">
        {!showDetails ? (
          // --- FRONT VIEW ---
          <motion.div 
            key="front"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-5"
          >
             {/* Tag */}
             <div className="mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                    role.requiresMunExp 
                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                    {role.requiresMunExp ? 'MUN Experience Required' : 'No Experience Required'}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-electric-400 transition-colors leading-tight">
                {role.title}
            </h3>

            <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-white/5">
               <button 
                 onClick={() => setShowDetails(true)}
                 className="text-xs font-medium text-electric-400 hover:text-electric-300 flex items-center gap-1 transition-colors"
               >
                 <Info size={14} />
                 View Scope
               </button>

               <button 
                   onClick={onApply}
                   className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
               >
                   Apply
                   <ArrowRight size={16} className="text-electric-400" />
               </button>
            </div>
          </motion.div>
        ) : (
          // --- DETAILS VIEW ---
          <motion.div 
            key="back"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col h-full p-5 bg-black/40"
          >
            <div className="flex items-start justify-between mb-3">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Responsibilities</h4>
               <button 
                 onClick={() => setShowDetails(false)}
                 className="p-1 -mr-2 -mt-2 text-slate-500 hover:text-white transition-colors"
               >
                 <X size={16} />
               </button>
            </div>

            <ul className="space-y-2 mb-4 flex-grow">
               {role.responsibilities.map((item, idx) => (
                 <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-electric-500 flex-shrink-0"></span>
                    <span>{item}</span>
                 </li>
               ))}
            </ul>

            <div className="mt-auto pt-3 border-t border-white/10">
               <button 
                   onClick={onApply}
                   className="w-full py-2 rounded-lg bg-electric-600/20 border border-electric-500/30 text-electric-200 text-xs font-bold hover:bg-electric-600/40 transition-all"
               >
                   Apply for this Position
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const RoleDiscoveryModal: React.FC<RoleDiscoveryModalProps> = ({ isOpen, onClose, onApply }) => {
  
  const handleApplyClick = () => {
    onClose();
    setTimeout(() => {
        onApply();
    }, 300); 
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-space-900/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-electric-500/20 rounded-lg">
                    <Briefcase className="text-electric-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Open Positions</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-6 custom-scrollbar bg-space-900/50">
              
              {/* Important Note Banner */}
              <div className="mb-8 rounded-xl bg-electric-900/30 border border-electric-500/30 p-4 md:p-6 flex items-start gap-4 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-electric-500/5 animate-pulse-slow pointer-events-none"></div>
                 <div className="flex-shrink-0 mt-1">
                    <Info className="text-electric-400" size={24} />
                 </div>
                 <div>
                    <h3 className="text-electric-200 font-semibold mb-1">Application Guidelines</h3>
                    <p className="text-electric-100/80 text-sm md:text-base leading-relaxed">
                       Note: You can apply for any two positions. No prior MUN experience is required, except for Chair and MUN positions.
                    </p>
                 </div>
              </div>

              {/* Role Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROLES.map((role, index) => (
                  <RoleCard 
                    key={role.title} 
                    role={role} 
                    index={index} 
                    onApply={handleApplyClick} 
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 flex justify-end">
                <Button variant="glass" onClick={onClose}>Close</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
