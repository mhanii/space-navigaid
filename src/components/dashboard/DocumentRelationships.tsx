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
    color: 'text-destructive',
    bg: 'bg-destructive/10',
    icon: GitCompareArrows,
    label: 'Contradicción',
  },
  complementation: {
    color: 'text-success',
    bg: 'bg-success/10',
    icon: Link2,
    label: 'Complementación',
  },
  analogy: {
    color: 'text-primary',
    bg: 'bg-primary/10',
    icon: Lightbulb,
    label: 'Analogía',
  },
};

export const DocumentRelationships = ({ relations }: DocumentRelationshipsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Document Relationships</h3>
      <div className="space-y-3">
        {relations.map((relation, index) => {
          const config = relationConfig[relation.type];
          const Icon = config.icon;
          return (
            <div
              key={index}
              className={`${config.bg} border border-border rounded-lg p-4 transition-all hover:shadow-sm`}
            >
              <div className="flex items-start space-x-3">
                <div className={`${config.color} mt-0.5`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{relation.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {relation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${config.color} uppercase`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {relation.documents.length} docs
                    </span>
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
