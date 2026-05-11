import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { PackageCard } from '@/components/wallet/packages/PackageCard';
import { Button } from '@/components/foundation/Button/Button';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { walletService } from '@/services/api/walletService';
import { ROUTES } from '@/utils/constants';
import { formatNumber } from '@/utils/helpers';
import { ArrowRight, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';
import { cn } from '@/utils/helpers';
import toast from 'react-hot-toast';
import type { CreditPackage, PaymentMethod } from '@/types/api/wallet.types';

const PAYMENT_METHODS: { id: PaymentMethod; label: string; icon: any }[] = [
  { id: 'card', label: 'بطاقة ائتمان', icon: CreditCard },
  { id: 'bank_transfer', label: 'تحويل بنكي', icon: Banknote },
  { id: 'instapay', label: 'إنستاباي', icon: Smartphone },
  { id: 'vodafone_cash', label: 'فودافون كاش', icon: Smartphone },
];

export default function PurchasePage() {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');

  const packagesQuery = useQuery({
    queryKey: ['wallet', 'packages'],
    queryFn: () => walletService.getPackages(),
  });

  const purchaseMutation = useMutation({
    mutationFn: () =>
      walletService.purchase({
        package_id: selectedPackage!.id,
        payment_method: selectedPayment,
      }),
    onSuccess: (data) => {
      if (data.data?.payment_url) {
        window.location.href = data.data.payment_url;
      } else {
        toast.success('تم الشراء بنجاح');
        navigate(ROUTES.dashboard.wallet);
      }
    },
    onError: () => toast.error('فشل الشراء، حاول مرة أخرى'),
  });

  const packages = packagesQuery.data?.data || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">شراء رصيد</h1>
          <p className="text-slate-500 text-sm mt-1">اختر الباقة المناسبة لاحتياجاتك</p>
        </div>
      </div>

      {/* Packages Grid */}
      {packagesQuery.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-72" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg: CreditPackage) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              onSelect={setSelectedPackage}
            />
          ))}
        </div>
      )}

      {/* Payment Method */}
      {selectedPackage && (
        <div className="card p-6 space-y-4 animate-fade-in">
          <h3 className="font-bold text-slate-900 dark:text-white">وسيلة الدفع</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 transition-all',
                  selectedPayment === method.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                )}
              >
                <method.icon className={cn(
                  'w-5 h-5',
                  selectedPayment === method.id ? 'text-primary-500' : 'text-slate-400'
                )} />
                <span className="text-sm font-medium text-slate-900 dark:text-white">{method.label}</span>
                {selectedPayment === method.id && (
                  <Check className="w-5 h-5 text-primary-500 me-auto" />
                )}
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">الباقة</span>
              <span className="font-medium text-slate-900 dark:text-white">{selectedPackage.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">الرصيد</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {formatNumber(selectedPackage.credits + selectedPackage.bonus_credits)} رصيد
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>الإجمالي</span>
              <span className="text-primary-600">{formatNumber(selectedPackage.price)} ج.م</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => purchaseMutation.mutate()}
            isLoading={purchaseMutation.isPending}
          >
            تأكيد الشراء
          </Button>
        </div>
      )}
    </div>
  );
}
