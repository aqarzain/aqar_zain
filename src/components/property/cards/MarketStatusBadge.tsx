import { cn } from '@/utils/helpers';
import { TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';
import type { MarketStatus } from '@/types/api/listing.types';

interface MarketStatusBadgeProps {
  status: MarketStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const config = {
  bargain: { label: 'صفقة', color: 'bg-emerald-100 text-emerald-700', icon: TrendingUp },
  fair_price: { label: 'عادل', color: 'bg-amber-100 text-amber-700', icon: CheckCircle },
  overpriced: { label: 'مبالغ', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
};

export const MarketStatusBadge = ({ status, size = 'sm', className }: MarketStatusBadgeProps) => {
  const c = config[status] || config.fair_price;
  const Icon = c.icon;
  return (
    <span className={cn('badge font-medium flex items-center gap-1', c.color, size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1', className)}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      <span className="hidden sm:inline">{c.label}</span>
    </span>
  );
};
