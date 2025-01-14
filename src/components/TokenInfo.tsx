import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Copy, ExternalLink } from "lucide-react";

interface TokenInfoProps {
  contractAddress: string;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ contractAddress }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy contract address",
        variant: "destructive",
      });
    }
  };

  const getDexToolsLink = () => {
    return `https://www.dextools.io/app/en/ether/pair-explorer/${contractAddress}`;
  };

  const getDexScreenerLink = () => {
    return `https://dexscreener.com/ethereum/${contractAddress}`;
  };

  return (
    <div className="bg-forest-dark/80 backdrop-blur-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-quantum-glow mb-4">Contract Address</h2>
      <div className="flex items-center space-x-2 bg-black/20 p-3 rounded-lg">
        <code className="text-sm text-quantum-DEFAULT flex-1 break-all">
          {contractAddress}
        </code>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="hover:bg-quantum-DEFAULT/20"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          variant="outline"
          className="flex-1 bg-forest hover:bg-forest-light text-white"
          onClick={() => window.open(getDexToolsLink(), "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          DexTools
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-forest hover:bg-forest-light text-white"
          onClick={() => window.open(getDexScreenerLink(), "_blank")}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          DexScreener
        </Button>
      </div>
    </div>
  );
};

export default TokenInfo;