import { Check, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { cn, formatNumber } from '@/utils/helpers';
import type { CreditPackage } from '@/types/api/wallet.types';

interface PackageCardProps {
  package: CreditPackage;
  isSelected?: boolean;
  onSelect: (pkg: CreditPackage) => void;
  className?: string;
}

export const PackageCard = ({
  package: pkg,
  isSelected = false,
  onSelect,
  className,
}: PackageCardProps) => {
  return (
    <div
      className={cn(
        'card relative overflow-hidden transition-all duration-300 cursor-pointer',
        isSelected
          ? 'ring-2 ring-primary-500 shadow-gold-glow scale-[1.02]'
          : 'hover:shadow-lg hover:scale-[1.01]',
        pkg.is_recommended && 'border-primary-300 dark:border-primary-700',
        className
      )}
      onClick={() => onSelect(pkg)}
    >
      {/* Recommended Badge */}
      {pkg.is_recommended && (
        <div className="absolute top-0 start-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-amber-500 text-white text-xs font-bold px-4 py-1 rounded-b-lg flex items-center gap-1">
          <Crown className="w-3 h-3" />
          الأكثر طلباً
        </div>
      )}

      <div className="p-6 pt-8 text-center">
        {/* Icon */}
        <div className={cn(
          'w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4',
          pkg.is_recommended
            ? 'bg-primary-100 dark:bg-primary-500/20'
            : 'bg-slate-100 dark:bg-slate-700'
        )}>
          <Zap className={cn(
            'w-8 h-8',
            pkg.is_recommended
              ? 'text-primary-500'
              : 'text-slate-500 dark:text-slate-400'
          )} />
        </div>

        {/* Name */}
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          {pkg.name}
        </h4>

        {/* Credits */}
        <div className="mb-4">
          <span className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
            {formatNumber(pkg.credits)}
          </span>
          <span className="text-sm text-slate-500"> رصيد</span>
        </div>

        {/* Bonus */}
        {pkg.bonus_credits > 0 && (
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium mb-4">
            <Check className="w-3 h-3" />
            +{formatNumber(pkg.bonus_credits)} رصيد مجاني
          </div>
        )}

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {formatNumber(pkg.price)}
          </span>
          <span className="text-sm text-slate-500"> ج.م</span>
        </div>

        {/* CTA */}
        <Button
          variant={pkg.is_recommended ? 'primary' : 'outline'}
          size="sm"
          fullWidth
          onClick={() => onSelect(pkg)}
        >
          {isSelected ? 'تم الاختيار ✓' : 'اختيار'}
        </Button>
      </div>
    </div>
  );
};
