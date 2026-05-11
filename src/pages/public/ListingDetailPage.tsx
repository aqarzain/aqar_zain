import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ImageGallery } from '@/components/property/gallery/ImageGallery';
import { AIAnalysisPanel } from '@/components/ai/analysis/AIAnalysisPanel';
import { BrokerCard } from '@/components/user/broker/BrokerCard';
import { PropertyCard } from '@/components/property/cards/PropertyCard';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { listingService } from '@/services/api/listingService';
import { aiService } from '@/services/api/aiService';
import { formatPriceCompact, formatArea, formatPropertyType, formatTransactionType, formatDate } from '@/utils/formatters';
import { MapPin, Bed, Bath, Maximize, Building2, Calendar, Eye, Heart, Share2 } from 'lucide-react';

export default function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();

  const listingQuery = useQuery({
    queryKey: ['listing', id],
    queryFn: () => listingService.getById(id!),
    enabled: !!id,
  });

  const similarQuery = useQuery({
    queryKey: ['similar', id],
    queryFn: () => aiService.getSimilar(id!, 4),
    enabled: !!id,
  });

  const listing = listingQuery.data?.data;
  const similarListings = similarQuery.data?.data || [];

  if (listingQuery.isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Skeleton variant="rectangular" className="w-full h-[400px] rounded-2xl" />
        <Skeleton variant="text" className="w-2/3 h-8" />
        <Skeleton variant="text" className="w-1/3 h-6" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          العقار غير موجود
        </h1>
        <Link to="/listings" className="text-primary-500 hover:underline">
          العودة للعقارات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'الرئيسية', href: '/' },
          { label: 'العقارات', href: '/listings' },
          { label: formatPropertyType(listing.property_type), href: '#' },
          { label: listing.title, href: '#' },
        ]}
        className="mb-4"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <ImageGallery
            images={listing.images?.length ? listing.images : [listing.main_image]}
            videoUrl={listing.video_url}
          />

          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge bg-primary-100 text-primary-700 text-xs">
                    {formatTransactionType(listing.transaction_type)}
                  </span>
                  <span className="badge bg-slate-100 text-slate-600 text-xs">
                    {formatPropertyType(listing.property_type)}
                  </span>
                  {listing.is_featured && (
                    <span className="badge gold-gradient text-white text-xs">مميز</span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.district}، {listing.city}</span>
                  {listing.street && <span>- {listing.street}</span>}
                </div>
              </div>
              <div className="text-end">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {formatPriceCompact(listing.price)}
                </div>
                <div className="text-sm text-slate-500">
                  {listing.price_per_meter > 0 && `${formatPriceCompact(listing.price_per_meter)} / م²`}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button className="btn-ghost text-sm">
                <Heart className="w-4 h-4" /> المفضلة
              </button>
              <button className="btn-ghost text-sm">
                <Share2 className="w-4 h-4" /> مشاركة
              </button>
              <span className="text-xs text-slate-400 flex items-center gap-1 ms-auto">
                <Eye className="w-3.5 h-3.5" /> {listing.views_count} مشاهدة
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {listing.rooms > 0 && (
              <div className="card p-3 text-center">
                <Bed className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <div className="font-bold text-slate-900 dark:text-white">{listing.rooms}</div>
                <div className="text-xs text-slate-500">غرف</div>
              </div>
            )}
            {listing.bathrooms > 0 && (
              <div className="card p-3 text-center">
                <Bath className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <div className="font-bold text-slate-900 dark:text-white">{listing.bathrooms}</div>
                <div className="text-xs text-slate-500">حمامات</div>
              </div>
            )}
            <div className="card p-3 text-center">
              <Maximize className="w-5 h-5 mx-auto mb-1 text-slate-400" />
              <div className="font-bold text-slate-900 dark:text-white">{formatArea(listing.area)}</div>
              <div className="text-xs text-slate-500">المساحة</div>
            </div>
            {listing.floor && (
              <div className="card p-3 text-center">
                <Building2 className="w-5 h-5 mx-auto mb-1 text-slate-400" />
                <div className="font-bold text-slate-900 dark:text-white">{listing.floor}</div>
                <div className="text-xs text-slate-500">الطابق</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">الوصف</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          {listing.amenities && listing.amenities.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">المميزات</h3>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300"
                  >
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {listing.finish_type && (
              <div className="card p-3">
                <div className="text-xs text-slate-500">نوع التشطيب</div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {listing.finish_type === 'super_lux' ? 'سوبر لوكس' : listing.finish_type === 'luxury' ? 'فاخر' : 'عادي'}
                </div>
              </div>
            )}
            {listing.building_age !== null && (
              <div className="card p-3">
                <div className="text-xs text-slate-500">عمر المبنى</div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {listing.building_age} سنة
                </div>
              </div>
            )}
            {listing.direction && (
              <div className="card p-3">
                <div className="text-xs text-slate-500">الاتجاه</div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {listing.direction}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Broker Card */}
          <BrokerCard
            broker={{
              id: listing.broker_id,
              name: listing.broker_name,
              phone: listing.broker_phone,
              avatar: listing.broker_avatar,
              rating: listing.broker_rating,
              deals_count: listing.broker_deals_count,
              listings_count: 0,
              city: listing.city,
              is_verified: listing.is_verified,
            }}
          />

          {/* AI Analysis */}
          <AIAnalysisPanel listing={listing} />

          {/* Meta Info */}
          <div className="card p-4 text-sm text-slate-500 space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>نشر في {formatDate(listing.created_at)}</span>
            </div>
            {listing.expires_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>ينتهي في {formatDate(listing.expires_at)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarListings.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            عقارات مشابهة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarListings.map((similar: any) => (
              <PropertyCard
                key={similar.id}
                listing={similar}
                variant="grid"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
