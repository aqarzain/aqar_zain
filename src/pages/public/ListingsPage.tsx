import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { listingService } from '@/services/api/listingService';
import { formatPriceCompact } from '@/utils/formatters';
import { cn, getImageUrl } from '@/utils/helpers';
import { AIScoreBadge } from '@/components/ai/scores/AIScoreBadge';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { PropertyCardSkeleton } from '@/components/foundation/Feedback/Skeleton';
import { Grid3X3, List, MapPin, Bed, Bath, Maximize, Eye, Building2, SearchX } from 'lucide-react';

export default function ListingsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['listings'],
    queryFn: () => listingService.getAll(),
    retry: 1,
  });

  // البيانات من الـAPI مباشرة
  const listings = data?.data || [];
  const total = data?.meta?.total || listings.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumb items={[{ label: 'الرئيسية', href: '/' }, { label: 'العقارات', href: '/listings' }]} className="mb-4" />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">جميع العقارات</h1>
        <p className="text-slate-500">استعرض آلاف العقارات المتاحة للبيع والإيجار في جميع أنحاء مصر</p>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-500">{total} عقار</span>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          <button onClick={() => setViewMode('grid')} className={cn('p-2 rounded-lg', viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500')}>
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button onClick={() => setViewMode('list')} className={cn('p-2 rounded-lg', viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500')}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <EmptyState icon={<SearchX />} title="حدث خطأ" description="يرجى المحاولة مرة أخرى" action={{ label: 'إعادة المحاولة', onClick: () => refetch() }} />
      ) : listings.length === 0 ? (
        <EmptyState icon={<Building2 />} title="لا توجد عقارات" description="لم يتم العثور على أي عقارات" />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing: any) => (
            <div key={listing.id} className="card-hover overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={getImageUrl(listing.images?.[0])} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 start-3 flex gap-2">
                  <span className="badge bg-white/90 text-slate-700 text-xs">{listing.transaction_type === 'sale' ? 'بيع' : 'إيجار'}</span>
                  {listing.is_featured && <span className="badge gold-gradient text-white text-xs">مميز</span>}
                </div>
                {listing.ai_score && <AIScoreBadge score={listing.ai_score} className="absolute top-3 end-3" />}
              </div>
              <div className="p-4">
                <Link to={`/listings/${listing.id}`} className="font-bold text-slate-900 dark:text-white hover:text-primary-500 truncate block">{listing.title}</Link>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1 mb-2">
                  <MapPin className="w-3 h-3" /> <span className="truncate">{listing.district?.name_ar || listing.street || '-'}، {listing.district?.city_ar || '-'}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {listing.rooms > 0 && <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {listing.rooms}</span>}
                  {listing.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {listing.bathrooms}</span>}
                  <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {listing.area} م²</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{formatPriceCompact(listing.price)}</span>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> {listing.views || 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing: any) => (
            <div key={listing.id} className="card-hover flex flex-col sm:flex-row overflow-hidden">
              <div className="w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
                <img src={getImageUrl(listing.images?.[0])} alt={listing.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <Link to={`/listings/${listing.id}`} className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-500 line-clamp-2">{listing.title}</Link>
                  <p className="text-sm text-slate-500 mt-1"><MapPin className="w-4 h-4 inline" /> {listing.district?.name_ar || listing.street || '-'}، {listing.district?.city_ar || '-'}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                    {listing.rooms > 0 && <span><Bed className="w-4 h-4 inline" /> {listing.rooms} غرف</span>}
                    {listing.bathrooms > 0 && <span><Bath className="w-4 h-4 inline" /> {listing.bathrooms} حمام</span>}
                    <span><Maximize className="w-4 h-4 inline" /> {listing.area} م²</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatPriceCompact(listing.price)}</span>
                  <div className="flex items-center gap-2">
                    {listing.ai_score && <AIScoreBadge score={listing.ai_score} />}
                    <span className="text-xs text-slate-400"><Eye className="w-3 h-3 inline" /> {listing.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
