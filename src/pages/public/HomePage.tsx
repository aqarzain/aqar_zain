import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { SearchHero } from '@/components/smart/SearchHero';
import { PropertyGrid } from '@/components/property/cards/PropertyGrid';
import { AIScoreRing } from '@/components/ai/scores/AIScoreRing';
import { Button } from '@/components/foundation/Button/Button';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { listingService } from '@/services/api/listingService';
import { ROUTES } from '@/utils/constants';
import { ArrowLeft, Sparkles, Shield, Zap, TrendingUp, Users, Building2 } from 'lucide-react';
import { formatNumber } from '@/utils/helpers';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'تحليل AI دقيق',
    description: 'تقييم ذكي للعقارات يساعدك في اتخاذ القرار الصحيح بناءً على بيانات السوق',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'عقارات موثقة',
    description: 'جميع العقارات المعروضة موثقة ومدققة من قبل فريقنا لضمان المصداقية',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'بحث سريع وذكي',
    description: 'محرك بحث متقدم يساعدك في العثور على ما تبحث عنه في ثوانٍ',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
];

const STATS = [
  { icon: Building2, value: '+5,000', label: 'عقار', color: 'text-primary-500' },
  { icon: Users, value: '+1,200', label: 'وسيط عقاري', color: 'text-blue-500' },
  { icon: TrendingUp, value: '+500', label: 'صفقة شهرياً', color: 'text-emerald-500' },
];

export default function HomePage() {
  const featuredQuery = useQuery({
    queryKey: ['listings', 'featured'],
    queryFn: () => listingService.getFeatured(6),
  });

  const latestQuery = useQuery({
    queryKey: ['listings', 'latest'],
    queryFn: () => listingService.getLatest(6),
  });

  return (
    <div>
      {/* Hero Section */}
      <SearchHero />

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                عقارات مميزة
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              عقارات مختارة بعناية
            </h2>
          </div>
          <Link to={ROUTES.listings}>
            <Button variant="ghost" rightIcon={<ArrowLeft className="w-4 h-4" />}>
              عرض الكل
            </Button>
          </Link>
        </div>

        {featuredQuery.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        ) : (
          <PropertyGrid
            listings={featuredQuery.data?.data || []}
            isLoading={featuredQuery.isLoading}
          />
        )}
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 dark:bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              لماذا عقار زين؟
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              نقدم لك تجربة عقارية فريدة مدعومة بأحدث تقنيات الذكاء الاصطناعي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card p-6 text-center hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="card p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  تقنية AI
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                ذكاء اصطناعي لتحليل العقارات
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                نظامنا الذكي يحلل مئات العوامل ليعطيك تقييماً دقيقاً للعقار،
                بما في ذلك السعر العادل، حالة السوق، وتوقعات البيع.
              </p>
              <ul className="space-y-3">
                {['تقييم ذكي من 0-100', 'تحليل السعر العادل', 'توقعات البيع والإيجار', 'مقارنة بالمنطقة'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                      <span className="text-xs text-emerald-600">✓</span>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <AIScoreRing score={85} size="xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary-500 to-amber-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              أحدث العقارات
            </h2>
            <p className="text-slate-500 mt-1">أحدث ما تم إضافته على المنصة</p>
          </div>
          <Link to={ROUTES.listings}>
            <Button variant="ghost" rightIcon={<ArrowLeft className="w-4 h-4" />}>
              عرض الكل
            </Button>
          </Link>
        </div>

        <PropertyGrid
          listings={latestQuery.data?.data || []}
          isLoading={latestQuery.isLoading}
        />
      </section>

      {/* Broker CTA */}
      <section className="bg-slate-900 dark:bg-slate-950 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            هل أنت وسيط عقاري؟
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            انضم إلى منصتنا وابدأ في عرض عقاراتك لملايين الباحثين.
            احصل على تحليلات AI مجانية لعقاراتك وأدوات احترافية لإدارة أعمالك.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to={ROUTES.register}>
              <Button variant="primary" size="lg">
                سجل الآن مجاناً
              </Button>
            </Link>
            <Link to={ROUTES.about}>
              <Button variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
                اعرف المزيد
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
