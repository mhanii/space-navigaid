// src/components/search/DocumentCard.tsx

import { useNavigate } from 'react-router-dom';
// IMPORT THE NEW TYPE (or rename your current 'Document' to 'DocumentMetadata' for this component)
import { DocumentMetadata } from '@/types'; 
import { FileText, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- CHANGE 1: Use DocumentMetadata in the interface ---
interface DocumentCardProps {
  document: DocumentMetadata; // <-- CHANGED from Document
  excerpt?: string;
}

export const DocumentCard = ({ document, excerpt }: DocumentCardProps) => {
  const navigate = useNavigate();
  
  // Destructure for cleaner access (optional, but good practice)
  const { title, authors, year, abstract, topics, id } = document;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all hover:-translate-y-1">
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-tight">
        {title} {/* Used destructured title */}
      </h3>

      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center">
          <Users className="w-3 h-3 mr-1" />
          {/* Used destructured authors */}
          {authors[0]} {authors.length > 1 && `et al.`} 
        </span>
        <span className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          {year} {/* Used destructured year */}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
        {excerpt || abstract} {/* Used destructured abstract (which holds the summary) */}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 bg-primary-light text-primary text-xs rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(`/documents/${id}`)}
        className="w-full group"
      >
        <FileText className="w-4 h-4 mr-2" />
        View Full Paper
        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </Button>
    </div>
  );
};