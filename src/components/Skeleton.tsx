import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'circle';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'text' }) => {
  const baseStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: 8,
  };

  const variants: Record<string, React.CSSProperties> = {
    text: { height: 16, width: '100%', ...baseStyle },
    card: { height: 300, width: '100%', ...baseStyle, borderRadius: 16 },
    circle: { height: 40, width: 40, borderRadius: '50%', ...baseStyle },
  };

  return <div style={{ ...variants[variant], ...baseStyle }} className={className} />;
};

export const PropertyCardSkeleton = () => (
  <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
    <Skeleton variant="card" />
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </div>
    </div>
  </div>
);

export const PropertyListSkeleton = ({ count = 6 }: { count?: number }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, padding: 16 }}>
    {Array.from({ length: count }).map((_, i) => <PropertyCardSkeleton key={i} />)}
  </div>
);
