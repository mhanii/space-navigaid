import { useState } from 'react';
import { SearchBar } from '@/components/search/SearchBar';
import { DocumentCard } from '@/components/search/DocumentCard';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('search', {
        body: { query: searchQuery }
      });

      if (error) {
        console.error('Search error:', error);
        setResults([]);
      } else {
        setResults(data?.results ?? []);
      }
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

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
          <SearchBar value={query} onChange={handleSearch} />
        </div>

        {isSearching && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        )}

        {!isSearching && query && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {results.length} {results.length === 1 ? 'result' : 'results'} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </>
        )}

        {!isSearching && results.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No papers found matching "{query}"
            </p>
          </div>
        )}

        {!query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Enter a search query to find research papers
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
