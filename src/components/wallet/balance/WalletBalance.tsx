import { Wallet, TrendingUp, Gift, Clock } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { cn, formatNumber } from '@/utils/helpers';
import { ROUTES } from '@/utils/constants';
import { Link } from 'react-router-dom';
import type { Wallet as WalletType } from '@/types/api/wallet.types';

interface WalletBalanceProps {
  wallet: WalletType;
  className?: string;
}

export const WalletBalance = ({ wallet, className }: WalletBalanceProps) => {
  const totalBalance = wallet.balance;
  const purchasedBalance = wallet.purchased_balance;
  const freeBalance = wallet.free_balance;

  return (
    <div className={cn('relative overflow-hidden rounded-2xl', className)}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-amber-400">
        <div className="absolute inset-0 bg-[url('/images/patterns/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-0 end-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 start-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/4 -translate-x-1/4" />
      </div>

      {/* Content */}
      <div className="relative p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-90">رصيدي</p>
              <p className="text-xs opacity-70">عقار زين</p>
            </div>
          </div>
          <Link to={ROUTES.dashboard.purchase}>
            <Button
              variant="ghost"
              size="sm"
              className="!bg-white/20 !text-white hover:!bg-white/30"
            >
              شراء رصيد
            </Button>
          </Link>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <div className="text-4xl font-extrabold mb-1">
            {formatNumber(totalBalance)}
          </div>
          <p className="text-sm opacity-80">رصيد متاح</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
            <TrendingUp className="w-4 h-4 opacity-80" />
            <div>
              <p className="text-xs opacity-70">مشحون</p>
              <p className="font-bold">{formatNumber(purchasedBalance)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl p-3">
            <Gift className="w-4 h-4 opacity-80" />
            <div>
              <p className="text-xs opacity-70">مجاني</p>
              <p className="font-bold">{formatNumber(freeBalance)}</p>
            </div>
          </div>
        </div>

        {/* Expiry */}
        {wallet.free_balance_expires_at && (
          <div className="flex items-center gap-2 mt-3 text-xs opacity-70">
            <Clock className="w-3 h-3" />
            <span>
              الرصيد المجاني ينتهي في{' '}
              {new Date(wallet.free_balance_expires_at).toLocaleDateString('ar-EG')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
