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
                documentTitle: 'Space Radiation Effects on DNA Repair Mechanisms',
                chunkId: 'chunk_055',
                chunkExcerpt: 'Our longitudinal analysis of DNA damage response pathways revealed significant alterations in repair fidelity under combined microgravity and radiation exposure...',
                relationshipType: 'supports',
                relevanceScore: 0.92,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_002',
    title: 'Space Radiation Effects on DNA Repair Mechanisms in Human Lymphocytes',
    authors: ['Chen, Wei-Ming', 'Rodriguez, Maria Elena', 'Kim, Sung-Ho'],
    year: 2023,
    abstract: 'Cosmic radiation exposure represents a significant health risk for astronauts during deep space missions. This study examines the effects of galactic cosmic rays (GCR) and solar particle events (SPE) on DNA double-strand break repair pathways in human peripheral blood lymphocytes. Using ground-based particle accelerator simulations, we characterized repair kinetics and fidelity under conditions mimicking Mars mission radiation environments.',
    topics: ['Space Radiation', 'DNA Damage', 'Human Health'],
    organisms: ['Human cells'],
    missions: ['Mars Simulation'],
    sections: [
      {
        id: 'sec_002_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_055',
            content: 'Astronauts on interplanetary missions face chronic exposure to galactic cosmic rays composed of high-energy protons, helium nuclei, and heavy ions. Unlike terrestrial radiation, these high-LET (linear energy transfer) particles cause complex DNA lesions that challenge cellular repair machinery. Understanding radiation-induced genomic instability is essential for risk assessment and countermeasure development.',
            sectionId: 'sec_002_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_003',
    title: 'Arabidopsis Root Growth Orientation in Microgravity: Insights into Plant Gravitropism',
    authors: ['Thompson, Sarah L.', 'Patel, Rajesh K.', 'Nguyen, Linh T.'],
    year: 2021,
    abstract: 'Plant cultivation in space environments requires understanding how microgravity affects fundamental developmental processes. This investigation utilized the Advanced Plant Habitat aboard the ISS to study root gravitropism in Arabidopsis thaliana. High-resolution imaging and transcriptomic analysis revealed novel mechanosensing pathways and auxin redistribution patterns in the absence of gravitational cues.',
    topics: ['Plant Biology', 'Gravitropism', 'Space Agriculture'],
    organisms: ['Arabidopsis'],
    missions: ['ISS Research'],
    sections: [
      {
        id: 'sec_003_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_090',
            content: 'Gravitropism, the directional growth of plant organs in response to gravity, is mediated by specialized cells called statocytes containing dense starch-filled amyloplasts. In microgravity, the absence of sedimentation cues challenges our understanding of how plants sense spatial orientation and maintain organized growth patterns necessary for resource acquisition.',
            sectionId: 'sec_003_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_004',
    title: 'Muscle Atrophy and Proteolysis During Simulated Mars Mission Bed Rest Studies',
    authors: ['Williams, Robert J.', 'Anderson, Emily K.', 'Martinez, Carlos A.'],
    year: 2023,
    abstract: 'Skeletal muscle wasting remains a critical concern for long-duration spaceflight despite current exercise countermeasures. This bed rest study (70 days, 6° head-down tilt) examined muscle protein turnover, myofibrillar protein synthesis rates, and ubiquitin-proteasome system activity in 24 healthy volunteers. Findings reveal the temporal dynamics of muscle loss and identify potential therapeutic targets.',
    topics: ['Muscle Atrophy', 'Protein Metabolism', 'Bed Rest Studies'],
    organisms: ['Human'],
    missions: ['Mars Simulation'],
    sections: [
      {
        id: 'sec_004_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_120',
            content: 'Astronauts experience significant losses in muscle mass and strength during spaceflight, with decrements of 10-20% in lower limb muscles over 6-month missions. Current exercise protocols mitigate but do not prevent atrophy. Understanding the molecular mechanisms driving protein degradation is crucial for developing pharmacological interventions to preserve muscle function.',
            sectionId: 'sec_004_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_005',
    title: 'C. elegans Longevity and Stress Resistance in Space: Implications for Aging Research',
    authors: ['Honda, Yuki', 'Fischer, Anna-Maria', 'Lee, Ji-Won'],
    year: 2022,
    abstract: 'The nematode Caenorhabditis elegans serves as a powerful model for aging and stress biology. This study examined lifespan, healthspan, and stress resistance pathways in C. elegans populations cultured on the ISS for multiple generations. Transcriptomic and proteomic analyses identified alterations in insulin/IGF-1 signaling, oxidative stress responses, and protein homeostasis networks.',
    topics: ['Aging', 'Model Organisms', 'Stress Biology'],
    organisms: ['C. elegans'],
    missions: ['ISS Research'],
    sections: [
      {
        id: 'sec_005_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_150',
            content: 'Microgravity accelerates certain aging phenotypes, making spaceflight an unique natural experiment for gerontology. C. elegans, with its short lifespan (2-3 weeks) and well-characterized aging pathways, enables multi-generational studies impossible with mammalian models. Previous research suggested altered DAF-16/FOXO signaling under spaceflight conditions.',
            sectionId: 'sec_005_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_006',
    title: 'Immune System Dysregulation in Astronauts: Mechanisms and Countermeasures',
    authors: ['Kumar, Vijay', 'Petrov, Dmitri A.', 'O\'Brien, Catherine M.'],
    year: 2024,
    abstract: 'Spaceflight-induced immune dysregulation poses risks for infectious disease and delayed wound healing during missions. This comprehensive review synthesizes findings from shuttle, ISS, and ground-based analog studies, examining alterations in T cell function, natural killer cell activity, cytokine profiles, and viral reactivation patterns. Evidence-based countermeasure strategies are proposed.',
    topics: ['Immunology', 'Human Health', 'Countermeasures'],
    organisms: ['Human'],
    missions: ['ISS Research', 'Space Shuttle'],
    sections: [
      {
        id: 'sec_006_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_180',
            content: 'Astronauts experience multifactorial immune changes during spaceflight, including altered distribution of leukocyte populations, reduced T cell activation responses, and reactivation of latent herpesviruses. These changes result from combined effects of microgravity, radiation, confinement stress, circadian disruption, and altered microbiome composition.',
            sectionId: 'sec_006_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_007',
    title: 'Cardiovascular Adaptation to Prolonged Spaceflight: Cardiac Atrophy and Vascular Remodeling',
    authors: ['Sato, Kenji', 'Hoffmann, Ulrich', 'Leblanc, Adrian D.'],
    year: 2023,
    abstract: 'Cardiovascular deconditioning represents a major physiological challenge for returning astronauts. Using advanced echocardiography, MRI, and arterial tonometry, we characterized cardiac structural and functional changes in 12 astronauts before, during, and after 6-month ISS missions. Findings reveal progressive left ventricular mass reduction, arterial stiffening, and altered cardiac autonomic regulation.',
    topics: ['Cardiovascular Physiology', 'Cardiac Function', 'Spaceflight Adaptation'],
    organisms: ['Human'],
    missions: ['ISS Research'],
    sections: [
      {
        id: 'sec_007_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_210',
            content: 'The cardiovascular system undergoes substantial remodeling in microgravity as the absence of hydrostatic pressure gradients eliminates gravitational blood pooling. This triggers a cascade of adaptations including reduced plasma volume, cardiac atrophy, and arterial stiffening, collectively compromising orthostatic tolerance upon return to Earth gravity.',
            sectionId: 'sec_007_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_008',
    title: 'Microbial Community Dynamics in the International Space Station Built Environment',
    authors: ['Checinska-Sielaff, Aleksandra', 'Singh, Nitin K.', 'Venkateswaran, Kasthuri'],
    year: 2021,
    abstract: 'The closed environment of spacecraft harbors unique microbial ecosystems with implications for crew health and materials degradation. Using metagenomic sequencing, we characterized bacterial and fungal communities across ISS surfaces over 14 months. Results reveal temporal succession patterns, antibiotic resistance gene prevalence, and persistent colonization by potentially opportunistic pathogens requiring enhanced monitoring protocols.',
    topics: ['Microbiology', 'Built Environment', 'Planetary Protection'],
    organisms: ['Bacteria', 'Fungi'],
    missions: ['ISS Research'],
    sections: [
      {
        id: 'sec_008_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_240',
            content: 'Spacecraft represent extreme built environments characterized by recycled air, limited water, material off-gassing, and microgravity effects on microbial behavior. Understanding microbial ecology in these settings is essential for crew health risk assessment, materials preservation, and preventing forward contamination during planetary exploration missions.',
            sectionId: 'sec_008_intro',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
];
