import React, { useRef } from "react";
import { Twitter, Bot, MessageCircle, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";
import TokenInfo from "@/components/TokenInfo";
import ChatBot from "@/components/ChatBot";
import { motion } from "framer-motion";
import CyberBees from "@/components/CyberBees";
import CyberpunkGirl from "@/components/CyberpunkGirl";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

const Index = () => {
  const messageRef = useRef<HTMLDivElement>(null);
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const scrollToMessage = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-forest-dark text-white relative overflow-hidden">
      <Particles />
      <CyberBees />
      <CyberpunkGirl />
      
      {/* Scroll Down Button */}
      <motion.button
        onClick={scrollToMessage}
        className="fixed bottom-8 right-8 z-50 bg-quantum-glow/20 p-3 rounded-full hover:bg-quantum-glow/40 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowDown className="w-6 h-6 text-quantum-glow animate-bounce" />
      </motion.button>
      
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
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-quantum-glow">JML Token</h1>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TokenInfo />
            
            {/* Social Links */}
            <div className="mt-4 space-y-4">
              <Button
                variant="outline"
                className="w-full bg-forest hover:bg-forest-light text-white"
                onClick={() => window.open("https://x.com/J7ML8o9b5mE0Zcg", "_blank")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Follow on Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full bg-forest hover:bg-forest-light text-white"
                onClick={() => window.open("https://t.me/Jmlquantumai", "_blank")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Telegram
              </Button>
            </div>
          </div>
          <div>
            <ChatBot />
          </div>
        </div>
      </div>

      {/* Message Section */}
      <div ref={messageRef} className="min-h-screen bg-forest-dark/90 relative z-10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-quantum-glow mb-8 text-center">
              Join the Quantum Revolution
            </h2>
            <div className="bg-forest/40 backdrop-blur-lg rounded-lg p-8">
              <p className="text-lg text-white/90 mb-6">
                JML Token represents the future of quantum computing in the blockchain space. 
                Our mission is to bridge the gap between quantum mechanics and decentralized technologies, 
                creating a new paradigm in the crypto ecosystem.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-forest-dark/60 p-6 rounded-lg">
                  <h3 className="text-quantum-glow font-bold mb-2">Innovation</h3>
                  <p className="text-sm text-white/80">
                    Leading the way in quantum-inspired blockchain solutions
                  </p>
                </div>
                <div className="bg-forest-dark/60 p-6 rounded-lg">
                  <h3 className="text-quantum-glow font-bold mb-2">Community</h3>
                  <p className="text-sm text-white/80">
                    Building a strong, engaged community of quantum enthusiasts
                  </p>
                </div>
                <div className="bg-forest-dark/60 p-6 rounded-lg">
                  <h3 className="text-quantum-glow font-bold mb-2">Future</h3>
                  <p className="text-sm text-white/80">
                    Shaping the future of decentralized quantum computing
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;