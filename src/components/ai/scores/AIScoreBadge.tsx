import { Brain } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface AIScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const AIScoreBadge = ({ score, size = 'md', className }: AIScoreBadgeProps) => {
  const color = score >= 80 ? 'bg-emerald-500 text-white' : score >= 60 ? 'bg-amber-500 text-white' : 'bg-red-500 text-white';
  return (
    <div className={cn('inline-flex items-center rounded-full font-bold px-2 py-0.5 text-xs gap-1', color, className)}>
      <Brain className="w-3 h-3" />
      <span>{score}</span>
    </div>
  );
};
