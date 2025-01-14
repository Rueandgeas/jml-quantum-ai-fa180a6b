import React from "react";
import { motion } from "framer-motion";

const CyberBees = () => {
  // Create an array of bees with different animation paths
  const bees = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    initialX: Math.random() * window.innerWidth,
    initialY: Math.random() * window.innerHeight,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {bees.map((bee) => (
        <motion.div
          key={bee.id}
          initial={{ 
            x: bee.initialX, 
            y: bee.initialY, 
            scale: 0.8,
            rotate: Math.random() * 360 
          }}
          animate={{
            x: [bee.initialX, bee.initialX + 100, bee.initialX - 100, bee.initialX],
            y: [bee.initialY, bee.initialY - 50, bee.initialY + 50, bee.initialY],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
        >
          <div className="relative w-12 h-12">
            <img 
              src="/lovable-uploads/449af55a-2ce2-4740-8d13-c7a7f6cbebcf.png"
              alt="Cyber Bee"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-quantum-glow/20 blur-sm rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CyberBees;