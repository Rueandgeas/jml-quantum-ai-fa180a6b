import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  type: "user" | "bot";
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    type: "bot",
    content: "Hello! I'm your JML Quantum AI Agent. How can I help you today?",
  }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { type: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add a temporary "typing" message
    setMessages((prev) => [...prev, { type: "bot", content: "▋" }]);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: input }
      });

      if (error) throw error;

      // Remove the typing indicator and add the actual response
      setMessages((prev) => {
        const withoutTyping = prev.slice(0, -1); // Remove typing indicator
        return [...withoutTyping, {
          type: "bot" as const,
          content: data.reply,
        }];
      });
    } catch (error) {
      console.error('Chat error:', error);
      // Remove typing indicator in case of error
      setMessages((prev) => prev.slice(0, -1));
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-forest-dark/80 backdrop-blur-lg rounded-lg p-6 h-[500px] flex flex-col">
      <h2 className="text-2xl font-bold text-quantum-glow mb-4">JML Quantum AI Agent</h2>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.type === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === "user"
                    ? "bg-quantum-DEFAULT"
                    : "bg-quantum-glow"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4 text-forest-dark" />
                ) : (
                  <Bot className="w-4 h-4 text-forest-dark" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.type === "user"
                    ? "bg-quantum-DEFAULT/20"
                    : "bg-quantum-glow/20"
                } ${message.content === "▋" ? "animate-pulse" : ""}`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex gap-2 mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask me anything..."
          className="bg-black/20 border-forest-light"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend} 
          className="bg-quantum hover:bg-quantum-glow"
          disabled={isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;