import { PropertyGrid } from '@/components/property/cards/PropertyGrid';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { Heart } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

const MOCK_FAVORITES: any[] = [];

export default function FavoritesPage() {
  const favorites = MOCK_FAVORITES;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          المفضلة
        </h1>
        <p className="text-slate-500 text-sm mt-1">العقارات التي أضفتها للمفضلة</p>
      </div>

      {favorites.length > 0 ? (
        <PropertyGrid listings={favorites} variant="grid" />
      ) : (
        <EmptyState
          icon={<Heart />}
          title="لا توجد عقارات مفضلة"
          description="أضف العقارات التي تعجبك للمفضلة لتجدها بسهولة لاحقاً"
          action={{
            label: 'تصفح العقارات',
            onClick: () => window.location.href = ROUTES.listings,
          }}
        />
      )}
    </div>
  );
}
