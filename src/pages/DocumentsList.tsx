import { useState, useEffect } from 'react';
import { DocumentMetadata } from '@/types'; 
import { DocumentCard } from '@/components/search/DocumentCard';
import { Footer } from '@/components/Footer';

// ** Import the mock data for fallback **
import { mockDocuments } from '@/mock/mockDocuments'; // Adjust path as necessary

// Define the API endpoint (adjust the port/domain as necessary)
const API_BASE_URL = 'http://0.0.0.0:5468'; // Adjust as needed

const DocumentsList = () => {
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false); // State to track if mock data is used

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      try {
        const response = await fetch(`${API_BASE_URL}/api/documents`);
        
        if (!response.ok) {
          // Throw an error if the HTTP status is not successful (e.g., 404, 500, network issues)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: DocumentMetadata[] = await response.json();
        setDocuments(data);
        
      } catch (err) {
        console.warn("Failed to fetch documents from the server. Falling back to mock data.", err);
        
        // --- FALLBACK LOGIC: Use imported mock data ---
        setDocuments(mockDocuments);
        setUsingFallback(true);
        // Do not set a visible error, as we successfully loaded content (the mock)
        
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []); 

  // --- Conditional Rendering for a clean UX ---

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-primary">Loading documents...</p>
      </div>
    );
  }
  
  const docCount = documents.length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Research Documents</h1>
          <p className="text-muted-foreground text-lg">
            {docCount > 0 
                ? `Browse all ${docCount} documents in the NASA bioscience corpus`
                : "No documents found in the corpus."
            }
          </p>
          
          {/* Fallback Warning Message */}
          {usingFallback && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              <p className="font-medium">⚠️ Developer Warning: Backend unreachable or failed. Displaying fallback mock data.</p>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentsList;