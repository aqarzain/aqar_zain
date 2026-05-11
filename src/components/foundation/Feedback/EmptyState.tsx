import { Button } from '@/components/foundation/Button/Button';
import { cn } from '@/utils/helpers';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'p-6 gap-3',
  md: 'p-10 gap-4',
  lg: 'p-16 gap-6',
};

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizeStyles[size],
        className
      )}
    >
      {icon && (
        <div className="text-5xl opacity-40 mb-2">
          {icon}
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          {description}
        </p>
      )}
      
      {action && (
        <Button onClick={action.onClick} variant="primary" size="sm" className="mt-2">
          {action.label}
        </Button>
      )}
    </div>
  );
};
