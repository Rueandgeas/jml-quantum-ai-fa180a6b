import React from "react";
import { Twitter, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";
import TokenInfo from "@/components/TokenInfo";
import ChatBot from "@/components/ChatBot";
import { motion } from "framer-motion";
import CyberBees from "@/components/CyberBees";
import CyberpunkGirl from "@/components/CyberpunkGirl";
import CyberpunkGirlMirror from "@/components/CyberpunkGirlMirror";

const Index = () => {
  const contractAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  return (
    <div className="min-h-screen bg-forest-dark text-white relative overflow-hidden">
      <Particles />
      <CyberBees />
      <CyberpunkGirl />
      <CyberpunkGirlMirror />
      
      {/* AI Agent Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="relative group">
          <div className="w-16 h-16 rounded-full bg-quantum-glow/10 flex items-center justify-center animate-pulse cursor-pointer overflow-hidden border-2 border-quantum-glow">
            <img 
              src="/lovable-uploads/159cf220-572e-4887-8355-ef9bbff3dec3.png" 
              alt="AI Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform">
            <div className="bg-quantum-glow text-forest-dark text-xs px-2 py-1 rounded whitespace-nowrap">
              Quantum AI Assistant
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Flying Bot */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed top-1/4 left-10 z-20 opacity-60"
      >
        <div className="relative">
          <Bot className="w-8 h-8 text-quantum-glow" />
          <div className="absolute -bottom-2 w-8 h-1 bg-quantum-glow/20 rounded-full blur-sm animate-pulse" />
        </div>
      </motion.div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-quantum-glow">JML Token</h1>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TokenInfo contractAddress={contractAddress} />
            
            {/* Social Links */}
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full bg-forest hover:bg-forest-light text-white"
                onClick={() => window.open("https://twitter.com/your-handle", "_blank")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Follow on Twitter
              </Button>
            </div>
          </div>
          <div>
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;