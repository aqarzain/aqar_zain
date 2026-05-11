import { useQuery } from '@tanstack/react-query';
import { StatsCard } from '@/components/dashboard/stats/StatsCard';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { formatNumber } from '@/utils/helpers';
import {
  Users, Building2, Handshake, DollarSign, TrendingUp,
  Activity, Shield, Server, Database, Radio, Brain, Search
} from 'lucide-react';

const SYSTEM_SERVICES = [
  { name: 'Laravel API', icon: Server, status: '🟢', uptime: '99.9%' },
  { name: 'Database', icon: Database, status: '🟢', connections: '45' },
  { name: 'Redis', icon: Radio, status: '🟢', memory: '2.1GB' },
  { name: 'Meilisearch', icon: Search, status: '🟢', documents: '12,500' },
  { name: 'Reverb WS', icon: Activity, status: '🟢', connections: '230' },
  { name: 'AI Service', icon: Brain, status: '🟢', requests: '1,200/h' },
];

const QUICK_LINKS = [
  { title: 'الوسطاء', icon: Users, link: ROUTES.admin.brokers, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { title: 'العقارات', icon: Building2, link: ROUTES.admin.listings, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  { title: 'الصفقات', icon: Handshake, link: ROUTES.admin.deals, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  { title: 'الإيرادات', icon: DollarSign, link: ROUTES.admin.revenue, color: 'text-amber-600', bg: 'bg-amber-100 dark:bg-amber-500/20' },
  { title: 'الإحصائيات', icon: TrendingUp, link: ROUTES.admin.statistics, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-500/20' },
  { title: 'الإعدادات', icon: Shield, link: ROUTES.admin.settings, color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-700' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">لوحة التحكم - المدير</h1>
        <p className="text-slate-500 text-sm mt-1">نظرة عامة على المنصة</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="وسطاء نشطين"
          value={formatNumber(1250)}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend={{ value: 8, label: 'آخر 30 يوم', direction: 'up' }}
          color="primary"
        />
        <StatsCard
          title="عقارات كلية"
          value={formatNumber(5432)}
          icon={<Building2 className="w-6 h-6 text-emerald-600" />}
          trend={{ value: 12, label: 'آخر 30 يوم', direction: 'up' }}
          color="success"
        />
        <StatsCard
          title="صفقات الشهر"
          value={formatNumber(487)}
          icon={<Handshake className="w-6 h-6 text-purple-600" />}
          trend={{ value: 5, label: 'مقارنة بالشهر الماضي', direction: 'up' }}
        />
        <StatsCard
          title="إيرادات الشهر"
          value={`${formatNumber(890000)} ج.م`}
          icon={<DollarSign className="w-6 h-6 text-amber-600" />}
          trend={{ value: 15, label: 'مقارنة بالشهر الماضي', direction: 'up' }}
          color="warning"
        />
      </div>

      {/* System Health */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          حالة النظام
          <span className="badge badge-ai-high text-xs ms-2">🟢 جميع الخدمات تعمل</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SYSTEM_SERVICES.map((service) => (
            <div key={service.name} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-center">
              <service.icon className="w-5 h-5 mx-auto mb-2 text-slate-500" />
              <div className="text-xs font-medium text-slate-900 dark:text-white">{service.name}</div>
              <div className="text-xs text-slate-500 mt-1">{service.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.title}
            to={link.link}
            className="card p-4 text-center hover:shadow-card-hover transition-all group"
          >
            <div className={`w-12 h-12 mx-auto rounded-xl ${link.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <link.icon className={`w-6 h-6 ${link.color}`} />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{link.title}</span>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">آخر النشاطات</h3>
        <div className="space-y-3">
          {[
            { action: 'وسيط جديد', detail: 'أحمد محمد انضم كوسيط', time: 'منذ 5 دقائق', color: 'bg-blue-500' },
            { action: 'عقار جديد', detail: 'فيلا فاخرة في التجمع الخامس', time: 'منذ 12 دقيقة', color: 'bg-emerald-500' },
            { action: 'صفقة مكتملة', detail: 'شقة في المعادي - 2.5M ج.م', time: 'منذ 30 دقيقة', color: 'bg-purple-500' },
            { action: 'شراء رصيد', detail: 'وسيط اشترى باقة 1000 رصيد', time: 'منذ ساعة', color: 'bg-amber-500' },
            { action: 'AI Analysis', detail: 'تم تحليل 50 عقار جديد', time: 'منذ ساعتين', color: 'bg-rose-500' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className={`w-2 h-2 rounded-full ${activity.color} flex-shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-slate-500 truncate">{activity.detail}</p>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
