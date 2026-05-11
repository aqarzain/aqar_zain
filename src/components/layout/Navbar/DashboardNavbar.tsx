import { Link } from 'react-router-dom';
import { useAuth } from '@/components/user/auth/AuthContext';
import { useTheme } from '@/components/foundation/Layout/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  Search,
} from 'lucide-react';

export const DashboardNavbar = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <header className="fixed top-0 start-0 end-0 z-40 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={sidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <Link to={ROUTES.home} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
              <span className="text-sm font-bold text-white">ز</span>
            </div>
            <span className="text-sm font-semibold text-slate-800 dark:text-white hidden sm:block">
              لوحة التحكم
            </span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Search className="w-4 h-4" />
          </button>

          {/* Messages */}
          <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-primary-500 rounded-full" />
          </button>

          {/* Notifications */}
          <Link
            to={ROUTES.dashboard.notifications}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 end-1 w-2 h-2 bg-red-500 rounded-full" />
          </Link>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User */}
          <div className="flex items-center gap-2 pe-2 border-e border-slate-200 dark:border-slate-700 me-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                {user?.name?.charAt(0) || 'م'}
              </span>
            </div>
            <div className="hidden md:block text-end">
              <p className="text-sm font-medium text-slate-800 dark:text-white leading-tight">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 leading-tight">وسيط عقاري</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
