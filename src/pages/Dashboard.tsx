import { useState, useEffect } from 'react'; // <-- Import React hooks
import { FileText, Users, Lightbulb, Database } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PublicationTimeline } from '@/components/dashboard/PublicationTimeline';
import { TopicDistribution } from '@/components/dashboard/TopicDistribution';
import { OrganismPieChart } from '@/components/dashboard/OrganismPieChart';
import { ResearchGaps } from '@/components/dashboard/ResearchGaps';
import { DocumentRelationships } from '@/components/dashboard/DocumentRelationships';
import { getDashboardStats } from '@/mock/mockDashboardStats';
import { Footer } from '@/components/Footer';

// Define a type for your dashboard stats data structure
// (This is a good practice, assuming you have a type defined elsewhere)
// If you don't have a type, you can use 'any' temporarily, but a type is better.
// Assuming your mock data returns an object like this:
interface DashboardStats {
  totalPapers: number;
  totalAuthors: number;
  totalFindings: number;
  dateRange: { start: string; end: string };
  knowledgeGaps: any[]; // Replace 'any' with the actual type
  documentRelations: any[];
  publicationsByYear: any[];
  topTopics: any[];
  organisms: any[];
  // ... other properties
}

// Define a good initial state (can be null or an object with default/zero values)
const initialStats: DashboardStats = {
  totalPapers: 0,
  totalAuthors: 0,
  totalFindings: 0,
  dateRange: { start: 'N/A', end: 'N/A' },
  knowledgeGaps: [],
  documentRelations: [],
  publicationsByYear: [],
  topTopics: [],
  organisms: [],
};


const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Await the asynchronous function call
        const dashboardData = await getDashboardStats(); 
        setStats(dashboardData);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []); // The empty dependency array ensures this runs only once on mount

  // --- Conditional Rendering ---

  if (loading) {
    // Show a loading state while the promise is resolving
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-primary">Loading dashboard data...</p>
        {/* You could replace this with a proper loading spinner */}
      </div>
    );
  }

  if (error) {
    // Show an error message if the promise rejected
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  // Ensure stats is not null before accessing its properties
  // This check is guaranteed by the 'if (loading)' and 'if (error)' checks above
  if (!stats) {
    return null; // or a fallback component if somehow stats is null here
  }
  
  // Use the fetched stats for the rest of the component
  const { 
    totalPapers, totalAuthors, totalFindings, dateRange, 
    knowledgeGaps, documentRelations, publicationsByYear, 
    topTopics, organisms 
  } = stats;


  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Research Corpus Overview</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of {totalPapers} NASA bioscience research papers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-[#3E79FF]">
          <StatCard
            title="Total Papers"
            // Ensure you are using the actual data, which may not be the hardcoded "608"
            value={totalPapers.toLocaleString()} 
            icon={FileText}
            subtitle={`${dateRange.start} - ${dateRange.end}`}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Unique Authors"
            value={totalAuthors.toLocaleString()}
            icon={Users}
            subtitle="Contributing researchers"
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatCard
            title="Research Findings"
            value={totalFindings.toLocaleString()}
            icon={Lightbulb}
            subtitle="Extracted insights"
          />
          <StatCard
            title="Knowledge Graph"
            value="15.2K" // This is still hardcoded, if it should be dynamic, use stats.knowledgeGraphValue
            icon={Database}
            subtitle="Nodes + relationships"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ResearchGaps gaps={knowledgeGaps} />
          <DocumentRelationships relations={documentRelations} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PublicationTimeline data={publicationsByYear} />
          <TopicDistribution data={topTopics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrganismPieChart data={organisms} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;