import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { WalletBalance } from '@/components/wallet/balance/WalletBalance';
import { Button } from '@/components/foundation/Button/Button';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { walletService } from '@/services/api/walletService';
import { ROUTES } from '@/utils/constants';
import { formatNumber, formatDate } from '@/utils/helpers';
import { TrendingUp, TrendingDown, Gift, CreditCard, ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/utils/helpers';

export default function WalletPage() {
  const balanceQuery = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: () => walletService.getBalance(),
  });

  const transactionsQuery = useQuery({
    queryKey: ['wallet', 'transactions'],
    queryFn: () => walletService.getTransactions({ page: 1 }),
  });

  const wallet = balanceQuery.data?.data?.wallet;
  const transactions = transactionsQuery.data?.data || [];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <CreditCard className="w-4 h-4 text-blue-500" />;
      case 'feature_payment': return <ArrowUp className="w-4 h-4 text-amber-500" />;
      case 'refund': return <ArrowDown className="w-4 h-4 text-emerald-500" />;
      case 'bonus': return <Gift className="w-4 h-4 text-purple-500" />;
      case 'signup_bonus': return <Gift className="w-4 h-4 text-purple-500" />;
      default: return <TrendingUp className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'purchase': return 'شراء رصيد';
      case 'feature_payment': return 'تمييز عقار';
      case 'refund': return 'استرداد';
      case 'bonus': return 'مكافأة';
      case 'signup_bonus': return 'مكافأة تسجيل';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">المحفظة</h1>
          <p className="text-slate-500 text-sm mt-1">إدارة رصيدك ومعاملاتك</p>
        </div>
        <Link to={ROUTES.dashboard.purchase}>
          <Button variant="primary">شراء رصيد</Button>
        </Link>
      </div>

      {/* Balance */}
      {balanceQuery.isLoading ? (
        <Skeleton variant="card" className="h-56" />
      ) : wallet ? (
        <WalletBalance wallet={wallet} />
      ) : (
        <div className="card p-8 text-center">
          <p className="text-slate-500">لا توجد محفظة بعد</p>
        </div>
      )}

      {/* Transactions */}
      <div className="card">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white">سجل المعاملات</h3>
        </div>

        {transactionsQuery.isLoading ? (
          <div className="p-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="text" className="w-full h-6" />
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {transactions.map((tx: any) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {getTransactionLabel(tx.type)}
                    </p>
                    <p className="text-xs text-slate-500">{formatDate(tx.created_at)}</p>
                  </div>
                </div>
                <div className={cn(
                  'text-sm font-bold',
                  tx.amount > 0 ? 'text-emerald-600' : 'text-red-600'
                )}>
                  {tx.amount > 0 ? '+' : ''}{formatNumber(tx.amount)} رصيد
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-500">لا توجد معاملات</div>
        )}
      </div>
    </div>
  );
}
