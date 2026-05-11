import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '@/components/user/auth/AuthContext';
import { StatsGrid } from '@/components/dashboard/stats/StatsGrid';
import { WalletBalance } from '@/components/wallet/balance/WalletBalance';
import { Button } from '@/components/foundation/Button/Button';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { listingService } from '@/services/api/listingService';
import { walletService } from '@/services/api/walletService';
import { ROUTES } from '@/utils/constants';
import { formatRelativeTime, formatPriceCompact } from '@/utils/formatters';
import { Plus, ArrowLeft, TrendingUp, AlertTriangle, Eye } from 'lucide-react';
import { cn } from '@/utils/helpers';

export default function DashboardHomePage() {
  const { user } = useAuth();

  const statsQuery = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => listingService.getMyListings({ page: 1 }),
  });

  const walletQuery = useQuery({
    queryKey: ['wallet', 'balance'],
    queryFn: () => walletService.getBalance(),
  });

  // Simulated stats
  const brokerStats = {
    active_listings: statsQuery.data?.meta?.total || 0,
    total_deals: 45,
    total_views: 1230,
    wallet_balance: walletQuery.data?.data?.wallet?.balance || 0,
    avg_ai_score: 78,
    total_favorites: 156,
    new_messages: 3,
    pending_deals: 2,
  };

  const recentListings = statsQuery.data?.data?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            مرحباً، {user?.name || 'وسيط'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            هذا ملخص أداء عقاراتك اليوم
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to={ROUTES.dashboard.createListing}>
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              إضافة عقار
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={brokerStats} />

      {/* Wallet + Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet */}
        <div className="lg:col-span-1">
          {walletQuery.isLoading ? (
            <Skeleton variant="card" className="h-48" />
          ) : walletQuery.data?.data?.wallet ? (
            <WalletBalance wallet={walletQuery.data.data.wallet} />
          ) : (
            <div className="card p-6 text-center">
              <p className="text-slate-500 mb-3">لا توجد محفظة بعد</p>
              <Link to={ROUTES.dashboard.purchase}>
                <Button variant="primary" size="sm">شراء رصيد</Button>
              </Link>
            </div>
          )}
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            تحليلات AI سريعة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-center">
              <div className="text-2xl font-bold text-emerald-600">78</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400">متوسط AI Score</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-center">
              <div className="text-2xl font-bold text-blue-600">+12%</div>
              <div className="text-xs text-blue-700 dark:text-blue-400">زيادة المشاهدات</div>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-center">
              <div className="text-2xl font-bold text-amber-600">2</div>
              <div className="text-xs text-amber-700 dark:text-amber-400">تحتاج انتباه</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Listings + Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <div className="card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white">آخر العقارات</h3>
            <Link to={ROUTES.dashboard.listings} className="text-sm text-primary-500 hover:underline">
              عرض الكل
            </Link>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {statsQuery.isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4">
                  <Skeleton variant="text" className="w-full h-5 mb-2" />
                  <Skeleton variant="text" className="w-1/2 h-4" />
                </div>
              ))
            ) : recentListings.length > 0 ? (
              recentListings.map((listing: any) => (
                <Link
                  key={listing.id}
                  to={ROUTES.dashboard.editListing(listing.id)}
                  className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={listing.main_image || '/placeholder.jpg'}
                      alt={listing.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {listing.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{formatPriceCompact(listing.price)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {listing.views_count || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">
                    {formatRelativeTime(listing.created_at)}
                  </span>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-slate-500 text-sm mb-3">لا توجد عقارات بعد</p>
                <Link to={ROUTES.dashboard.createListing}>
                  <Button variant="primary" size="sm">أضف عقارك الأول</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="card">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              تحتاج انتباهك
            </h3>
          </div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-500/10">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  عقار منخفض التقييم
                </p>
                <p className="text-xs text-red-600 dark:text-red-500">
                  شقة في المعادي - AI Score: 42
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  مشاهدات منخفضة
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-500">
                  فيلا في التجمع - 12 مشاهدة فقط
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
