import { PropertyCard } from './PropertyCard';
import { PropertyCardSkeleton } from '@/components/foundation/Feedback/Skeleton';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { SearchX } from 'lucide-react';
import type { Listing } from '@/types/api/listing.types';

interface PropertyGridProps {
  listings: Listing[];
  isLoading?: boolean;
  isError?: boolean;
  variant?: 'grid' | 'list';
  onFavorite?: (id: string) => void;
  skeletonCount?: number;
}

export const PropertyGrid = ({
  listings,
  isLoading = false,
  isError = false,
  variant = 'grid',
  onFavorite,
  skeletonCount = 6,
}: PropertyGridProps) => {
  // Loading State
  if (isLoading) {
    return (
      <div
        className={
          variant === 'list'
            ? 'space-y-4'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <EmptyState
        icon={<SearchX />}
        title="حدث خطأ في تحميل العقارات"
        description="يرجى المحاولة مرة أخرى لاحقاً"
        action={{
          label: 'إعادة المحاولة',
          onClick: () => window.location.reload(),
        }}
      />
    );
  }

  // Empty State
  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        icon={<SearchX />}
        title="لا توجد عقارات"
        description="لم نجد أي عقارات تطابق معايير البحث، جرب تعديل الفلاتر"
      />
    );
  }

  // Grid View
  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <PropertyCard
            key={listing.id}
            listing={listing}
            variant={listing.is_featured ? 'featured' : 'grid'}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <PropertyCard
          key={listing.id}
          listing={listing}
          variant="list"
          onFavorite={onFavorite}
        />
      ))}
    </div>
  );
};
