import { StatsCard } from '@/components/dashboard/stats/StatsCard';
import { Skeleton } from '@/components/foundation/Feedback/Skeleton';
import { formatNumber } from '@/utils/helpers';
import { Eye, Heart, MessageCircle, Handshake, TrendingUp, Target } from 'lucide-react';

const METRICS = [
  { title: 'مشاهدات هذا الأسبوع', value: formatNumber(2340), icon: <Eye className="w-6 h-6 text-blue-600" />, trend: { value: 12, label: 'مقارنة بالأسبوع الماضي', direction: 'up' as const } },
  { title: 'إضافات للمفضلة', value: 89, icon: <Heart className="w-6 h-6 text-red-600" />, trend: { value: 5, label: 'مقارنة بالأسبوع الماضي', direction: 'up' as const } },
  { title: 'رسائل جديدة', value: 34, icon: <MessageCircle className="w-6 h-6 text-purple-600" />, trend: { value: 8, label: 'مقارنة بالأسبوع الماضي', direction: 'up' as const } },
  { title: 'صفقات مكتملة', value: 12, icon: <Handshake className="w-6 h-6 text-emerald-600" />, trend: { value: 2, label: 'مقارنة بالأسبوع الماضي', direction: 'down' as const } },
];

const AI_INSIGHTS = [
  { title: 'متوسط AI Score', value: '78/100', icon: <Target className="w-6 h-6 text-emerald-600" />, color: 'success' as const },
  { title: 'أفضل عقار', value: 'فيلا التجمع (91)', icon: <TrendingUp className="w-6 h-6 text-blue-600" />, color: 'primary' as const },
  { title: 'معدل التحويل', value: '4.2%', icon: <Handshake className="w-6 h-6 text-purple-600" />, color: 'default' as const },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">التحليلات</h1>
        <p className="text-slate-500 text-sm mt-1">تحليل أداء عقاراتك</p>
      </div>

      {/* Time Filter */}
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
        {['7 أيام', '30 يوم', '3 شهور', 'سنة'].map((period) => (
          <button key={period} className="px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 shadow-sm text-primary-600">
            {period}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric) => (
          <StatsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">المشاهدات (آخر 7 أيام)</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[120, 200, 150, 300, 280, 400, 350].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary-500 rounded-t-lg hover:bg-primary-600 transition-colors cursor-pointer" style={{ height: `${(value / 400) * 200}px` }} />
                <span className="text-xs text-slate-500">{['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">توزيع AI Score</h3>
          <div className="h-64 flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-8 border-emerald-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">65%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">ممتاز (80+)</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border-8 border-amber-500 flex items-center justify-center">
                <span className="text-xl font-bold text-amber-600">25%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">جيد (60-79)</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-8 border-red-500 flex items-center justify-center">
                <span className="text-lg font-bold text-red-600">10%</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">ضعيف (&lt;60)</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">تحليلات AI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {AI_INSIGHTS.map((insight) => (
            <StatsCard key={insight.title} {...insight} />
          ))}
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-6">مسار التحويل</h3>
        <div className="space-y-4">
          {[
            { label: 'مشاهدات', value: 2340, percentage: 100, color: 'bg-blue-500' },
            { label: 'إضافات للمفضلة', value: 234, percentage: 10, color: 'bg-red-500' },
            { label: 'رسائل', value: 89, percentage: 3.8, color: 'bg-purple-500' },
            { label: 'صفقات', value: 12, percentage: 0.5, color: 'bg-emerald-500' },
          ].map((step) => (
            <div key={step.label} className="flex items-center gap-4">
              <span className="text-sm text-slate-600 dark:text-slate-400 w-32">{step.label}</span>
              <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-6 overflow-hidden">
                <div className={`h-full rounded-full ${step.color} flex items-center justify-end px-2`} style={{ width: `${Math.max(step.percentage, 2)}%` }}>
                  <span className="text-xs text-white font-bold">{step.value}</span>
                </div>
              </div>
              <span className="text-xs text-slate-500 w-12">{step.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
