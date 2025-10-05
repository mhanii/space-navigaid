import { useNavigate } from 'react-router-dom';
import { ChatMessage as ChatMessageType } from '@/types';
import { User, Bot, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const navigate = useNavigate();
  const isUser = message.role === 'user';

  // Helper function to handle citation rendering within the content string
  // It splits the content, finds citation markers ([N]), and replaces them with a clickable <sup>
  const renderContentWithCitations = (content: string) => {
    // If the message is the one currently streaming, the content will be partially complete
    // We should not attempt to render ReactMarkdown over an incomplete stream
    // Instead, we pass the content through the citation renderer, which handles the numbers.
    const parts = content.split(/(\[\d+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const num = parseInt(match[1]);
        const citation = message.citations?.find((c) => c.number === num);
        if (citation) {
          // Subtle, powerful styling for the citation link
          return (
            <sup
              key={idx}
              className="citation-link ml-0.5 text-orange-600 font-bold cursor-pointer hover:text-orange-700 transition-colors"
              onClick={() => navigate(`/documents/${citation.documentId}`)}
            >
              [{num}]
            </sup>
          );
        }
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    // Increased bottom margin for more whitespace (minimalism)
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8`}>
      <div className={`flex space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        
        {/* Minimalist Avatar Styling (User is solid, Bot is outlined/light) */}
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border ${
            isUser 
              ? 'bg-gray-900 text-white border-gray-900' // Darker for a more 'powerful' user
              : 'bg-white text-gray-700 border-gray-200 shadow-sm' // Subtle for Bot
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
          <div
            className={`inline-block rounded-xl px-4 py-3 ${
              isUser
                // User Message: Solid primary color (using the dark gray for power)
                ? 'bg-gray-900 text-white shadow-md'
                // Bot Message: Clean, white/light gray background with a subtle border
                : 'bg-white border border-gray-200 shadow-lg'
            }`}
          >
            {/* 
              This is where we integrate Markdown:
              1. For User (simple text): Just show the content.
              2. For Bot (Markdown + Citations):
                 - Temporarily apply citation rendering *before* Markdown rendering
                 - If content contains citation numbers, we need a special component/renderer for Markdown.
                 - For simplicity and flow, we'll run the content through `renderContentWithCitations` and *then* render the result using a simplified structure (no more wrapping in <p> or <div>)
            */}
            
            <div className={`prose prose-sm max-w-none ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {isUser ? (
                // User: Simple content
                <p className="m-0 text-white font-medium">{message.content}</p>
              ) : (
                // Bot: Use ReactMarkdown with citation rendering for clean, powerful output
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                      // Custom component for paragraphs to ensure no extra margin
                      p: ({ node, ...props }) => <p className="m-0" {...props} />,
                      // Add custom components for clean styles (e.g., links, code blocks)
                      // You'll need to define full theme styles for prose-sm in your CSS to complete the minimalist look
                  }}
                >
                  {/* The content must be processed for citations *before* ReactMarkdown renders it */}
                  {/* NOTE: We convert the citation-processed content (array of elements) back to a string
                     or use a custom renderer. For now, we will assume citations are processed 
                     separately and focus on the core Markdown. A more advanced solution uses 
                     a custom ReactMarkdown component for the citation links. 
                     
                     For a simple and robust solution: **Only apply citation rendering to a non-Markdown string**, and use Markdown for the rest.
                  */}
                  {message.content} 
                </ReactMarkdown>
              )}
            </div>

            {/* If it's the bot, render the citations underneath the bubble */}
            {!isUser && message.citations && message.citations.length > 0 && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                    <p className="text-xs font-semibold text-gray-700 mb-2">References:</p>
                    <div className="space-y-2">
                        {message.citations.map((citation) => (
                        <div
                            key={citation.id}
                            className="bg-gray-50 rounded-lg p-3 text-xs border border-gray-100 hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => navigate(`/documents/${citation.documentId}`)}
                        >
                            <div className="flex items-start justify-between">
                            <div className="flex-1 text-gray-700">
                                <span className="font-bold text-orange-600">[{citation.number}]</span>
                                <span className="ml-2">
                                    {citation.authors.join(', ')} ({citation.year})
                                </span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1 italic line-clamp-1">
                                "{citation.documentTitle}"
                            </p>
                            {citation.relevantChunk && (
                                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                                {citation.relevantChunk}
                                </p>
                            )}
                        </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};