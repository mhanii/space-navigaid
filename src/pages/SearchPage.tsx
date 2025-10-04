import { useState } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { DocumentCard } from '@/components/search/DocumentCard';
import { mockDocuments } from '@/mock/mockDocuments';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const filteredDocuments = mockDocuments.filter(
    (doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.abstract.toLowerCase().includes(query.toLowerCase()) ||
      doc.authors.some((author) => author.toLowerCase().includes(query.toLowerCase())) ||
      doc.topics.some((topic) => topic.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Search Research Papers</h2>
          <p className="text-muted-foreground">
            Explore 608 NASA bioscience research papers
          </p>
        </div>

        <div className="mb-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredDocuments.length} {filteredDocuments.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        {filteredDocuments.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No papers found matching "{query}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
