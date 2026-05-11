import { cn } from '@/utils/helpers';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'shimmer' | 'none';
}

export const Skeleton = ({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) => {
  const baseStyles = 'bg-slate-200 dark:bg-slate-700';
  
  const variantStyles = {
    text: 'rounded-md h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl h-72',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    shimmer: 'skeleton',
    none: '',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={{
        width: width,
        height: height,
      }}
      aria-hidden="true"
    />
  );
};

// Pre-built skeleton layouts
export const PropertyCardSkeleton = () => (
  <div className="card overflow-hidden">
    <Skeleton variant="rectangular" className="w-full h-48 rounded-none" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex gap-2">
        <Skeleton variant="text" className="w-16" />
        <Skeleton variant="text" className="w-16" />
        <Skeleton variant="text" className="w-16" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" className="w-24 h-6" />
        <Skeleton variant="circular" className="w-10 h-10" />
      </div>
    </div>
  </div>
);

export const PropertyGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <PropertyCardSkeleton key={i} />
    ))}
  </div>
);

export const TableRowSkeleton = ({ cols = 5 }: { cols?: number }) => (
  <div className="flex gap-4 p-4 border-b border-slate-200 dark:border-slate-700">
    {Array.from({ length: cols }).map((_, i) => (
      <Skeleton key={i} variant="text" className="flex-1" />
    ))}
  </div>
);
