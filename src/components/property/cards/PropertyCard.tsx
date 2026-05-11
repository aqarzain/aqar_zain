import { Link } from 'react-router-dom';
import { Heart, Share2, MapPin, Bed, Bath, Maximize, Building2, Eye } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { AIScoreBadge } from '@/components/ai/scores/AIScoreBadge';
import { MarketStatusBadge } from '@/components/property/cards/MarketStatusBadge';
import { formatPriceCompact, formatArea, formatPropertyType, formatTransactionType } from '@/utils/formatters';
import { getImageUrl, cn } from '@/utils/helpers';
import type { Listing } from '@/types/api/listing.types';
import { ROUTES } from '@/utils/constants';
import { useState } from 'react';

interface PropertyCardProps {
  listing: Listing;
  variant?: 'grid' | 'list' | 'featured';
  onFavorite?: (id: string) => void;
  className?: string;
}

export const PropertyCard = ({
  listing,
  variant = 'grid',
  onFavorite,
  className,
}: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavorite?.(listing.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Share logic
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: `${listing.title} - ${formatPriceCompact(listing.price)}`,
        url: `${window.location.origin}${ROUTES.listingDetail(listing.id)}`,
      });
    }
  };

  if (variant === 'list') {
    return (
      <div className={cn('card-hover flex flex-col sm:flex-row overflow-hidden', className)}>
        {/* Image */}
        <div className="relative w-full sm:w-72 h-48 sm:h-auto flex-shrink-0">
          <div className={cn('absolute inset-0 bg-slate-200 dark:bg-slate-700', imageLoaded && 'hidden')} />
          <img
            src={getImageUrl(listing.main_image)}
            alt={listing.title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 start-3 flex gap-2">
            <span className="badge bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs">
              {formatTransactionType(listing.transaction_type)}
            </span>
            {listing.is_featured && (
              <span className="badge gold-gradient text-white text-xs">مميز</span>
            )}
          </div>
          <AIScoreBadge score={listing.ai_score} className="absolute top-3 end-3" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link to={ROUTES.listingDetail(listing.id)}>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white hover:text-primary-500 transition-colors line-clamp-2">
                  {listing.title}
                </h3>
              </Link>
              <MarketStatusBadge status={listing.market_status} />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
              {listing.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{listing.district}، {listing.city}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              {listing.rooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" /> {listing.rooms} غرف
                </span>
              )}
              {listing.bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" /> {listing.bathrooms} حمام
                </span>
              )}
              <span className="flex items-center gap-1">
                <Maximize className="w-4 h-4" /> {formatArea(listing.area)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
              {formatPriceCompact(listing.price)}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Eye className="w-3 h-3" /> {listing.views_count}
              </span>
              <Button variant="ghost" size="xs" onClick={handleFavorite}>
                <Heart className={cn('w-4 h-4', isFavorite && 'fill-red-500 text-red-500')} />
              </Button>
              <Button variant="ghost" size="xs" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid & Featured variants
  return (
    <div className={cn(
      'card-hover overflow-hidden group',
      variant === 'featured' && 'ring-2 ring-primary-500/50 shadow-gold-glow',
      className
    )}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className={cn('absolute inset-0 bg-slate-200 dark:bg-slate-700', imageLoaded && 'hidden')} />
        <img
          src={getImageUrl(listing.main_image)}
          alt={listing.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 start-3 flex gap-2">
          <span className="badge bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 text-xs backdrop-blur-sm">
            {formatTransactionType(listing.transaction_type)}
          </span>
          {listing.is_featured && (
            <span className="badge gold-gradient text-white text-xs">مميز</span>
          )}
        </div>

        {/* AI Score */}
        <AIScoreBadge score={listing.ai_score} className="absolute top-3 end-3" />

        {/* Quick Actions (visible on hover) */}
        <div className="absolute bottom-3 end-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="xs"
            onClick={handleFavorite}
            className="!bg-white/90 !text-slate-700 hover:!bg-white backdrop-blur-sm"
          >
            <Heart className={cn('w-4 h-4', isFavorite && 'fill-red-500 text-red-500')} />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleShare}
            className="!bg-white/90 !text-slate-700 hover:!bg-white backdrop-blur-sm"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={ROUTES.listingDetail(listing.id)} className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 dark:text-white hover:text-primary-500 transition-colors truncate">
              {listing.title}
            </h3>
          </Link>
          <MarketStatusBadge status={listing.market_status} size="sm" />
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{listing.district}، {listing.city}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mb-3">
          {listing.rooms > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5" /> {listing.rooms}
            </span>
          )}
          {listing.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5" /> {listing.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5" /> {formatArea(listing.area)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
            {formatPriceCompact(listing.price)}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Eye className="w-3 h-3" /> {listing.views_count}
          </span>
        </div>
      </div>
    </div>
  );
};
