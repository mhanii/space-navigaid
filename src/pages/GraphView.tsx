import { Network } from 'lucide-react';

const GraphView = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Knowledge Graph</h2>
          <p className="text-muted-foreground">
            Interactive visualization of research connections
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center justify-center min-h-[600px]">
          <div className="text-center">
            <div className="bg-primary-light rounded-full p-6 mb-6 inline-block">
              <Network className="w-16 h-16 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">
              Knowledge Graph Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-md mb-6">
              An interactive network visualization showing relationships between papers,
              topics, organisms, and findings will be available here.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold mb-1">15,200+ Nodes</p>
                <p className="text-xs text-muted-foreground">Entities extracted</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-semibold mb-1">48,700+ Edges</p>
                <p className="text-xs text-muted-foreground">Relationships mapped</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphView;
