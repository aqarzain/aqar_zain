import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/stores/useUIStore';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import {
  LayoutDashboard,
  Users,
  Building2,
  Handshake,
  DollarSign,
  BarChart3,
  Settings,
  FileText,
  Shield,
} from 'lucide-react';

const ADMIN_LINKS = [
  { href: ROUTES.admin.home, label: 'الرئيسية', icon: LayoutDashboard },
  { href: ROUTES.admin.brokers, label: 'الوسطاء', icon: Users },
  { href: ROUTES.admin.listings, label: 'العقارات', icon: Building2 },
  { href: ROUTES.admin.deals, label: 'الصفقات', icon: Handshake },
  { href: ROUTES.admin.revenue, label: 'الإيرادات', icon: DollarSign },
  { href: ROUTES.admin.statistics, label: 'الإحصائيات', icon: BarChart3 },
  { href: ROUTES.admin.settings, label: 'الإعدادات', icon: Settings },
  { href: ROUTES.admin.auditLogs, label: 'سجل النشاط', icon: FileText },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  const isActive = (href: string) => {
    if (href === ROUTES.admin.home) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'fixed top-16 end-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-s border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-y-auto',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Admin Badge */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/25">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                المدير
              </p>
              <p className="text-xs text-slate-500">صلاحيات كاملة</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-1">
        {ADMIN_LINKS.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              )}
              title={!sidebarOpen ? link.label : undefined}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{link.label}</span>}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
