
import React from 'react';
import { motion } from 'framer-motion';

export const NebulaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-space-900 pointer-events-none">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#020617]"></div>

      {/* Animated Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-electric-900/30 rounded-full blur-[120px] mix-blend-screen"
      />
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-eco-900/20 rounded-full blur-[120px] mix-blend-screen"
      />

      <motion.div 
         animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 mask-gradient"></div>
    </div>
  );
};
