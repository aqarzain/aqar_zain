import { useQuery } from '@tanstack/react-query';
import { listingService } from '@/services/api/listingService';
import { formatPriceCompact } from '@/utils/formatters';
import { getImageUrl } from '@/utils/helpers';

export const ListingsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['listings'],
    queryFn: () => listingService.getAll(),
  });

  const listings = data?.data || [];

  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif', maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ color: '#D4AF37', marginBottom: 20 }}>
        جميع العقارات ({listings.length})
      </h1>

      {isLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {listings.map((listing: any) => (
            <div key={listing.id} style={{ border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
              <img src={getImageUrl(listing.images?.[0])} alt={listing.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 15 }}>
                <h3 style={{ margin: '0 0 5px' }}>{listing.title}</h3>
                <p style={{ color: '#666', fontSize: 14, margin: '0 0 5px' }}>
                  {listing.district?.name_ar}، {listing.district?.city_ar}
                </p>
                <p style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: 18, margin: 0 }}>
                  {formatPriceCompact(listing.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
