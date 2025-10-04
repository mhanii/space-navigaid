import { Document } from '@/types';

export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    title: 'Skeletal Adaptation to Spaceflight: Microgravity Effects on Bone Density in Murine Models',
    authors: ['Smith, Jennifer A.', 'Doe, Alexander R.', 'Johnson, Michael K.'],
    year: 2022,
    abstract: 'This comprehensive study investigates the biomechanical and cellular adaptations of skeletal tissue in response to prolonged microgravity exposure. Using a cohort of 60 adult C57BL/6 mice aboard the International Space Station for 30-day missions, we quantified bone mineral density changes, trabecular architecture alterations, and osteoblast-osteoclast activity profiles.',
    topics: ['Microgravity Effects', 'Bone Density', 'Animal Models'],
    organisms: ['Mice'],
    missions: ['ISS Research'],
    sections: [
      {
        id: 'sec_001_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_001',
            content: 'Microgravity environments present unique physiological challenges for mammalian organisms. Previous studies have documented significant skeletal deterioration during spaceflight, with astronauts experiencing bone density losses of 1-2% per month in weight-bearing bones. Understanding the cellular mechanisms underlying this adaptation is critical for developing effective countermeasures for long-duration space missions.',
            sectionId: 'sec_001_intro',
            relatedChunks: [
              {
                documentId: 'doc_002',
                documentTitle: 'Long-term Spaceflight Impact on Bone Metabolism',
                chunkId: 'chunk_055',
                chunkExcerpt: 'Our longitudinal analysis of astronaut bone density over 6-month ISS missions revealed consistent trabecular bone loss patterns, particularly in the lumbar spine and femoral neck...',
                relationshipType: 'supports',
                relevanceScore: 0.92,
              },
              {
                documentId: 'doc_003',
                documentTitle: 'Exercise Countermeasures for Space-Induced Osteoporosis',
                chunkId: 'chunk_078',
                chunkExcerpt: 'Resistance exercise protocols implemented during spaceflight demonstrated a 40% reduction in bone density loss compared to control groups...',
                relationshipType: 'extends',
                relevanceScore: 0.85,
              },
            ],
          },
          {
            id: 'chunk_002',
            content: 'The cellular basis of microgravity-induced bone loss involves complex interactions between mechanical loading, hormonal regulation, and osteocyte mechanosensing pathways. Recent advances in space-based research have enabled real-time monitoring of bone remodeling processes, providing unprecedented insights into adaptation mechanisms.',
            sectionId: 'sec_001_intro',
            relatedChunks: [
              {
                documentId: 'doc_004',
                documentTitle: 'Mechanotransduction in Osteocytes Under Altered Gravity',
                chunkId: 'chunk_112',
                chunkExcerpt: 'Osteocyte lacunar-canalicular networks exhibit reduced fluid flow in microgravity, disrupting mechanosensing pathways critical for bone homeostasis...',
                relationshipType: 'methodology',
                relevanceScore: 0.88,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_001_methods',
        title: 'Methods',
        chunks: [
          {
            id: 'chunk_003',
            content: 'We utilized a randomized controlled design with 60 male C57BL/6 mice (age: 16 weeks, weight: 25±2g) divided into spaceflight (n=30) and ground control (n=30) groups. The spaceflight cohort was housed in NASA Animal Enclosure Modules aboard the ISS for 30 days, with environmental conditions maintained at 22±1°C, 50±10% humidity, and a 12:12 hour light-dark cycle.',
            sectionId: 'sec_001_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_004',
            content: 'Bone mineral density measurements were conducted using micro-computed tomography (μCT) at 18μm resolution. Trabecular bone volume fraction (BV/TV), trabecular thickness (Tb.Th), trabecular number (Tb.N), and trabecular separation (Tb.Sp) were quantified in the distal femur metaphysis.',
            sectionId: 'sec_001_methods',
            relatedChunks: [
              {
                documentId: 'doc_005',
                documentTitle: 'Advanced Imaging Techniques for Space Biology',
                chunkId: 'chunk_203',
                chunkExcerpt: 'High-resolution μCT imaging protocols optimized for spaceflight specimens require specialized calibration to account for tissue preservation artifacts...',
                relationshipType: 'methodology',
                relevanceScore: 0.79,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_001_results',
        title: 'Results',
        chunks: [
          {
            id: 'chunk_005',
            content: 'Spaceflight mice exhibited a 12.3±2.1% reduction in trabecular bone volume fraction compared to ground controls (p<0.001). This was accompanied by significant decreases in trabecular thickness (-8.7±1.5%, p<0.01) and trabecular number (-6.2±1.3%, p<0.01), with a corresponding increase in trabecular separation (+15.4±2.8%, p<0.001).',
            sectionId: 'sec_001_results',
            relatedChunks: [
              {
                documentId: 'doc_002',
                documentTitle: 'Long-term Spaceflight Impact on Bone Metabolism',
                chunkId: 'chunk_056',
                chunkExcerpt: 'Human astronauts showed comparable trabecular bone loss rates (1.5% per month), validating murine models as appropriate analogs for human spaceflight research...',
                relationshipType: 'supports',
                relevanceScore: 0.94,
              },
            ],
          },
          {
            id: 'chunk_006',
            content: 'Histomorphometric analysis revealed a 45% increase in osteoclast surface area and a 32% decrease in osteoblast surface area in spaceflight specimens. This imbalance in bone remodeling favoring resorption over formation was confirmed by serum biomarker analysis showing elevated CTX-I (collagen type I C-telopeptide) and decreased P1NP (procollagen type I N-terminal propeptide).',
            sectionId: 'sec_001_results',
            relatedChunks: [],
          },
        ],
      },
      {
        id: 'sec_001_discussion',
        title: 'Discussion',
        chunks: [
          {
            id: 'chunk_007',
            content: 'Our findings demonstrate substantial skeletal deterioration in mice exposed to 30 days of microgravity, consistent with previous spaceflight studies. The magnitude of bone loss observed in our murine model approximates the monthly bone density losses reported in astronauts, validating the translational relevance of these findings.',
            sectionId: 'sec_001_discussion',
            relatedChunks: [
              {
                documentId: 'doc_003',
                documentTitle: 'Exercise Countermeasures for Space-Induced Osteoporosis',
                chunkId: 'chunk_079',
                chunkExcerpt: 'Translation of murine exercise protocols to human spaceflight countermeasures has shown promising results in preserving bone density...',
                relationshipType: 'extends',
                relevanceScore: 0.87,
              },
            ],
          },
          {
            id: 'chunk_008',
            content: 'The cellular mechanisms underlying microgravity-induced bone loss involve disrupted mechanotransduction signaling, altered fluid shear stress in the lacunar-canalicular network, and dysregulated osteocyte-osteoclast communication. Future research should focus on pharmacological interventions targeting these specific pathways to mitigate skeletal deterioration during long-duration space missions.',
            sectionId: 'sec_001_discussion',
            relatedChunks: [
              {
                documentId: 'doc_006',
                documentTitle: 'Sclerostin Inhibition as a Bone Loss Countermeasure',
                chunkId: 'chunk_289',
                chunkExcerpt: 'Anti-sclerostin antibody treatment in spaceflight rodents prevented 80% of trabecular bone loss, suggesting a promising therapeutic avenue...',
                relationshipType: 'extends',
                relevanceScore: 0.91,
              },
            ],
          },
        ],
      },
    ],
  },
];
