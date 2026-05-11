import { cn } from '@/utils/helpers';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; label: string; direction: 'up' | 'down' | 'neutral' };
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const colors = {
  default: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
  primary: 'bg-primary-50 dark:bg-primary-500/10 border-primary-200',
  success: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200',
  warning: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200',
  danger: 'bg-red-50 dark:bg-red-500/10 border-red-200',
};

const trendIcons = { up: TrendingUp, down: TrendingDown, neutral: Minus };
const trendColors = { up: 'text-emerald-600', down: 'text-red-600', neutral: 'text-slate-500' };

export const StatsCard = ({ title, value, icon, trend, color = 'default', className }: StatsCardProps) => {
  const TrendIcon = trend ? trendIcons[trend.direction] : null;
  return (
    <div className={cn('card p-5 border', colors[color], className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">{icon}</div>
        {trend && TrendIcon && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trendColors[trend.direction])}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{title}</p>
      </div>
    </div>
  );
};
