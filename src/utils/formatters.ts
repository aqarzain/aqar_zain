export const formatPriceCompact = (price: number): string => {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M ج.م`;
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}K ج.م`;
  return `${price.toLocaleString('ar-EG')} ج.م`;
};

export const formatArea = (area: number): string => `${area.toLocaleString('ar-EG')} م²`;

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateString));
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diffMins < 1) return 'الآن';
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `منذ ${diffDays} يوم`;
  return `منذ ${Math.floor(diffDays / 30)} شهر`;
};

export const formatAIScore = (score: number) => {
  if (score >= 80) return { text: `${score}/100`, color: 'text-emerald-600', label: 'ممتاز' };
  if (score >= 60) return { text: `${score}/100`, color: 'text-amber-600', label: 'جيد' };
  return { text: `${score}/100`, color: 'text-red-600', label: 'ضعيف' };
};

export const formatMarketStatus = (status: string) => {
  const map: Record<string, { label: string; color: string; icon: string }> = {
    bargain: { label: 'صفقة', color: 'bg-emerald-100 text-emerald-700', icon: '💰' },
    fair_price: { label: 'سعر عادل', color: 'bg-amber-100 text-amber-700', icon: '✅' },
    overpriced: { label: 'مبالغ فيه', color: 'bg-red-100 text-red-700', icon: '⚠️' },
  };
  return map[status] || { label: 'غير معروف', color: 'bg-gray-100 text-gray-700', icon: '❓' };
};

export const formatPropertyType = (type: string): string => {
  const types: Record<string, string> = {
    apartment: 'شقة', villa: 'فيلا', townhouse: 'تاون هاوس',
    duplex: 'دوبلكس', shop: 'محل تجاري', land: 'أرض',
  };
  return types[type] || type;
};

export const formatTransactionType = (type: string): string => type === 'sale' ? 'بيع' : 'إيجار';
