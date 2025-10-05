import { useState, useRef, useEffect } from 'react';
// 💡 IMPORTANT: This component needs to be updated to use a Markdown renderer
import { ChatMessage as ChatMessageComponent } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { fetchStreamingResponse } from '@/mock/mockChatData';
import { ChatMessage as ChatMessageType } from '@/types';
import { Sparkles } from 'lucide-react';
import { Footer } from '@/components/Footer';

// A conceptual component for the "Generating" state with a shimmer effect.
// Note: 'animate-pulse' is used as a simple stand-in for a full shimmer effect.
const GeneratingMessage = () => (
  <div className="flex items-start space-x-3 p-4 md:p-6 bg-gray-50 rounded-xl border border-gray-100 max-w-[80%] mt-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
      <Sparkles className="w-4 h-4 text-gray-500" />
    </div>
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSend = async (content: string) => {
    abortControllerRef.current?.abort();
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;

    const userMessage: ChatMessageType = {
      id: `msg_user_${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const assistantMessagePlaceholder: ChatMessageType = {
      id: `msg_assistant_${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
      citations: [],
    };
    
    setMessages((prev) => [...prev, userMessage, assistantMessagePlaceholder]);
    setIsLoading(true);

    try {
      const stream = fetchStreamingResponse(content, newAbortController.signal);

      for await (const update of stream) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessagePlaceholder.id
              ? { ...msg, content: update.content, citations: update.citations }
              : msg
          )
        );
      }
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Stream aborted');
        } else {
            console.error('An error occurred during streaming:', error);
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessagePlaceholder.id
                  ? { ...msg, content: "Sorry, I couldn't get a response. Please try again.", isStreaming: false }
                  : msg
              )
            );
        }
    } finally {
      setIsLoading(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessagePlaceholder.id
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      abortControllerRef.current = null;
    }
  };

  const assistantPlaceholderId = messages.find(m => m.role === 'assistant' && m.isStreaming)?.id;

  return (
    // Pushing minimalism: pure white background
    <div className="h-screen flex flex-col relative bg-white">
      <div className="relative z-10 flex-1 overflow-y-auto px-4 md:px-0 pt-16 md:pt-16">
        <div className="container mx-auto max-w-4xl h-full flex flex-col">
          {messages.length === 0 ? (
            // Initial Welcome Screen: Impactful and minimalist
            <div className="flex-1 flex flex-col items-center text-center space-y-4 md:space-y-8">
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 px-4">
                
                {/* Icon: Simple and clean */}
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 border border-gray-200">
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-gray-700" />
                </div>

                {/* Title: Impactful, high-contrast, yet clean */}
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900 leading-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">AI</span> Research Assistant
                  </h1>
                  {/* Subtitle: More subtle and integrated */}
                  <p className="text-base md:text-lg text-gray-500 max-w-3xl px-4 font-light">
                    Explora 608 artículos científicos de NASA sobre biociencia espacial
                  </p>
                </div>
              </div>
              
              {/* Suggestion Chips: Minimalist */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl pb-6 md:pb-12 px-4 w-full">
                <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 cursor-pointer hover:bg-gray-50 transition-colors text-left">
                  <p className="text-sm font-medium text-gray-700">
                    "¿Cómo afecta la <span className="underline decoration-1 underline-offset-2">microgravedad</span> a la <span className="underline decoration-1 underline-offset-2">densidad ósea</span>?"
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 cursor-pointer hover:bg-gray-50 transition-colors text-left">
                  <p className="text-sm font-medium text-gray-700">
                    "Estudios sobre <span className="underline decoration-1 underline-offset-2">organismos modelo</span> en el espacio"
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 cursor-pointer hover:bg-gray-50 transition-colors text-left">
                  <p className="text-sm font-medium text-gray-700">
                    "Efectos del <span className="underline decoration-1 underline-offset-2">vuelo espacial</span> en la <span className="underline decoration-1 underline-offset-2">biología celular</span>"
                  </p>
                </div>
              </div>

              {/* Input for Welcome Screen */}
              <div className="w-full max-w-4xl pb-16 md:pb-24 px-4">
                <ChatInput onSend={handleSend} disabled={isLoading} />
              </div>
            </div>
          ) : (
            // Chat View
            <div className="space-y-4 pb-20">
              {messages.map((message) => {
                // Renders the actual message when it's not the streaming assistant placeholder
                if (message.id !== assistantPlaceholderId) {
                  return <ChatMessageComponent key={message.id} message={message} />;
                }
                // Renders the GeneratingMessage component *instead* of the streaming placeholder
                return null;
              })}
              
              {/* Conditional Rendering of the Shimmer/Generating message */}
              {assistantPlaceholderId && <GeneratingMessage />}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Persistent Input Bar: Clean, separate, and grounded */}
      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-20 w-full bg-white pt-4 pb-6 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.08)] border-t border-gray-100">
          <div className="container mx-auto max-w-4xl px-4">
            <ChatInput onSend={handleSend} disabled={isLoading} />
          </div>
        </div>
      )}

      {messages.length === 0 && <Footer />}
    </div>
  );
};

export default Chat;