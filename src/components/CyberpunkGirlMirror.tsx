import React from "react";
import { motion } from "framer-motion";

const CyberpunkGirlMirror = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute right-0 bottom-0 z-20 w-[400px] pointer-events-none"
      style={{ marginBottom: '-2px' }}
    >
      <div className="relative w-full">
        {/* Glowing Aura Effect */}
        <div className="absolute inset-0 animate-pulse">
          <div className="absolute inset-0 bg-gradient-radial from-quantum-glow/20 to-transparent rounded-full filter blur-xl"></div>
        </div>

        {/* Cyberpunk Girl Image */}
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full flex items-end"
        >
          <img
            src="/lovable-uploads/c5463234-6c5f-4859-8901-20a378fe65eb.png"
            alt="Cyberpunk Girl Mirror"
            className="w-full h-auto object-contain"
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

export default CyberpunkGirlMirror;