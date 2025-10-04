import { FileText, Users, Lightbulb, Database } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { PublicationTimeline } from '@/components/dashboard/PublicationTimeline';
import { TopicDistribution } from '@/components/dashboard/TopicDistribution';
import { OrganismPieChart } from '@/components/dashboard/OrganismPieChart';
import { ResearchGaps } from '@/components/dashboard/ResearchGaps';
import { DocumentRelationships } from '@/components/dashboard/DocumentRelationships';
import { mockDashboardStats } from '@/mock/mockDashboardStats';
import { Footer } from '@/components/Footer';

const Dashboard = () => {
  const stats = mockDashboardStats;

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
            value={stats.totalPapers.toLocaleString()}
            icon={FileText}
            subtitle={`${stats.dateRange.start} - ${stats.dateRange.end}`}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Unique Authors"
            value={stats.totalAuthors.toLocaleString()}
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
