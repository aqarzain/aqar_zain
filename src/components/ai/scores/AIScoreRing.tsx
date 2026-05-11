import { cn } from '@/utils/helpers';
import { Brain } from 'lucide-react';

interface AIScoreRingProps {
  score: number;
  size?: 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  md: { ring: 'w-20 h-20', text: 'text-lg', icon: 'w-6 h-6', strokeWidth: 6 },
  lg: { ring: 'w-28 h-28', text: 'text-2xl', icon: 'w-8 h-8', strokeWidth: 5 },
  xl: { ring: 'w-36 h-36', text: 'text-3xl', icon: 'w-10 h-10', strokeWidth: 5 },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return { stroke: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', text: 'text-emerald-600 dark:text-emerald-400' };
  if (score >= 60) return { stroke: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', text: 'text-amber-600 dark:text-amber-400' };
  return { stroke: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', text: 'text-red-600 dark:text-red-400' };
};

export const AIScoreRing = ({
  score,
  size = 'lg',
  showLabel = true,
  className,
}: AIScoreRingProps) => {
  const config = sizeConfig[size];
  const colors = getScoreColor(score);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('relative inline-flex flex-col items-center gap-2', className)}>
      {/* Ring */}
      <div className={cn('relative', config.ring)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={colors.bg}
            strokeWidth={config.strokeWidth}
          />
          {/* Progress */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={colors.stroke}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${colors.stroke}40)`,
            }}
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Brain className={cn(config.icon, colors.text)} />
          <span className={cn('font-bold', config.text, colors.text)}>
            {score}
          </span>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <span className={cn('text-sm font-medium', colors.text)}>
          تقييم AI
        </span>
      )}
    </div>
  );
};
