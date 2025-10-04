import { ChatMessage } from '@/types';

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content: 'Hello! I\'m your NASA Bioscience research assistant. I can help you explore the 608 research papers in our database. Ask me anything about microgravity effects, space biology, model organisms, or specific research findings.',
    timestamp: new Date(Date.now() - 3600000),
  },
];

export const generateMockResponse = (userQuery: string): ChatMessage => {
  const responses = [
    {
      content: 'Microgravity exposure leads to significant bone density loss in rodent models[1][2]. Studies show a 12-15% reduction in trabecular bone volume after 30 days in space[1]. However, resistance exercise can mitigate these effects by approximately 40%[3].',
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
