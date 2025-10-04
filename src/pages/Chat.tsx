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
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />

      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-4xl h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 pb-32">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  AI Research Assistant
                </h1>
                <p className="text-xl text-foreground/80 max-w-2xl">
                  Explora 608 artículos científicos de NASA sobre biociencia espacial
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mt-8">
                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-4 hover:bg-card/90 transition-colors">
                  <p className="text-sm text-muted-foreground">
                    "¿Cómo afecta la microgravedad a la densidad ósea?"
                  </p>
                </div>
                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-4 hover:bg-card/90 transition-colors">
                  <p className="text-sm text-muted-foreground">
                    "Estudios sobre organismos modelo en el espacio"
                  </p>
                </div>
                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-4 hover:bg-card/90 transition-colors">
                  <p className="text-sm text-muted-foreground">
                    "Efectos del vuelo espacial en la biología celular"
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

      <div className="relative z-10">
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
};

export default Chat;
