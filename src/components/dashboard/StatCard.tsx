import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: { value: number; isPositive: boolean };
}

export const StatCard = ({ title, value, icon: Icon, subtitle, trend }: StatCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? 'text-success' : 'text-error'}`}>
              <span>{trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-muted-foreground">vs last year</span>
            </div>
          )}
        </div>
        <div className="bg-primary-light rounded-lg p-3">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
};
