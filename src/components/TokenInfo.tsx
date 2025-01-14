import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Copy, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TokenInfo: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const { data: settings, isLoading } = useQuery({
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

  const copyToClipboard = async () => {
    if (!settings?.contract_address) return;
    try {
      await navigator.clipboard.writeText(settings.contract_address);
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

  if (isLoading) {
    return <div className="bg-forest-dark/80 backdrop-blur-lg rounded-lg p-6">Loading...</div>;
  }

  if (!settings) {
    return null;
  }

  return (
    <div className="bg-forest-dark/80 backdrop-blur-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-quantum-glow mb-4">Contract Address</h2>
      <div className="flex items-center space-x-2 bg-black/20 p-4 rounded-lg">
        <code className="text-lg md:text-xl text-quantum-DEFAULT flex-1 break-all font-mono">
          {settings.contract_address}
        </code>
        <Button
          variant="ghost"
          size="icon"
          onClick={copyToClipboard}
          className="hover:bg-quantum-DEFAULT/20"
        >
          <Copy className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          variant="outline"
          className="flex-1 bg-forest hover:bg-forest-light text-white text-lg py-6"
          onClick={() => window.open(settings.dextools_url + settings.contract_address, "_blank")}
        >
          <ExternalLink className="mr-2 h-5 w-5" />
          DexTools
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-forest hover:bg-forest-light text-white text-lg py-6"
          onClick={() => window.open(settings.dexscreener_url + settings.contract_address, "_blank")}
        >
          <ExternalLink className="mr-2 h-5 w-5" />
          DexScreener
        </Button>
      </div>
    </div>
  );
};

export default TokenInfo;