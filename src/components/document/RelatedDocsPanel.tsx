import { useNavigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Chunk } from '@/types';
import { Button } from '@/components/ui/button';

interface RelatedDocsPanelProps {
  chunk: Chunk;
  onClose: () => void;
}

const relationshipIcons = {
  supports: '📊',
  contradicts: '⚡',
  extends: '🔬',
  cites: '📚',
  methodology: '🔧',
};

const relationshipColors = {
  supports: 'text-success',
  contradicts: 'text-error',
  extends: 'text-info',
  cites: 'text-muted-foreground',
  methodology: 'text-warning',
};

export const RelatedDocsPanel = ({ chunk, onClose }: RelatedDocsPanelProps) => {
  const navigate = useNavigate();

  if (chunk.relatedChunks.length === 0) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg">Related Content</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-4">
          {chunk.relatedChunks.map((related, idx) => (
            <div
              key={idx}
              className="bg-muted/30 border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3 mb-3">
                <span className="text-2xl">{relationshipIcons[related.relationshipType]}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1 leading-tight">
                    {related.documentTitle}
                  </h4>
                  <span
                    className={`text-xs font-medium uppercase ${
                      relationshipColors[related.relationshipType]
                    }`}
                  >
                    {related.relationshipType}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3 italic">
                "{related.chunkExcerpt}"
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Relevance: {(related.relevanceScore * 100).toFixed(0)}%
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigate(`/documents/${related.documentId}`);
                    onClose();
                  }}
                  className="group"
                >
                  Jump to document
                  <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
