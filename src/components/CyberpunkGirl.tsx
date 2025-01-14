import React from "react";
import { motion } from "framer-motion";

const CyberpunkGirl = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed left-1/2 bottom-0 -translate-x-1/2 z-20 w-[500px] h-[800px] pointer-events-none"
    >
      <div className="relative w-full h-full">
        {/* Glowing Aura Effect */}
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-radial from-quantum-glow/20 to-transparent rounded-full filter blur-xl"></div>
        </div>

        {/* Cyberpunk Girl Image */}
        <motion.div
          animate={{
            x: [0, 200, 200, -200, -200, 0],
            y: [0, -100, -300, -300, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative w-full h-full"
        >
          <img
            src="/lovable-uploads/4c853cff-a225-4ebf-a08f-4e51a0643c44.png"
            alt="Cyberpunk Girl"
            className="w-full h-full object-contain"
          />
          
          {/* Glowing Circuit Patterns */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum-glow/5 to-quantum-glow/10 mix-blend-overlay"></div>
          
          {/* Glowing Eyes Effect */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-48 h-12">
            <div className="absolute top-0 left-1/4 w-6 h-6 bg-quantum-glow rounded-full filter blur-sm animate-glow"></div>
            <div className="absolute top-0 right-1/4 w-6 h-6 bg-quantum-glow rounded-full filter blur-sm animate-glow"></div>
          </div>
        </motion.div>

        {/* Digital Matrix Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum-glow/5 to-quantum-glow/10"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default CyberpunkGirl;