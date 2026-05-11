import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/components/user/auth/AuthContext';
import { useTheme } from '@/components/foundation/Layout/ThemeContext';
import { useUIStore } from '@/stores/useUIStore';
import { Button } from '@/components/foundation/Button/Button';
import { SearchInput } from '@/components/foundation/Input/SearchInput';
import { ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import {
  Home,
  Building2,
  Menu,
  X,
  Moon,
  Sun,
  User,
  LogOut,
  LayoutDashboard,
  Wallet,
  Bell,
  Heart,
  Settings,
  ChevronDown,
  Globe,
} from 'lucide-react';

const NAV_LINKS = [
  { href: ROUTES.home, label: 'الرئيسية', icon: Home },
  { href: ROUTES.listings, label: 'العقارات', icon: Building2 },
  { href: ROUTES.about, label: 'من نحن', icon: null },
  { href: ROUTES.contact, label: 'اتصل بنا', icon: null },
];

export const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, setLanguage } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `${ROUTES.search}?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg border-b border-slate-200/50 dark:border-slate-700/50'
          : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to={ROUTES.home} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-gold-glow">
              <span className="text-xl font-bold text-white">ز</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                عقار زين
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                المنصة العقارية الذكية
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search + Actions */}
          <div className="hidden lg:flex items-center gap-3 flex-1 max-w-md mx-4">
            <SearchInput
              onSearch={handleSearch}
              size="sm"
              placeholder="ابحث عن عقار..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="تغيير اللغة"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {user?.name?.charAt(0) || 'م'}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden md:block">
                    {user?.name || 'المستخدم'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute top-full end-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20 animate-scale-in">
                      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>
                      <Link
                        to={ROUTES.dashboard.home}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        لوحة التحكم
                      </Link>
                      <Link
                        to={ROUTES.dashboard.wallet}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Wallet className="w-4 h-4" />
                        المحفظة
                      </Link>
                      <Link
                        to={ROUTES.dashboard.favorites}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Heart className="w-4 h-4" />
                        المفضلة
                      </Link>
                      <Link
                        to={ROUTES.dashboard.profile}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <Settings className="w-4 h-4" />
                        الإعدادات
                      </Link>
                      <hr className="my-1 border-slate-200 dark:border-slate-700" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        تسجيل الخروج
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to={ROUTES.login}>
                  <Button variant="ghost" size="sm">
                    دخول
                  </Button>
                </Link>
                <Link to={ROUTES.register}>
                  <Button variant="primary" size="sm">
                    حساب جديد
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-slide-down">
          <div className="p-4 space-y-2">
            <div className="mb-3">
              <SearchInput
                onSearch={handleSearch}
                size="sm"
                placeholder="ابحث عن عقار..."
              />
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {link.icon && <link.icon className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link to={ROUTES.login} className="flex-1">
                  <Button variant="outline" size="sm" fullWidth>
                    دخول
                  </Button>
                </Link>
                <Link to={ROUTES.register} className="flex-1">
                  <Button variant="primary" size="sm" fullWidth>
                    حساب جديد
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
