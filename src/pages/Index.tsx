import React from "react";
import { Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Particles from "@/components/Particles";
import TokenInfo from "@/components/TokenInfo";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  // This would come from your backend in the next version
  const contractAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  return (
    <div className="min-h-screen bg-forest-dark text-white relative">
      <Particles />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-quantum-glow">JML Token</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-quantum hover:text-quantum-glow hover:bg-forest-dark"
            onClick={() => window.open("https://twitter.com/your-handle", "_blank")}
          >
            <Twitter className="h-6 w-6" />
          </Button>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TokenInfo contractAddress={contractAddress} />
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