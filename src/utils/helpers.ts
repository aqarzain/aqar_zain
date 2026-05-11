export const formatPrice = (price: number): string => {
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M ج.م`;
  if (price >= 1000) return `${(price / 1000).toFixed(0)}K ج.م`;
  return `${price.toLocaleString('ar-EG')} ج.م`;
};

export const formatNumber = (num: number): string => num.toLocaleString('ar-EG');

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
};

export const getImageUrl = (url: string | null | undefined): string => url || 'https://via.placeholder.com/400x300?text=No+Image';

export const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');
