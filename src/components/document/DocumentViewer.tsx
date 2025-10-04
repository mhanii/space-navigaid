import { useState } from 'react';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Document } from '@/types';
import { RelatedDocsPanel } from './RelatedDocsPanel';
import { Button } from '@/components/ui/button';

interface DocumentViewerProps {
  document: Document;
}

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const navigate = useNavigate();
  const [selectedChunkId, setSelectedChunkId] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);

  const selectedChunk = document.sections
    .flatMap((s) => s.chunks)
    .find((c) => c.id === selectedChunkId);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/search')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="paper-text">
          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-4xl font-bold mb-4 font-sans">{document.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {document.authors.join(', ')} ({document.year})
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {document.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-3 py-1 bg-primary-light text-primary text-sm rounded-full font-sans"
                >
                  {topic}
                </span>
              ))}
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 font-sans">Abstract</h2>
            <p className="text-justify">{document.abstract}</p>
          </section>

          {document.sections.map((section) => (
            <section key={section.id} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-border font-sans">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.chunks.map((chunk) => (
                  <p
                    key={chunk.id}
                    className="document-chunk text-justify"
                    onClick={() => setSelectedChunkId(chunk.id)}
                  >
                    {chunk.content}
                    {chunk.relatedChunks.length > 0 && (
                      <span className="ml-2 text-primary text-sm font-sans">🔗</span>
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>
      </div>

      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {selectedChunk && (
        <RelatedDocsPanel
          chunk={selectedChunk}
          onClose={() => setSelectedChunkId(null)}
        />
      )}

      {showChat && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-lg shadow-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Ask about this document</h3>
            <button
              onClick={() => setShowChat(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            You're reading: <span className="font-medium">{document.title}</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Document chat coming soon...
          </div>
        </div>
      )}
    </div>
  );
};
