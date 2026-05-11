import { cn } from '@/utils/helpers';
import { formatMarketStatus, formatPriceCompact } from '@/utils/formatters';
import type { MarketStatus } from '@/types/api/ai.types';
import { TrendingUp, TrendingDown, Minus, DollarSign, Clock, Percent } from 'lucide-react';

interface MarketStatusCardProps {
  status: MarketStatus;
  actualPrice: number;
  fairPrice: number;
  priceDifferencePercentage: number;
  sellProbability: number;
  expectedDaysOnMarket: number;
  className?: string;
}

const statusConfig = {
  bargain: {
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: TrendingUp,
    iconBg: 'bg-emerald-500',
    advice: 'سعر رائع! فرصة شراء ممتازة. السعر أقل من القيمة السوقية العادلة.',
  },
  fair_price: {
    gradient: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    border: 'border-amber-200 dark:border-amber-800',
    icon: Minus,
    iconBg: 'bg-amber-500',
    advice: 'سعر عادل. العقار مسعّر بقيمته السوقية الحقيقية.',
  },
  overpriced: {
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-800',
    icon: TrendingDown,
    iconBg: 'bg-red-500',
    advice: 'السعر أعلى من القيمة السوقية. قد تحتاج للتفاوض للحصول على سعر أفضل.',
  },
};

export const MarketStatusCard = ({
  status,
  actualPrice,
  fairPrice,
  priceDifferencePercentage,
  sellProbability,
  expectedDaysOnMarket,
  className,
}: MarketStatusCardProps) => {
  const config = statusConfig[status];
  const { label } = formatMarketStatus(status);
  const Icon = config.icon;

  const isPositive = priceDifferencePercentage < 0; // Negative means cheaper
  const diffAbs = Math.abs(priceDifferencePercentage);

  return (
    <div className={cn('card overflow-hidden', config.border, className)}>
      {/* Header */}
      <div className={cn('bg-gradient-to-r p-4 text-white', config.gradient)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-lg">{label}</h4>
              <p className="text-sm opacity-90">حالة السوق</p>
            </div>
          </div>
          <div className="text-end">
            <div className="text-2xl font-bold">{diffAbs.toFixed(1)}%</div>
            <div className="text-xs opacity-80">
              {isPositive ? 'أقل من السوق' : 'أعلى من السوق'}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* Price Comparison */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <DollarSign className="w-3 h-3" />
              السعر الفعلي
            </div>
            <div className="font-bold text-slate-900 dark:text-white">
              {formatPriceCompact(actualPrice)}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <DollarSign className="w-3 h-3" />
              السعر العادل (AI)
            </div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">
              {formatPriceCompact(fairPrice)}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <Percent className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {sellProbability}%
              </div>
              <div className="text-xs text-slate-500">احتمالية البيع</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {expectedDaysOnMarket} يوم
              </div>
              <div className="text-xs text-slate-500">متوقع في السوق</div>
            </div>
          </div>
        </div>

        {/* Advice */}
        <div className={cn('p-3 rounded-xl text-sm', config.bg)}>
          💡 {config.advice}
        </div>
      </div>
    </div>
  );
};
