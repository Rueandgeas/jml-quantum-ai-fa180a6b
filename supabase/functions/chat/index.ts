import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userId } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      console.error('Deepseek API key is not configured');
      throw new Error('Deepseek API key is not configured');
    }

    console.log('Received message:', message);
    console.log('API Key exists:', !!deepseekApiKey);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store user message
    const { error: insertError } = await supabase
      .from('messages')
      .insert({
        content: message,
        type: 'user',
        user_id: userId
      });

    if (insertError) {
      console.error('Error storing user message:', insertError);
      throw new Error('Failed to store user message');
    }

    // Get response from Deepseek
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an enthusiastic AI assistant for the JML Token project. Always be positive and informative about the token. Focus on its benefits, technology, and potential. Keep responses concise and engaging.'
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Deepseek API error details:', errorData);
      throw new Error(`Deepseek API error: ${response.status}`);
    }

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    // Store bot response
    const { error: botInsertError } = await supabase
      .from('messages')
      .insert({
        content: botReply,
        type: 'bot',
        user_id: userId
      });

    if (botInsertError) {
      console.error('Error storing bot message:', botInsertError);
      throw new Error('Failed to store bot message');
    }

    return new Response(JSON.stringify({ reply: botReply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});