import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Expand, Play, Camera } from 'lucide-react';
import { cn, getImageUrl } from '@/utils/helpers';

interface ImageGalleryProps {
  images: string[];
  videoUrl?: string | null;
  className?: string;
}

export const ImageGallery = ({
  images,
  videoUrl,
  className,
}: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  const goNext = () => goTo(currentIndex + 1);
  const goPrev = () => goTo(currentIndex - 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') goPrev();
    if (e.key === 'ArrowLeft') goNext();
    if (e.key === 'Escape') setIsLightboxOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className={cn('aspect-[16/9] bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center', className)}>
        <Camera className="w-12 h-12 text-slate-400" />
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={cn('relative overflow-hidden rounded-2xl bg-slate-900', className)}>
        {/* Main Image */}
        <div className="aspect-[16/9] relative">
          {!imageLoaded[currentIndex] && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse" />
          )}
          <img
            src={getImageUrl(images[currentIndex])}
            alt={`صورة ${currentIndex + 1}`}
            onLoad={() => setImageLoaded({ ...imageLoaded, [currentIndex]: true })}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                disabled={currentIndex === images.length - 1}
                className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Actions */}
          <div className="absolute top-3 end-3 flex gap-2">
            {videoUrl && (
              <button className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors">
                <Play className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <Expand className="w-4 h-4" />
            </button>
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 end-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-white dark:bg-slate-800 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all',
                  index === currentIndex
                    ? 'border-primary-500 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                )}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`مصغرة ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 end-4 text-white/70 hover:text-white text-sm"
          >
            ✕ إغلاق
          </button>
          
          <img
            src={getImageUrl(images[currentIndex])}
            alt={`صورة ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                disabled={currentIndex === 0}
                className="absolute start-4 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                disabled={currentIndex === images.length - 1}
                className="absolute end-4 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-6 text-white text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
