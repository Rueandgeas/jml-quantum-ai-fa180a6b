import React from "react";
import { motion } from "framer-motion";

const CyberpunkGirl = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed left-0 bottom-0 z-20 w-[450px] h-[900px] pointer-events-none"
    >
      <div className="relative w-full h-full">
        {/* Glowing Aura Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-quantum-glow/20 to-transparent rounded-full filter blur-xl"></div>
        </div>

        {/* Cyberpunk Girl Image */}
        <div className="relative w-full h-full flex items-end">
          <img
            src="/lovable-uploads/5da8f7cd-1ebc-47a1-a7d0-070168eb9ded.png"
            alt="Cyberpunk Girl"
            className="w-full object-contain"
            style={{ marginBottom: '-2px' }}
          />
          
          {/* Glowing Circuit Patterns */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum-glow/5 to-quantum-glow/10 mix-blend-overlay"></div>
          
          {/* Glowing Eyes Effect */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-48 h-12">
            <div className="absolute top-0 left-1/4 w-6 h-6 bg-quantum-glow rounded-full filter blur-sm animate-glow"></div>
            <div className="absolute top-0 right-1/4 w-6 h-6 bg-quantum-glow rounded-full filter blur-sm animate-glow"></div>
          </div>
        </div>

        {/* Digital Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum-glow/5 to-quantum-glow/10"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CyberpunkGirl;