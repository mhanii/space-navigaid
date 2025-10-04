import { GitCompareArrows, Link2, Lightbulb } from 'lucide-react';

export interface DocumentRelation {
  type: 'contradiction' | 'complementation' | 'analogy';
  title: string;
  description: string;
  documents: string[];
}

interface DocumentRelationshipsProps {
  relations: DocumentRelation[];
}

const relationConfig = {
  contradiction: {
    color: 'text-[#FF5031]',
    bg: 'bg-[#FF5031]/10',
    borderColor: 'border-[#FF5031]/30',
    containerBg: 'bg-[#FF5031]/5',
    containerBorder: 'border-[#FF5031]/20',
    icon: GitCompareArrows,
    label: 'Contradiction',
  },
  complementation: {
    color: 'text-success',
    bg: 'bg-success/10',
    borderColor: 'border-success/30',
    icon: Link2,
    label: 'Complementation',
  },
  analogy: {
    color: 'text-primary',
    bg: 'bg-primary/10',
    borderColor: 'border-primary/30',
    icon: Lightbulb,
    label: 'Analogy',
  },
};

export const DocumentRelationships = ({ relations }: DocumentRelationshipsProps) => {
  // Sort relations with contradictions first
  const sortedRelations = [...relations].sort((a, b) => {
    const priority = { contradiction: 0, complementation: 1, analogy: 2 };
    return priority[a.type] - priority[b.type];
  });

  const hasContradictions = relations.some(r => r.type === 'contradiction');
  const contradictionConfig = relationConfig.contradiction;

  return (
    <div className={`border rounded-lg p-6 ${hasContradictions ? `bg-[#fff] border-border` : 'bg-[#fff] border-border'}`}>
      <h3 className="text-lg font-semibold mb-4">Document Relationships</h3>
      <div className="space-y-3">
        {sortedRelations.map((relation, index) => {
          const config = relationConfig[relation.type];
          const Icon = config.icon;
          return (
            <div
              key={index}
              className={`${config.bg} border-2 ${config.borderColor} rounded-lg p-4 transition-all hover:shadow-md hover:scale-[1.01]`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${config.color} mt-0.5 p-2 rounded-lg ${config.bg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{relation.title}</h4>
                    <span className={`text-xs font-bold ${config.color} uppercase px-2 py-1 rounded ${config.bg}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {relation.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="font-medium">{relation.documents.length}</span>
                    <span>documents involved</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
