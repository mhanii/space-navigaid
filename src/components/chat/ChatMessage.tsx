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

  const renderContentWithCitations = (content: string) => {
    if (!message.citations) return content;

    const parts = content.split(/(\[\d+\])/g);
    return parts.map((part, idx) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const num = parseInt(match[1]);
        const citation = message.citations?.find((c) => c.number === num);
        if (citation) {
          return (
            <sup
              key={idx}
              className="citation-link ml-0.5"
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
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        <div className={`flex-1 ${isUser ? 'text-right' : ''}`}>
          <div
            className={`inline-block rounded-lg px-4 py-3 ${
              isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border'
            }`}
          >
            <div className="prose prose-sm max-w-none">
              {isUser ? (
                <p className="m-0">{message.content}</p>
              ) : (
                <div className="m-0">{renderContentWithCitations(message.content)}</div>
              )}
            </div>
          </div>

          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground mb-2">References:</p>
              {message.citations.map((citation) => (
                <div
                  key={citation.id}
                  className="bg-muted/50 rounded p-3 text-sm hover:bg-muted transition-colors cursor-pointer"
                  onClick={() => navigate(`/documents/${citation.documentId}`)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="font-medium text-primary">[{citation.number}]</span>
                      <span className="ml-2">
                        {citation.authors.join(', ')} ({citation.year})
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground ml-2 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 italic">
                    "{citation.documentTitle}"
                  </p>
                  {citation.relevantChunk && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {citation.relevantChunk}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};
