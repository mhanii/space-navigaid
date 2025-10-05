import { Document } from '@/types';

export const mockDocuments: Document[] = [
  {
    id: 'doc_001',
    title: 'Skeletal Adaptation to Spaceflight: Microgravity Effects on Bone Density and Remodeling Kinetics in Murine Models',
    authors: ['Smith, Jennifer A.', 'Doe, Alexander R.', 'Johnson, Michael K.', 'Wu, Lei', 'García, Sofia M.'],
    year: 2022,
    abstract: 'This comprehensive study investigates the biomechanical and cellular adaptations of skeletal tissue in response to prolonged microgravity exposure. Using a cohort of 60 adult C57BL/6 mice aboard the International Space Station for 30-day missions, we quantified bone mineral density changes, trabecular architecture alterations, and osteoblast-osteoclast activity profiles using micro-computed tomography and dynamic histomorphometry. The results reveal a rapid, formation-suppressed bone loss mechanism, underscoring the severity of skeletal deconditioning in space and identifying key molecular targets for countermeasure development.',
    topics: ['Microgravity Effects', 'Bone Density', 'Animal Models', 'Skeletal Remodeling'],
    organisms: ['Mice'],
    missions: ['ISS Research', 'SpaceX CRS-25'],
    sections: [
      {
        id: 'sec_001_intro',
        title: 'Introduction and Background',
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
          {
            id: 'chunk_002',
            content: 'Specifically, the loss of mechanical loading shifts the bone remodeling balance towards increased resorption by osteoclasts and decreased formation by osteoblasts. Murine models provide an essential platform for investigating these rapid cellular changes due to their conserved skeletal response to altered gravity and the availability of genetic tools. The primary objective of this study was to quantify the differential impact of 30-day spaceflight on cancellous and cortical bone structure in the femur and tibia, and to correlate structural changes with remodeling kinetics.',
            sectionId: 'sec_001_intro',
            relatedChunks: [
              {
                documentId: 'doc_004',
                documentTitle: 'Muscle Atrophy and Proteolysis During Simulated Mars Mission Bed Rest Studies',
                chunkId: 'chunk_120',
                chunkExcerpt: 'Astronauts experience significant losses in muscle mass and strength during spaceflight, with decrements of 10-20% in lower limb muscles over 6-month missions...',
                relationshipType: 'contradicts',
                relevanceScore: 0.88,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_001_methods',
        title: 'Materials and Methods',
        chunks: [
          {
            id: 'chunk_003',
            content: '**Animal Cohort and Spaceflight Logistics.** A total of 60 12-week-old male C57BL/6 mice were randomly divided into three groups: Spaceflight (SF, n=20), Ground Control (GC, n=20), and Vivarium Control (VC, n=20). The SF group was housed in specialized Animal Habitat Cages (AHCs) and launched aboard SpaceX CRS-25 to the ISS. The mission duration was precisely 30 days, after which the mice were euthanized post-landing (R+4 hours) for immediate tissue collection according to approved institutional animal care protocols.',
            sectionId: 'sec_001_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_004',
            content: '**Micro-Computed Tomography (microCT) Analysis.** Post-dissection, the right tibiae were fixed in 10% neutral buffered formalin and analyzed using a SkyScan 1272 microCT system. Standardized regions of interest (ROI) were defined in the proximal metaphysis for trabecular bone analysis (BV/TV, Tb.N, Tb.Th, Tb.Sp) and in the mid-diaphysis for cortical bone analysis (Cortical Thickness, Area Fraction). Imaging was performed at 50 kVp and 200 µA, with an isotropic voxel size of 8 µm.',
            sectionId: 'sec_001_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_005',
            content: '**Histomorphometry and Cellular Staining.** The left tibiae underwent undecalcified processing. Standard bone histomorphometry was performed on 5 µm sections stained with Goldner’s Trichrome to measure bone formation rate (BFR/BS, derived from double calcein labeling), osteoblast surface (Ob.S/BS), and osteoclast surface (Oc.S/BS). Tartrate-Resistant Acid Phosphatase (TRAP) staining was used to specifically identify and quantify osteoclast populations on trabecular surfaces.',
            sectionId: 'sec_001_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_006',
            content: '**Gene Expression Analysis (RNA-Seq).** Total RNA was extracted from flash-frozen distal femoral metaphyses. Libraries were prepared using the TruSeq RNA library preparation kit and sequenced on an Illumina NovaSeq 6000 platform. Differential gene expression analysis was conducted using the DESeq2 package in R, with a false discovery rate (FDR) adjusted P-value < 0.05 considered significant.',
            sectionId: 'sec_001_methods',
            relatedChunks: [],
          },
        ],
      },
      {
        id: 'sec_001_results',
        title: 'Results',
        chunks: [
          {
            id: 'chunk_007',
            content: '**Trabecular Bone Loss Quantification.** MicroCT analysis revealed a highly significant reduction in trabecular bone volume fraction (BV/TV) in the SF group (4.2 ± 0.8%) compared to the GC group (11.5 ± 1.2%, P < 0.001). This loss was primarily driven by a decrease in trabecular number (Tb.N, -52%) and an increase in trabecular separation (Tb.Sp, +68%), indicating structural degradation rather than simple thinning. No significant changes were observed in cortical thickness or porosity at the mid-diaphysis.',
            sectionId: 'sec_001_results',
            relatedChunks: [],
          },
          {
            id: 'chunk_008',
            content: '**Altered Bone Remodeling Markers.** Histomorphometry confirmed a substantial remodeling imbalance. The osteoblast surface (Ob.S/BS) in the SF group was reduced by 65% compared to GC mice (P < 0.01), coupled with a 90% decrease in the bone formation rate (BFR/BS), indicating a near-cessation of new bone synthesis. Conversely, the osteoclast surface (Oc.S/BS) was elevated by 45%, suggesting a dual mechanism of inhibited formation and accelerated resorption drives the rapid bone loss observed in the weight-bearing bones.',
            sectionId: 'sec_001_results',
            relatedChunks: [
              {
                documentId: 'doc_005',
                documentTitle: 'C. elegans Longevity and Stress Resistance in Space: Implications for Aging Research',
                chunkId: 'chunk_150',
                chunkExcerpt: 'Microgravity accelerates certain aging phenotypes, making spaceflight an unique natural experiment for gerontology...',
                relationshipType: 'supports',
                relevanceScore: 0.75,
              },
            ],
          },
          {
            id: 'chunk_009',
            content: '**Gene Expression Profiling.** RNA sequencing of bone marrow-derived stromal cells (BMSCs) showed significant downregulation of key osteogenic markers (Runx2, Osteocalcin, Alp) and upregulation of pro-resorptive factors (RANKL/OPG ratio increased by 3.1-fold). The Wnt/$\beta$-catenin signaling pathway, critical for osteoblast differentiation, showed reduced transcript levels for Lrp5 and $\beta$-catenin, suggesting this pathway is suppressed by the microgravity environment.',
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
            id: 'chunk_010',
            content: 'The 30-day spaceflight mission resulted in dramatic and rapid degradation of trabecular bone in the load-bearing long bones of C57BL/6 mice, mirroring the skeletal deconditioning reported in human astronauts. The absence of a similar change in cortical bone suggests that the microgravity-induced mechanical unloading effect is disproportionately detrimental to metabolically active, high-turnover bone compartments, consistent with disuse osteoporosis mechanisms. The observed structural changes are similar to those seen in hindlimb unloading models, but appear more rapid and severe.',
            sectionId: 'sec_001_discussion',
            relatedChunks: [],
          },
          {
            id: 'chunk_011',
            content: 'The histomorphometric findings strongly support the hypothesis that spaceflight bone loss is a result of a fundamental uncoupling of bone remodeling, characterized by a severe suppression of osteoblast function that outweighs the moderate increase in osteoclast activity. This uncoupled state is distinct from post-menopausal osteoporosis, which is primarily driven by excessive resorption, highlighting the unique pathology of microgravity-induced bone loss and the need for pathway-specific therapeutic approaches.',
            sectionId: 'sec_001_discussion',
            relatedChunks: [],
          },
          {
            id: 'chunk_012',
            content: 'Future research should focus on targeted pharmacological interventions, such as sclerostin inhibitors or intermittent parathyroid hormone (PTH) administration, specifically designed to reactivate the suppressed osteoblast lineage during space missions. Furthermore, combining these agents with optimized exercise regimes may provide the necessary countermeasure efficacy for long-duration human missions to Mars and beyond, where gravitational recovery is not an immediate option.',
            sectionId: 'sec_001_discussion',
            relatedChunks: [
              {
                documentId: 'doc_006',
                documentTitle: 'Immune System Dysregulation in Astronauts: Mechanisms and Countermeasures',
                chunkId: 'chunk_180',
                chunkExcerpt: 'Astronauts experience multifactorial immune changes during spaceflight, including altered distribution of leukocyte populations...',
                relationshipType: 'supports',
                relevanceScore: 0.65,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_001_conclusion',
        title: 'Conclusion',
        chunks: [
          {
            id: 'chunk_013',
            content: 'In conclusion, 30 days of microgravity induced significant trabecular bone loss in mice, driven primarily by severe suppression of bone formation coupled with a moderate increase in resorption. These data underscore the need for advanced, multi-modal countermeasure strategies targeting the core regulatory pathways of osteogenesis to ensure astronaut skeletal health on deep space missions. The Wnt/$\beta$-catenin pathway remains a promising therapeutic target.',
            sectionId: 'sec_001_conclusion',
            relatedChunks: [],
          },
        ],
      },
    ],
  },
  {
    id: 'doc_002',
    title: 'Space Radiation Effects on DNA Repair Mechanisms in Human Lymphocytes: Kinetics and Fidelity under Simulated Galactic Cosmic Ray Exposure',
    authors: ['Chen, Wei-Ming', 'Rodriguez, Maria Elena', 'Kim, Sung-Ho', 'Jablonski, Piotr', 'Wang, Xuan'],
    year: 2023,
    abstract: 'Cosmic radiation exposure represents a significant health risk for astronauts during deep space missions. This study examines the effects of galactic cosmic rays (GCR) and solar particle events (SPE) on DNA double-strand break (DSB) repair pathways in human peripheral blood lymphocytes. Using ground-based particle accelerator simulations, we characterized repair kinetics and fidelity under conditions mimicking Mars mission radiation environments. Results indicate significantly impaired repair of complex lesions induced by high-LET iron ions, suggesting long-term genomic instability risks.',
    topics: ['Space Radiation', 'DNA Damage', 'Human Health', 'Genomic Instability'],
    organisms: ['Human cells'],
    missions: ['Mars Simulation', 'NSRL Exposure'],
    sections: [
      {
        id: 'sec_002_intro',
        title: 'Introduction',
        chunks: [
          {
            id: 'chunk_055',
            content: 'Astronauts on interplanetary missions face chronic exposure to galactic cosmic rays composed of high-energy protons, helium nuclei, and heavy ions (High-Z and Energy, HZE). Unlike terrestrial radiation, these high-LET (linear energy transfer) particles cause complex DNA lesions that challenge cellular repair machinery. Understanding radiation-induced genomic instability is essential for risk assessment and countermeasure development.',
            sectionId: 'sec_002_intro',
            relatedChunks: [
              {
                documentId: 'doc_001',
                documentTitle: 'Skeletal Adaptation to Spaceflight: Microgravity Effects on Bone Density in Murine Models',
                chunkId: 'chunk_001',
                chunkExcerpt: 'Microgravity environments present unique physiological challenges for mammalian organisms...',
                relationshipType: 'supports',
                relevanceScore: 0.92,
              },
            ],
          },
          {
            id: 'chunk_056',
            content: 'Double-strand breaks (DSBs) are the most lethal form of DNA damage, repaired primarily by Non-Homologous End Joining (NHEJ) and Homologous Recombination (HR). The unique spatial clustering of damage induced by heavy ions may overwhelm these pathways, leading to misrepair, chromosomal aberrations, and long-term cancer risk. This investigation specifically focuses on the kinetics of $\gamma$H2AX focus formation and resolution, a validated proxy for DSB repair efficiency, following simulated GCR (specifically ${}^{56}$Fe ion) exposure.',
            sectionId: 'sec_002_intro',
            relatedChunks: [
              {
                documentId: 'doc_001',
                documentTitle: 'Skeletal Adaptation to Spaceflight: Microgravity Effects on Bone Density in Murine Models',
                chunkId: 'chunk_002',
                chunkExcerpt: 'The primary objective of this study was to quantify the differential impact of 30-day spaceflight on cancellous and cortical bone structure...',
                relationshipType: 'contradicts',
                relevanceScore: 0.70,
              },
            ],
          },
        ],
      },
      {
        id: 'sec_002_methods',
        title: 'Experimental Procedures',
        chunks: [
          {
            id: 'chunk_057',
            content: '**Cell Culture and Irradiation.** Human peripheral blood lymphocytes (PBLs) were isolated from four healthy donors and maintained in RPMI-1640 medium. Cells were transported to the NASA Space Radiation Laboratory (NSRL) at Brookhaven National Laboratory. Radiation exposures were conducted using 1 GeV/nucleon ${}^{56}$Fe ions (a major component of GCR) at doses of 0.5 Gy and 2.0 Gy, with a conventional 250 kVp X-ray source serving as the low-LET control. All exposures were conducted at 37°C.',
            sectionId: 'sec_002_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_058',
            content: '**Immunofluorescence and $\gamma$H2AX Foci Analysis.** At time points ranging from 0.5 hours to 24 hours post-irradiation, cells were fixed, permeabilized, and stained with an antibody against phosphorylated H2AX ($\gamma$H2AX), a key marker for DSBs. High-throughput fluorescence microscopy (Zeiss Axioplan) was used to count the number of $\gamma$H2AX foci per nucleus using automated software. At least 200 nuclei were scored for each dose and time point, in triplicate experiments.',
            sectionId: 'sec_002_methods',
            relatedChunks: [],
          },
          {
            id: 'chunk_059',
            content: '**Transcriptomic Analysis.** Quantitative RT-PCR was performed to assess the expression levels of key repair genes, including *Ku70*, *DNA-PKcs* (NHEJ components), and *BRCA1*, *RAD51* (HR components). Total RNA was isolated 6 hours post-irradiation, purified using a standard silica column method, and expression was normalized to the housekeeping gene GAPDH using the $\Delta \Delta C_t$ method.',
            sectionId: 'sec_002_methods',
            relatedChunks: [],
          },
        ],
      },
      {
        id: 'sec_002_results',
        title: 'Key Findings',
        chunks: [
          {
            id: 'chunk_060',
            content: '**Impaired Repair Kinetics Post-${}^{56}$Fe Exposure.** At 0.5 hours post-irradiation, the number of DSBs (foci count) was proportional to the absorbed dose for both X-rays and ${}^{56}$Fe ions, confirming comparable initial damage levels per Gray. However, resolution kinetics differed markedly. By 24 hours, over 95% of X-ray induced foci had disappeared, indicating effective repair. In contrast, ${}^{56}$Fe-irradiated cells retained approximately 25% of the initial foci, suggesting a significant residual, unrepaired, or misrepaired fraction of complex DSBs, particularly at the 2.0 Gy dose.',
            sectionId: 'sec_002_results',
            relatedChunks: [],
          },
          {
            id: 'chunk_061',
            content: '**Differential Gene Expression.** Transcriptomic analysis revealed an initial robust upregulation of NHEJ components (*Ku70*, *DNA-PKcs*) across all irradiated groups at 6 hours. However, the induction of HR-related genes (*BRCA1*, *RAD51*) was significantly lower (P < 0.05) in the ${}^{56}$Fe-exposed group compared to the X-ray control. This suggests a potential preferential but ultimately inadequate reliance on the error-prone NHEJ pathway for the complex lesions induced by heavy ions, which may compromise overall repair fidelity.',
            sectionId: 'sec_002_results',
            relatedChunks: [],
          },
        ],
      },
      {
        id: 'sec_002_discussion',
        title: 'Broader Implications',
        chunks: [
          {
            id: 'chunk_062',
            content: 'The persistent residual DSBs observed 24 hours after high-LET irradiation directly correlate with increased risk of late-stage effects, including cancer and degenerative diseases, emphasizing the heightened biological effectiveness of GCR components. Developing radioprotectants that specifically enhance the fidelity of repair or modulate the choice between NHEJ and HR pathways is a critical need for ensuring astronaut safety on long-duration space missions beyond Low Earth Orbit.',
            sectionId: 'sec_002_discussion',
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