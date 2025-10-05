import { FileText, Users, Lightbulb, Database } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PublicationTimeline } from '@/components/dashboard/PublicationTimeline';
import { TopicDistribution } from '@/components/dashboard/TopicDistribution';
import { OrganismPieChart } from '@/components/dashboard/OrganismPieChart';
import { ResearchGaps } from '@/components/dashboard/ResearchGaps';
import { DocumentRelationships } from '@/components/dashboard/DocumentRelationships';
import { mockDashboardStats } from '@/mock/mockDashboardStats';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const stats = mockDashboardStats;
  const [documentCount, setDocumentCount] = useState(0);
  const [authorCount, setAuthorCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data: docData } = await supabase.functions.invoke('document_count');
        const { data: authData } = await supabase.functions.invoke('authors_count');
        
        setDocumentCount(docData?.count ?? stats.totalPapers);
        setAuthorCount(authData?.count ?? stats.totalAuthors);
      } catch (error) {
        console.error('Error fetching counts:', error);
        setDocumentCount(stats.totalPapers);
        setAuthorCount(stats.totalAuthors);
      }
    };

    fetchCounts();
  }, [stats.totalPapers, stats.totalAuthors]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Research Corpus Overview</h2>
          <p className="text-muted-foreground">
            Comprehensive analysis of {stats.totalPapers} NASA bioscience research papers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-[#3E79FF]">
          <StatCard
            title="Total Papers"
            value={documentCount.toLocaleString()}
            icon={FileText}
            subtitle={`${stats.dateRange.start} - ${stats.dateRange.end}`}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Unique Authors"
            value={authorCount.toLocaleString()}
            icon={Users}
            subtitle="Contributing researchers"
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatCard
            title="Research Findings"
            value={stats.totalFindings.toLocaleString()}
            icon={Lightbulb}
            subtitle="Extracted insights"
          />
          <StatCard
            title="Knowledge Graph"
            value="15.2K"
            icon={Database}
            subtitle="Nodes + relationships"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ResearchGaps gaps={stats.knowledgeGaps} />
          <DocumentRelationships relations={stats.documentRelations} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <PublicationTimeline data={stats.publicationsByYear} />
          <TopicDistribution data={stats.topTopics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrganismPieChart data={stats.organisms} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
