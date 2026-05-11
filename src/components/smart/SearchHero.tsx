import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { SearchInput } from '@/components/foundation/Input/SearchInput';
import { ROUTES } from '@/utils/constants';

export const SearchHero = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`${ROUTES.search}?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 start-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 end-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-500/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20 lg:py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>مدعوم بالذكاء الاصطناعي</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
          ابحث عن{' '}
          <span className="gold-gradient-text">عقار أحلامك</span>
          {' '}بذكاء
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          نساعدك في العثور على أفضل العقارات باستخدام تقنيات الذكاء الاصطناعي
          لتحليل السوق وتقديم توصيات دقيقة تناسب احتياجاتك
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            <SearchInput
              onSearch={handleSearch}
              size="lg"
              placeholder="ابحث عن شقة، فيلا، محل تجاري..."
            />
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleSearch('')}
              leftIcon={<Search className="w-5 h-5" />}
              className="flex-shrink-0"
            >
              بحث
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary-500" />
            <span className="text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">+5,000</strong> عقار
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">+1,200</strong> وسيط
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-white">AI</strong> نشط
            </span>
          </div>
        </div>

        {/* Broker CTA */}
        <div className="mt-12">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
            هل أنت وسيط عقاري؟
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(ROUTES.register)}
          >
            سجل الآن مجاناً وابدأ في عرض عقاراتك
          </Button>
        </div>
      </div>
    </section>
  );
};
