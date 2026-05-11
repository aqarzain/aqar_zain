import { Phone, MessageCircle, Star, Award, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { cn, getImageUrl, getInitials, openWhatsApp } from '@/utils/helpers';
import type { User } from '@/types/api/user.types';

interface BrokerCardProps {
  broker: {
    id: string;
    name: string;
    phone: string;
    avatar: string | null;
    rating: number;
    deals_count: number;
    listings_count: number;
    bio?: string | null;
    city?: string;
    is_verified?: boolean;
  };
  variant?: 'card' | 'compact';
  className?: string;
}

export const BrokerCard = ({ broker, variant = 'card', className }: BrokerCardProps) => {
  const handleCall = () => {
    window.open(`tel:${broker.phone}`);
  };

  const handleWhatsApp = () => {
    openWhatsApp(broker.phone, 'مرحباً، أنا مهتم بأحد عقاراتك المعروضة على عقار زين');
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3 p-3', className)}>
        <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
          {broker.avatar ? (
            <img src={getImageUrl(broker.avatar)} alt={broker.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-primary-600">{getInitials(broker.name)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{broker.name}</p>
            {broker.is_verified && <Award className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{broker.rating.toFixed(1)}</span>
            <span>·</span>
            <span>{broker.deals_count} صفقة</span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="xs" onClick={handleCall}>
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleWhatsApp}
            className="text-emerald-500 hover:text-emerald-600"
          >
            <MessageCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('card p-6 text-center', className)}>
      {/* Avatar */}
      <div className="w-24 h-24 mx-auto rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center overflow-hidden mb-4 ring-4 ring-primary-50 dark:ring-primary-500/10">
        {broker.avatar ? (
          <img src={getImageUrl(broker.avatar)} alt={broker.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl font-bold text-primary-600">{getInitials(broker.name)}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-center gap-1 mb-1">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{broker.name}</h4>
        {broker.is_verified && <Award className="w-5 h-5 text-primary-500" />}
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-medium text-slate-700 dark:text-slate-300">{broker.rating.toFixed(1)}</span>
        </div>
        <span>·</span>
        <span>{broker.deals_count} صفقة</span>
        <span>·</span>
        <span>{broker.listings_count} عقار</span>
      </div>

      {broker.city && (
        <div className="flex items-center justify-center gap-1 text-sm text-slate-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{broker.city}</span>
        </div>
      )}

      {broker.bio && (
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
          {broker.bio}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleCall}
          leftIcon={<Phone className="w-4 h-4" />}
        >
          اتصال
        </Button>
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={handleWhatsApp}
          leftIcon={<MessageCircle className="w-4 h-4" />}
          className="!border-emerald-500 !text-emerald-500 hover:!bg-emerald-50"
        >
          واتساب
        </Button>
      </div>
    </div>
  );
};
