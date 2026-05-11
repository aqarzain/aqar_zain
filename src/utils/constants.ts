// =============================================
// 📋 Constants - AqarZain
// =============================================

export const APP_CONFIG = {
  name: 'عقار زين',
  nameEn: 'AqarZain',
  version: '3.0.0',
  description: 'المنصة العقارية الذكية',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8080',
} as const;

export const PROPERTY_TYPES = {
  apartment: 'شقة',
  villa: 'فيلا',
  townhouse: 'تاون هاوس',
  duplex: 'دوبلكس',
  shop: 'محل تجاري',
  land: 'أرض',
} as const;

export const TRANSACTION_TYPES = {
  sale: 'بيع',
  rent: 'إيجار',
} as const;

export const FINISH_TYPES = {
  super_lux: 'سوبر لوكس',
  luxury: 'فاخر',
  normal: 'عادي',
} as const;

export const LISTING_STATUS = {
  active: 'نشط',
  inactive: 'غير نشط',
  sold: 'مباع',
  rented: 'مؤجر',
} as const;

export const MARKET_STATUS = {
  bargain: 'صفقة',
  fair_price: 'سعر عادل',
  overpriced: 'مبالغ فيه',
} as const;

export const SORT_OPTIONS = {
  latest: 'الأحدث',
  ai_score: 'الأعلى تقييماً (AI)',
  price_asc: 'السعر: الأقل أولاً',
  price_desc: 'السعر: الأعلى أولاً',
  most_viewed: 'الأكثر مشاهدة',
} as const;

export const VIEW_MODES = {
  grid: 'شبكة',
  list: 'قائمة',
  map: 'خريطة',
} as const;

export const PAYMENT_METHODS = {
  card: 'بطاقة ائتمان',
  bank_transfer: 'تحويل بنكي',
  instapay: 'إنستاباي',
  vodafone_cash: 'فودافون كاش',
} as const;

export const AMENITIES_LIST = [
  'مصعد',
  'جراج',
  'أمن',
  'حديقة',
  'مسبح',
  'جيم',
  'تكييف مركزي',
  'غاز طبيعي',
  'إنترنت',
  'قريبة من المواصلات',
  'قريبة من المدارس',
  'إطلالة مميزة',
  'مدخل خاص',
  'غرفة خدم',
  'مخزن',
] as const;

export const EGYPTIAN_CITIES = [
  'القاهرة',
  'الإسكندرية',
  'الجيزة',
  'القليوبية',
  'الشرقية',
  'الدقهلية',
  'الغربية',
  'المنوفية',
  'البحيرة',
  'كفر الشيخ',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'شمال سيناء',
  'جنوب سيناء',
  'البحر الأحمر',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'الوادي الجديد',
  'مطروح',
] as const;

export const PAGINATION = {
  defaultPerPage: 12,
  perPageOptions: [12, 24, 48, 96],
} as const;

export const UPLOAD = {
  maxImages: 10,
  maxImageSize: 5 * 1024 * 1024, // 5MB
  acceptedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxVideoSize: 50 * 1024 * 1024, // 50MB
} as const;

export const ROUTES = {
  home: '/',
  listings: '/listings',
  search: '/search',
  listingDetail: (id: string) => `/listings/${id}`,
  login: '/login',
  register: '/register',
  about: '/about',
  contact: '/contact',
  faq: '/faq',
  terms: '/terms',
  privacy: '/privacy',
  blog: '/blog',
  
  dashboard: {
    home: '/dashboard',
    listings: '/dashboard/listings',
    createListing: '/dashboard/listings/create',
    editListing: (id: string) => `/dashboard/listings/${id}/edit`,
    deals: '/dashboard/deals',
    wallet: '/dashboard/wallet',
    purchase: '/dashboard/wallet/purchase',
    analytics: '/dashboard/analytics',
    profile: '/dashboard/profile',
    notifications: '/dashboard/notifications',
    favorites: '/dashboard/favorites',
  },
  
  admin: {
    home: '/admin',
    brokers: '/admin/brokers',
    listings: '/admin/listings',
    deals: '/admin/deals',
    revenue: '/admin/revenue',
    statistics: '/admin/statistics',
    settings: '/admin/settings',
    auditLogs: '/admin/audit-logs',
  },
} as const;
