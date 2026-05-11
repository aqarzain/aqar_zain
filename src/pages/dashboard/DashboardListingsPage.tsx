import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/foundation/Button/Button';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { DataTable } from '@/components/dashboard/tables/DataTable';
import { listingService } from '@/services/api/listingService';
import { ROUTES } from '@/utils/constants';
import { formatPriceCompact, formatRelativeTime, formatAIScore } from '@/utils/formatters';
import { cn, getImageUrl } from '@/utils/helpers';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Eye,
  MoreHorizontal,
  Building2,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardListingsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();

  const listingsQuery = useQuery({
    queryKey: ['my-listings', { page, status: statusFilter }],
    queryFn: () => listingService.getMyListings({ page, per_page: 10 }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => listingService.delete(id),
    onSuccess: () => {
      toast.success('تم حذف العقار بنجاح');
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: (id: string) => listingService.toggleFeatured(id),
    onSuccess: () => {
      toast.success('تم تحديث حالة التمييز');
      queryClient.invalidateQueries({ queryKey: ['my-listings'] });
    },
  });

  const listings = listingsQuery.data?.data || [];
  const meta = listingsQuery.data?.meta;

  const statusCounts = {
    all: meta?.total || 0,
    active: listings.filter((l: any) => l.status === 'active').length,
    inactive: listings.filter((l: any) => l.status === 'inactive').length,
    featured: listings.filter((l: any) => l.is_featured).length,
  };

  const columns = [
    {
      header: 'العقار',
      accessor: 'title',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-3">
          <img
            src={getImageUrl(row.main_image)}
            alt={row.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
              {row.title}
            </p>
            <p className="text-xs text-slate-500">{formatRelativeTime(row.created_at)}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'السعر',
      accessor: 'price',
      render: (value: number) => (
        <span className="font-medium text-slate-900 dark:text-white text-sm">
          {formatPriceCompact(value)}
        </span>
      ),
    },
    {
      header: 'AI Score',
      accessor: 'ai_score',
      render: (value: number) => {
        const { color } = formatAIScore(value);
        return (
          <span className={cn('badge text-xs font-bold', value >= 80 ? 'badge-ai-high' : value >= 60 ? 'badge-ai-medium' : 'badge-ai-low')}>
            {value}
          </span>
        );
      },
    },
    {
      header: 'مشاهدات',
      accessor: 'views_count',
      render: (value: number) => (
        <span className="flex items-center gap-1 text-sm text-slate-500">
          <Eye className="w-3.5 h-3.5" /> {value}
        </span>
      ),
    },
    {
      header: 'الحالة',
      accessor: 'status',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'badge text-xs',
              value === 'active' ? 'badge-ai-high' : 'badge bg-slate-100 text-slate-600'
            )}
          >
            {value === 'active' ? 'نشط' : value === 'inactive' ? 'غير نشط' : value === 'sold' ? 'مباع' : 'مؤجر'}
          </span>
          {row.is_featured && (
            <Star className="w-3.5 h-3.5 text-primary-500 fill-primary-500" />
          )}
        </div>
      ),
    },
    {
      header: 'إجراءات',
      accessor: 'id',
      render: (id: string, row: any) => (
        <div className="flex items-center gap-1">
          <Link to={ROUTES.dashboard.editListing(id)}>
            <Button variant="ghost" size="xs">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => toggleFeaturedMutation.mutate(id)}
            title={row.is_featured ? 'إلغاء التمييز' : 'تفعيل التمييز'}
          >
            <Star className={cn('w-4 h-4', row.is_featured ? 'text-primary-500 fill-primary-500' : '')} />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
                deleteMutation.mutate(id);
              }
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">عقاراتي</h1>
          <p className="text-slate-500 text-sm mt-1">إدارة جميع عقاراتك</p>
        </div>
        <Link to={ROUTES.dashboard.createListing}>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            إضافة عقار
          </Button>
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
        {[
          { key: 'all', label: 'الكل', count: statusCounts.all },
          { key: 'active', label: 'نشط', count: statusCounts.active },
          { key: 'inactive', label: 'غير نشط', count: statusCounts.inactive },
          { key: 'featured', label: 'مميز', count: statusCounts.featured },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              statusFilter === tab.key
                ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {tab.label}
            <span className="text-xs opacity-60 ms-1">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      {listingsQuery.isLoading ? (
        <div className="card p-8 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="skeleton w-12 h-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="skeleton w-1/3 h-4" />
                <div className="skeleton w-1/4 h-3" />
              </div>
            </div>
          ))}
        </div>
      ) : listings.length > 0 ? (
        <DataTable
          columns={columns}
          data={listings}
          page={page}
          totalPages={meta?.last_page || 1}
          onPageChange={setPage}
        />
      ) : (
        <EmptyState
          icon={<Building2 />}
          title="لا توجد عقارات"
          description="ابدأ بإضافة أول عقار لك على المنصة"
          action={{
            label: 'إضافة عقار',
            onClick: () => window.location.href = ROUTES.dashboard.createListing,
          }}
        />
      )}
    </div>
  );
}
