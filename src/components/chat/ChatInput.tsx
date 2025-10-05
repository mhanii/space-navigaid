import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Removed unnecessary padding here, relying on the parent div's padding
    <div className="w-full">
      <div className="flex items-center space-x-2 w-full">
        {/* 
          Textarea: Cleaner border, focus ring, and background
          NOTE: You will need to ensure your Textarea component in '@/components/ui/textarea'
          renders an input with these styles for the full effect.
        */}
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about microgravity effects, bone density studies, model organisms..."
          className="min-h-[48px] max-h-[48px] md:text-sm text-xs resize-none rounded-full py-3 
                     bg-white border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 shadow-sm"
          disabled={disabled}
        />
        {/* 
          Send Button: High-contrast but simple primary color (using the accent orange) 
        */}
        <Button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="h-[48px] w-[48px] rounded-full p-0 shrink-0 
                     bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:text-gray-500 transition-colors"
        >
          <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
        </Button>
      </div>
    </div>
  );
};