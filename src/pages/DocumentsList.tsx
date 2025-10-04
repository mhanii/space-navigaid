import { mockDocuments } from '@/mock/mockDocuments';
import { DocumentCard } from '@/components/search/DocumentCard';

const DocumentsList = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Research Documents</h1>
          <p className="text-muted-foreground text-lg">
            Browse all {mockDocuments.length} documents in the NASA bioscience corpus
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDocuments.map((document) => (
            <DocumentCard
              key={document.id}
              document={document}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
