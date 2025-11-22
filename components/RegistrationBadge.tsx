
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Upload, FileText, ShieldCheck, Check, Plus } from 'lucide-react';
import { RegistrationFormData } from '../types';
import { submitRegistration } from '../services/registrationService';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface RegistrationBadgeProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessRedirect: () => void;
}

const ROLE_OPTIONS = [
  "Deputy Head of Media",
  "Deputy Head of Logistics",
  "Deputy Head of Research",
  "Deputy Head of Marketing",
  "Deputy Head of Affairs",
  "Affairs Team",
  "Committee Directors",
  "Crisis Directors",
  "Deputy Crisis Directors",
  "Head Chair and Co-Chair applications",
  "MUN Delegate Affairs"
];

const STEPS = [
  { id: 'intro', label: "Welcome" },
  { id: 'fullName', label: "What is your full name?", type: 'text', placeholder: "e.g. Sarah Connor" },
  { id: 'email', label: "Confirm your email address", type: 'email', placeholder: "name@example.com", disabled: true },
  { id: 'phone', label: "Preferred mobile number?", type: 'tel', placeholder: "+1 234 567 890" },
  { id: 'school', label: "School/University Name?", type: 'text', placeholder: "Institute Name" },
  { id: 'age', label: "How old are you?", type: 'number', placeholder: "Age" },
  { id: 'roles', label: "Select Role Preference 1 & 2", type: 'select-multi' },
  { id: 'skills', label: "List your Skills", type: 'tags', placeholder: "Type and press Enter (e.g. Leadership)" },
  { id: 'pastExperience', label: "Past experiences (Prior competitions/roles)", type: 'textarea', placeholder: "Organized X event, Led Y team..." },
  { id: 'awards', label: "List awards/achievements", type: 'textarea', placeholder: "Best Delegate 2024, etc..." },
  { id: 'whyJoin', label: "Why do you want to join?", type: 'textarea', placeholder: "Motivation..." },
  { id: 'cvFile', label: "CV Upload (COMPULSORY)", type: 'file' },
  { id: 'consent', label: "Final Consent", type: 'checkbox' },
];

export const RegistrationBadge: React.FC<RegistrationBadgeProps> = ({ isOpen, onClose, onSuccessRedirect }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    school: '',
    age: '',
    rolePreference1: '',
    rolePreference2: '',
    skills: [],
    pastExperience: '',
    awards: '',
    whyJoin: '',
    cvFile: null,
    agreeToTerms: false
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setCurrentStep(1);
      setFileName(null);
      setTagInput('');
      
      // Auto-fill email from Auth Context
      setFormData(prev => ({
        ...prev,
        email: user?.email || ''
      }));
    }
  }, [isOpen, user]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      rolePreference1: selectedRoles[0] || '',
      rolePreference2: selectedRoles[1] || ''
    }));
  }, [selectedRoles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(prev => prev.filter(r => r !== role));
    } else {
      if (selectedRoles.length < 2) {
        setSelectedRoles(prev => [...prev, role]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, cvFile: file }));
      setFileName(file.name);
    }
  };

  // Tag Input Logic
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
        e.preventDefault();
        const newTag = tagInput.trim();
        if (!formData.skills.includes(newTag)) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newTag]
            }));
        }
        setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
        ...prev,
        skills: prev.skills.filter(tag => tag !== tagToRemove)
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(c => c + 1);
      setTagInput(''); // Reset tag input on step change
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(c => c - 1);
      setTagInput('');
    }
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) return;
    if (!formData.cvFile) {
        alert("CV Upload is compulsory.");
        return;
    }
    setIsSubmitting(true);
    
    const success = await submitRegistration(formData, user?.id);
    
    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        onSuccessRedirect();
      }, 1500);
    }
    setIsSubmitting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && STEPS[currentStep].type !== 'textarea' && STEPS[currentStep].type !== 'tags') {
      e.preventDefault();
      nextStep();
    }
  };

  // Animation Variants
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const strapVariants: Variants = {
    hidden: { y: '-100vh', rotate: 0 },
    visible: { 
      y: 0, 
      rotate: [1.5, -1.5, 1.5],
      transition: { 
        y: { type: "spring", stiffness: 40, damping: 15, mass: 1 },
        rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
      }
    },
    exit: { y: '-100vh', transition: { duration: 0.5, ease: "easeIn" } }
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "circOut" }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "circIn" }
    })
  };

  const currentStepData = STEPS[currentStep];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === STEPS.length - 1;

  // Validation for Next Button
  const canProceed = () => {
      if (isLastStep) {
          return formData.agreeToTerms && formData.cvFile !== null;
      }
      if (currentStepData.id === 'cvFile') {
          return formData.cvFile !== null;
      }
      return true;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[60] flex items-start justify-center bg-space-900/95 backdrop-blur-md overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[70] p-2 text-white/50 hover:text-white transition-colors bg-black/40 rounded-full backdrop-blur-md border border-white/10"
          >
            <X size={24} />
          </button>

          <motion.div 
            className="relative w-full max-w-md flex flex-col items-center origin-top my-2"
            variants={strapVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
             {/* Lanyard Strap */}
             <div className="relative flex flex-col items-center z-10 w-full flex-shrink-0 -mb-6">
                <div className="w-12 h-[120px] bg-electric-600 shadow-2xl flex justify-center overflow-hidden relative border-x border-white/10 rounded-b-sm">
                   <div className="absolute inset-0 opacity-40 mix-blend-multiply" 
                        style={{ 
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, #000 2px, #000 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, #000 2px, #000 4px)`,
                          backgroundSize: '8px 8px' 
                        }}>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                   <span className="absolute bottom-8 -rotate-90 text-[10px] font-bold tracking-[0.2em] text-white/90 whitespace-nowrap opacity-80 drop-shadow-md z-10">
                     SOLVEA ID
                   </span>
                </div>
                <div className="w-16 h-10 border-[5px] border-slate-400 rounded-b-2xl bg-slate-800/90 z-10 relative -mt-2 shadow-xl flex items-center justify-center">
                   <div className="w-10 h-1 bg-black/50 rounded-full"></div>
                </div>
             </div>

             {/* Badge Card */}
             <div className="relative w-full px-4 perspective-1000 z-20 mt-2">
               <div className="mx-auto w-24 h-8 bg-[#0a0a0f] rounded-t-xl border-x border-t border-white/10 flex justify-center items-end pb-2 relative shadow-lg">
                  <div className="w-10 h-1.5 bg-black rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"></div>
               </div>

               <motion.div 
                 className="relative w-full bg-[#0a0a0f] rounded-b-3xl rounded-t-sm shadow-[0_0_60px_rgba(0,0,0,1)] border border-white/10 transform-style-preserve-3d min-h-[500px] flex flex-col"
                 initial={false}
                 animate={{ rotateY: isSuccess ? 180 : 0 }}
                 transition={{ duration: 0.8, ease: "easeInOut" }}
               >
                 {/* FRONT FACE */}
                 <div 
                    className="absolute inset-0 z-10 bg-[#0a0a0f] rounded-b-3xl flex flex-col overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                 >
                    <div className="p-6 pb-0 text-center z-20">
                      <h2 className="text-xl font-bold text-white tracking-tight">Complete Profile</h2>
                      <div className="flex items-center justify-center gap-2 mt-2">
                         <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                               className="h-full bg-electric-500" 
                               initial={{ width: 0 }}
                               animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                            />
                         </div>
                         <span className="text-[10px] text-slate-400 font-mono">{currentStep}/{STEPS.length - 1}</span>
                      </div>
                    </div>

                    <div className="flex-grow relative overflow-hidden flex items-center justify-center p-6">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div 
                                key={currentStep}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                            >
                                <label className="block text-lg md:text-xl font-medium text-white mb-4 text-center leading-snug">
                                    {currentStepData.label}
                                </label>

                                <div className="w-full">
                                    {['text', 'email', 'tel', 'number'].includes(currentStepData.type) && (
                                        <input 
                                            autoFocus
                                            disabled={currentStepData.disabled}
                                            type={currentStepData.type}
                                            name={currentStepData.id}
                                            placeholder={currentStepData.placeholder}
                                            className={`w-full px-4 py-4 text-lg rounded-xl glass-input text-center placeholder:text-slate-600 ${currentStepData.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            value={(formData as any)[currentStepData.id]}
                                            onChange={handleChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                    )}

                                    {currentStepData.type === 'textarea' && (
                                        <textarea 
                                            autoFocus
                                            name={currentStepData.id}
                                            placeholder={currentStepData.placeholder}
                                            rows={5}
                                            className="w-full px-4 py-3 text-base rounded-xl glass-input resize-none placeholder:text-slate-600"
                                            value={(formData as any)[currentStepData.id]}
                                            onChange={handleChange}
                                        />
                                    )}

                                    {currentStepData.type === 'tags' && (
                                        <div className="w-full">
                                            <div className="relative">
                                                <input 
                                                    autoFocus
                                                    type="text"
                                                    placeholder={currentStepData.placeholder}
                                                    className="w-full px-4 py-3 pr-10 text-base rounded-xl glass-input placeholder:text-slate-600"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={handleTagKeyDown}
                                                />
                                                <button 
                                                    onClick={() => {
                                                        if(tagInput.trim()) {
                                                            const newTag = tagInput.trim();
                                                            if (!formData.skills.includes(newTag)) {
                                                                setFormData(prev => ({ ...prev, skills: [...prev.skills, newTag] }));
                                                            }
                                                            setTagInput('');
                                                        }
                                                    }}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-electric-600/20 text-electric-400 rounded-lg hover:bg-electric-600 hover:text-white transition-colors"
                                                >
                                                    <Plus size={18} />
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-3 max-h-[200px] overflow-y-auto">
                                                {formData.skills.map((tag, idx) => (
                                                    <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm text-slate-200">
                                                        {tag}
                                                        <button onClick={() => removeTag(tag)} className="text-slate-500 hover:text-red-400 ml-1">
                                                            <X size={14} />
                                                        </button>
                                                    </span>
                                                ))}
                                                {formData.skills.length === 0 && (
                                                    <p className="text-xs text-slate-500 w-full text-center mt-2 italic">No items added yet.</p>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.type === 'select-multi' && (
                                        <div className="flex flex-col h-full max-h-[290px]">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto custom-scrollbar pr-2 flex-grow">
                                                {ROLE_OPTIONS.map((role) => {
                                                    const isSelected = selectedRoles.includes(role);
                                                    const isMun = role.includes("MUN") || role.includes("Chair") || role.includes("Director");
                                                    return (
                                                        <motion.div
                                                            key={role}
                                                            onClick={() => handleRoleToggle(role)}
                                                            whileTap={{ scale: 0.95 }}
                                                            whileHover={{ 
                                                              scale: isSelected ? 1.02 : 1.01,
                                                              backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.08)'
                                                            }}
                                                            animate={{
                                                                borderColor: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                                                                backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.03)',
                                                                scale: isSelected ? 1.02 : 1,
                                                                boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.3)' : '0 0 0 rgba(0,0,0,0)'
                                                            }}
                                                            transition={{ duration: 0.2 }}
                                                            className="relative p-3 rounded-xl border cursor-pointer group flex items-center gap-3"
                                                        >
                                                            <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                                                isSelected ? 'bg-electric-500 border-electric-500' : 'border-slate-500 group-hover:border-slate-400'
                                                            }`}>
                                                                {isSelected && <Check size={12} className="text-white" />}
                                                            </div>
                                                            <div className="flex-grow min-w-0">
                                                                <span className={`text-xs sm:text-sm font-medium block leading-tight truncate ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                                                                    {role}
                                                                </span>
                                                                {isMun ? (
                                                                    <span className="text-[10px] text-orange-400 font-mono mt-0.5 block opacity-80">MUN Exp. Req.</span>
                                                                ) : (
                                                                    <span className="text-[10px] text-eco-400 font-mono mt-0.5 block opacity-80">No Exp. Req.</span>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.type === 'file' && (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:bg-white/5 hover:border-eco-500 transition-all group bg-black/20">
                                            <div className="flex flex-col items-center justify-center pt-3 pb-3 px-2 text-center">
                                                {fileName ? (
                                                    <div className="flex flex-col items-center gap-2 text-eco-400 animate-pulse">
                                                        <FileText size={32} />
                                                        <p className="text-sm font-medium truncate max-w-[200px]">{fileName}</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-eco-400 mb-2 transition-colors" />
                                                        <p className="text-sm text-slate-400">Tap to upload PDF/Image</p>
                                                    </>
                                                )}
                                            </div>
                                            <input type="file" name="attachment" className="hidden" accept=".pdf,.jpg,.png,.jpeg" onChange={handleFileChange} />
                                        </label>
                                    )}

                                    {currentStepData.type === 'checkbox' && (
                                        <div 
                                            className="flex flex-col items-center justify-center gap-4 p-6 bg-white/5 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                                            onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${formData.agreeToTerms ? 'bg-eco-500 text-black' : 'bg-black border border-slate-600 text-transparent'}`}>
                                                <ShieldCheck size={24} />
                                            </div>
                                            <p className="text-sm text-slate-300 text-center leading-relaxed">
                                                I consent to my information being shared and that the interview is being done on my interest towards solvea and i am willing to contribute.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="p-6 pt-0 mt-auto flex gap-3 z-20">
                         {!isFirstStep && (
                             <button 
                                onClick={prevStep}
                                className="px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                             >
                                <ArrowLeft size={20} />
                             </button>
                         )}
                         
                         <Button 
                            onClick={nextStep} 
                            className="flex-grow h-12 text-base"
                            isLoading={isSubmitting}
                            disabled={!canProceed()}
                         >
                            {isLastStep ? "Complete Application" : "Next Step"}
                            {!isLastStep && <ArrowRight className="ml-2 w-4 h-4" />}
                         </Button>
                    </div>
                 </div>

                 {/* BACK FACE (Success) */}
                 <div 
                   className="absolute inset-0 h-full w-full bg-[#0a0a0f] rounded-b-3xl z-20 flex flex-col items-center justify-center p-8 text-center"
                   style={{ 
                     transform: 'rotateY(180deg)',
                     backfaceVisibility: 'hidden'
                   }}
                 >
                   <div className="absolute inset-0 bg-gradient-to-br from-space-900 via-slate-900/50 to-electric-900/20 pointer-events-none rounded-b-3xl"></div>
                   <div className="relative z-10 w-full flex flex-col items-center">
                     <motion.div 
                       className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]"
                       initial={{ scale: 0 }}
                       animate={isSuccess ? { scale: 1 } : { scale: 0 }}
                       transition={{ delay: 0.4, type: "spring" }}
                     >
                       <CheckCircle size={48} className="text-green-400" />
                     </motion.div>
                     <h3 className="text-2xl font-bold text-white mb-2">Submission Successful</h3>
                     <p className="text-slate-400 text-sm mb-8 max-w-[240px] mx-auto leading-relaxed">
                       Finalizing application...
                     </p>
                   </div>
                 </div>
               </motion.div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
