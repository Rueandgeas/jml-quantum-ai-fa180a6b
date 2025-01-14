import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    contract_address: "",
    dextools_url: "",
    dexscreener_url: "",
  });

  // Check authentication
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You must be logged in to access the admin page",
        variant: "destructive",
      });
    }
  };

  // Fetch current settings
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

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  // Update settings mutation
  const updateSettings = useMutation({
    mutationFn: async (newSettings: typeof formData) => {
      const { data, error } = await supabase
        .from("settings")
        .update(newSettings)
        .eq("id", settings?.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update settings: " + error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-quantum-glow">Admin Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-forest-dark/80 backdrop-blur-lg rounded-lg p-6">
        <div className="space-y-2">
          <label className="text-lg font-medium text-quantum-DEFAULT">Contract Address</label>
          <Input
            name="contract_address"
            value={formData.contract_address}
            onChange={handleChange}
            className="text-lg"
            placeholder="Enter contract address"
          />
        </div>
        <div className="space-y-2">
          <label className="text-lg font-medium text-quantum-DEFAULT">DexTools URL</label>
          <Input
            name="dextools_url"
            value={formData.dextools_url}
            onChange={handleChange}
            className="text-lg"
            placeholder="Enter DexTools URL"
          />
        </div>
        <div className="space-y-2">
          <label className="text-lg font-medium text-quantum-DEFAULT">DexScreener URL</label>
          <Input
            name="dexscreener_url"
            value={formData.dexscreener_url}
            onChange={handleChange}
            className="text-lg"
            placeholder="Enter DexScreener URL"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full text-lg py-6 bg-quantum-DEFAULT hover:bg-quantum-light"
          disabled={updateSettings.isPending}
        >
          {updateSettings.isPending ? "Updating..." : "Update Settings"}
        </Button>
      </form>
    </div>
  );
};

export default Admin;