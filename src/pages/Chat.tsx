import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { generateMockResponse } from '@/mock/mockChatData';
import { ChatMessage as ChatMessageType } from '@/types';
import { Sparkles } from 'lucide-react';
import backgroundImage from '@/assets/mesh-gradient.png';

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateMockResponse(content);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div 
      className="h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-4xl h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center text-center space-y-6">
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(251,146,60,0.5)]">
                    AI Research Assistant
                  </h1>
                  <p className="text-base font-semibold text-foreground/80 max-w-2xl">
                    Explora 608 artículos científicos de NASA sobre biociencia espacial
                  </p>
                </div>
              </div>
              
              <div className="w-full max-w-4xl pb-8">
                <ChatInput onSend={handleSend} disabled={isLoading} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl pb-8">
                <div className="bg-white/10 backdrop-blur-lg border-2 border-white rounded-lg p-4 hover:backdrop-blur-xl transition-all text-center">
                  <p className="text-sm font-bold text-foreground/90">
                    "¿Cómo afecta la <span className="underline">microgravedad</span> a la <span className="underline">densidad ósea</span>?"
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border-2 border-white rounded-lg p-4 hover:backdrop-blur-xl transition-all text-center">
                  <p className="text-sm font-bold text-foreground/90">
                    "Estudios sobre <span className="underline">organismos modelo</span> en el espacio"
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg border-2 border-white rounded-lg p-4 hover:backdrop-blur-xl transition-all text-center">
                  <p className="text-sm font-bold text-foreground/90">
                    "Efectos del <span className="underline">vuelo espacial</span> en la <span className="underline">biología celular</span>"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-6">
                  <div className="bg-card/90 backdrop-blur-md border border-border rounded-lg px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {messages.length > 0 && (
        <div className="relative z-10">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Chat;
