import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '@/stores/useUIStore';
import { useAuth } from '@/components/user/auth/AuthContext';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Handshake,
  Wallet,
  ShoppingCart,
  BarChart3,
  User,
  Bell,
  Heart,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

const SIDEBAR_LINKS = [
  { href: ROUTES.dashboard.home, label: 'الرئيسية', icon: LayoutDashboard },
  { href: ROUTES.dashboard.listings, label: 'عقاراتي', icon: Building2 },
  { href: ROUTES.dashboard.createListing, label: 'إضافة عقار', icon: PlusCircle },
  { href: ROUTES.dashboard.deals, label: 'الصفقات', icon: Handshake },
  { href: ROUTES.dashboard.wallet, label: 'المحفظة', icon: Wallet },
  { href: ROUTES.dashboard.purchase, label: 'شراء رصيد', icon: ShoppingCart },
  { href: ROUTES.dashboard.analytics, label: 'التحليلات', icon: BarChart3 },
  { href: ROUTES.dashboard.favorites, label: 'المفضلة', icon: Heart },
  { href: ROUTES.dashboard.notifications, label: 'الإشعارات', icon: Bell },
  { href: ROUTES.dashboard.profile, label: 'الملف الشخصي', icon: User },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (href === ROUTES.dashboard.home) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 end-0 bottom-0 z-40 bg-white dark:bg-slate-900 border-s border-slate-200 dark:border-slate-800 transition-all duration-300 overflow-y-auto',
          sidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                )}
                title={!sidebarOpen ? link.label : undefined}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
                {active && sidebarOpen && (
                  <div className="me-auto w-1.5 h-1.5 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 w-full transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex absolute top-4 -start-3 w-6 h-6 rounded-full bg-primary-500 text-white items-center justify-center shadow-lg hover:bg-primary-600 transition-colors"
        >
          <ChevronLeft
            className={cn(
              'w-3 h-3 transition-transform',
              !sidebarOpen && 'rotate-180'
            )}
          />
        </button>
      </aside>
    </>
  );
};
