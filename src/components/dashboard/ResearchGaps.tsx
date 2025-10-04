import { AlertTriangle, TrendingUp, Info } from 'lucide-react';

interface ResearchGap {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface ResearchGapsProps {
  gaps: ResearchGap[];
}

const priorityConfig = {
  high: { color: 'text-error', bg: 'bg-error/10', icon: AlertTriangle },
  medium: { color: 'text-warning', bg: 'bg-warning/10', icon: TrendingUp },
  low: { color: 'text-info', bg: 'bg-info/10', icon: Info },
};

export const ResearchGaps = ({ gaps }: ResearchGapsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Identified Knowledge Gaps</h3>
      <div className="space-y-3">
        {gaps.map((gap, index) => {
          const config = priorityConfig[gap.priority];
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
                  <h4 className="font-semibold text-sm mb-1">{gap.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {gap.description}
                  </p>
                  <div className="mt-2">
                    <span className={`text-xs font-medium ${config.color} uppercase`}>
                      {gap.priority} priority
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
