import { ChatMessage } from '@/types';

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content: 'Hello! I\'m your NASA Bioscience research assistant. I can help you explore the 608 research papers in our database. Ask me anything about microgravity effects, space biology, model organisms, or specific research findings.',
    timestamp: new Date(Date.now() - 3600000),
  },
];

const responses = {
  technical: [
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
    {
      content: 'A detailed analysis shows that space radiation, particularly high-LET particles, poses a significant threat to the central nervous system, with potential long-term neurodegenerative consequences[4].',
      citations: [
        {
          id: 'cit_004',
          number: 4,
          documentId: 'doc_004',
          documentTitle: 'Impact of Space Radiation on the Central Nervous System',
          authors: ['Wang, F.', 'Chen, L.'],
          year: 2021,
        },
      ],
    },
  ],
  creative: [
    {
      content: 'Imagine our bodies as finely tuned instruments. In space, the music changes. Bones, once strong and resonant, lose their density, like a drum slowly losing its tension. But with the rhythm of exercise, we can help them find their beat again.',
    },
    {
      content: 'The journey to the stars is written in our very cells. Each experiment, each observation, is a new verse in the epic poem of space exploration, telling us not just where we are going, but who we are.',
    },
  ],
  default: [
    {
      content: "I'm sorry, I couldn't find a specific answer to your question. However, I can search the database for related topics. What would you like to know more about?",
    },
    {
      content: "That's an interesting question. While I don't have a direct answer, I can provide general information on space biology. Would you like me to proceed?",
    },
  ],
};

let lastResponseIndexes = {
  technical: -1,
  creative: -1,
  default: -1,
};

export const generateMockResponse = (userQuery: string): ChatMessage => {
  const lowerCaseQuery = userQuery.toLowerCase();
  let responseCategory: 'technical' | 'creative' | 'default' = 'default';

  if (lowerCaseQuery.includes('how') || lowerCaseQuery.includes('what') || lowerCaseQuery.includes('explain')) {
    responseCategory = 'technical';
  } else if (lowerCaseQuery.includes('imagine') || lowerCaseQuery.includes('story') || lowerCaseQuery.includes('inspire')) {
    responseCategory = 'creative';
  }

  const possibleResponses = responses[responseCategory];
  lastResponseIndexes[responseCategory] = (lastResponseIndexes[responseCategory] + 1) % possibleResponses.length;
  const selectedResponse = possibleResponses[lastResponseIndexes[responseCategory]];

  return {
    id: `msg_${Date.now()}`,
    role: 'assistant',
    content: selectedResponse.content,
    citations: 'citations' in selectedResponse ? selectedResponse.citations : undefined,
    timestamp: new Date(),
    isStreaming: false,
  };
};
