// Core document types
export interface Document {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: string;
  sections: Section[];
  topics: string[];
  organisms: string[];
  missions: string[];
}

export interface Section {
  id: string;
  title: string;
  chunks: Chunk[];
}

export interface Chunk {
  id: string;
  content: string;
  sectionId: string;
  relatedChunks: RelatedChunk[];
}

export interface RelatedChunk {
  documentId: string;
  documentTitle: string;
  chunkId: string;
  chunkExcerpt: string;
  relationshipType: 'supports' | 'contradicts' | 'extends' | 'cites' | 'methodology';
  relevanceScore: number;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: Citation[];
  isStreaming?: boolean;
}

export interface Citation {
  id: string;
  number: number;
  documentId: string;
  documentTitle: string;
  authors: string[];
  year: number;
  relevantChunk?: string;
}

// Dashboard types
export interface CorpusStats {
  totalPapers: number;
  totalAuthors: number;
  totalFindings: number;
  dateRange: { start: string; end: string };
  topTopics: Array<{ topic: string; count: number }>;
  organisms: Array<{ name: string; count: number }>;
  missions: Array<{ name: string; papers: number }>;
  knowledgeGaps: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  documentRelations: Array<{
    type: 'contradiction' | 'complementation' | 'analogy';
    title: string;
    description: string;
    documents: string[];
  }>;
  publicationsByYear: Array<{ year: number; count: number }>;
}

// Graph types
export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  properties: Record<string, any>;
  documentIds: string[];
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  properties?: Record<string, any>;
}

// Search types
export interface SearchFilters {
  yearRange?: [number, number];
  authors?: string[];
  topics?: string[];
  organisms?: string[];
  missions?: string[];
}

export interface SearchResult {
  document: Document;
  relevanceScore: number;
  highlightedExcerpt: string;
}
