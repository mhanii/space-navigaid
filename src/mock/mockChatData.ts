import { ChatMessage, Citation } from '@/types'; // Assuming types are in @/types

const API_BASE_URL = import.meta.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:5468';

/**
 * Parses a string to find and extract citations in the format [cite]title[/cite].
 * @param text The text to parse.
 * @returns An object containing the cleaned text and an array of citation titles.
 */
const parseCitations = (text: string): { cleanedText: string; titles: string[] } => {
  const citationRegex = /\[cite\](.*?)\[\/cite\]/g;
  const titles = new Set<string>();
  let match;

  while ((match = citationRegex.exec(text)) !== null) {
    titles.add(match[1]);
  }

  // Remove citation tags from the text for clean display
  const cleanedText = text.replace(citationRegex, '').trim();
  
  return { cleanedText, titles: Array.from(titles) };
};

/**
 * Fetches and processes a streaming response from the GraphRAG backend.
 *
 * @param prompt The user's query.
 * @param signal An AbortSignal to allow for request cancellation.
 * @returns An async generator that yields the updated content and citations.
 */
export async function* fetchStreamingResponse(
  prompt: string,
  signal: AbortSignal
): AsyncGenerator<{ content: string; citations: Citation[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal,
    });

    if (!response.body) {
      throw new Error('Response body is null.');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = '';
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      
      const chunk = decoder.decode(value, { stream: !done });
      accumulatedText += chunk;

      const { cleanedText, titles } = parseCitations(accumulatedText);

      // Create citations based on the frontend's expected format
      const citations: Citation[] = titles.map((title, index) => ({
        id: `cit_${Date.now()}_${index}`,
        number: index + 1,
        documentId: `doc_${title.replace(/\s+/g, '_')}`, // Create a simple ID
        documentTitle: title,
        // Backend doesn't provide these, so we use placeholders
        authors: ['N/A'], 
        year: new Date().getFullYear(),
        relevantChunk: "Chunk content not available from this endpoint.",
      }));
      
      // Yield the updated content and the extracted citations
      yield { content: cleanedText, citations };
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Stream fetch aborted.');
    } else {
      console.error('Error fetching streaming response:', error);
      yield {
        content: "Sorry, I encountered an error while connecting to the backend. Please try again later.",
        citations: [],
      };
    }
  }
}

/**
 * Your original mock implementation, kept for fallback or testing.
 */
export const generateMockResponse = (userQuery: string): ChatMessage => {
  const responses = [
    {
      content: 'Microgravity exposure leads to significant bone density loss in rodent models[1][2]. Studies show a 12-15% reduction in trabcular bone volume after 30 days in space[1]. However, resistance exercise can mitigate these effects by approximately 40%[3].',
      citations: [
        {
          id: 'cit_001',
          number: 1,
          documentId: 'doc_001',
          documentTitle: 'Skeletal Adaptation to Spaceflight',
          authors: ['Smith, J.', 'Doe, A.'],
          year: 2022,
          relevantChunk: 'Spaceflight mice exhibited a 12.3±2.1% reduction in trabecular bone volume fraction...',
        },
        {
          id: 'cit_002',
          number: 2,
          documentId: 'doc_002',
          documentTitle: 'Long-term Spaceflight Impact on Bone Metabolism',
          authors: ['Johnson, K.'],
          year: 2023,
        },
        {
          id: 'cit_003',
          number: 3,
          documentId: 'doc_003',
          documentTitle: 'Exercise Countermeasures for Space-Induced Osteoporosis',
          authors: ['Lee, M.', 'Park, S.'],
          year: 2024,
        },
      ],
    },
  ];

  return {
    id: `msg_${Date.now()}`,
    role: 'assistant',
    content: responses[0].content,
    citations: responses[0].citations,
    timestamp: new Date(),
    isStreaming: false,
  };
};

// You can also keep your initial messages here
export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content: 'Hello! I\'m your NASA Bioscience research assistant. I can help you explore the 608 research papers in our database. Ask me anything about microgravity effects, space biology, model organisms, or specific research findings.',
    timestamp: new Date(Date.now() - 3600000),
    citations: [],
    isStreaming: false,
  },
];