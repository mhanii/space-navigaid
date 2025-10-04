import { useParams } from 'react-router-dom';
import { DocumentViewer } from '@/components/document/DocumentViewer';
import { mockDocuments } from '@/mock/mockDocuments';
import { Footer } from '@/components/Footer';

const Documents = () => {
  const { id } = useParams();
  const document = mockDocuments.find((d) => d.id === id) || mockDocuments[0];

  return (
    <>
      <DocumentViewer document={document} />
      <Footer />
    </>
  );
};

export default Documents;
