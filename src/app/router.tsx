import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LoadingScreen } from '@/components/foundation/Feedback/LoadingScreen';
import { PublicLayout } from '@/components/layout/Shell/PublicLayout';
import { DashboardLayout } from '@/components/layout/Shell/DashboardLayout';
import { AdminLayout } from '@/components/layout/Shell/AdminLayout';
import { useAuthStore } from '@/stores/useAuthStore';

// =============================================
// 🧭 Lazy Loaded Pages
// =============================================

// Public Pages
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const ListingsPage = lazy(() => import('@/pages/public/ListingsPage'));
const SearchPage = lazy(() => import('@/pages/public/SearchPage'));
const ListingDetailPage = lazy(() => import('@/pages/public/ListingDetailPage'));
const LoginPage = lazy(() => import('@/pages/public/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/public/RegisterPage'));
const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const ContactPage = lazy(() => import('@/pages/public/ContactPage'));
const FAQPage = lazy(() => import('@/pages/public/FAQPage'));
const TermsPage = lazy(() => import('@/pages/public/TermsPage'));
const PrivacyPage = lazy(() => import('@/pages/public/PrivacyPage'));
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'));

// Dashboard Pages
const DashboardHomePage = lazy(() => import('@/pages/dashboard/DashboardHomePage'));
const DashboardListingsPage = lazy(() => import('@/pages/dashboard/DashboardListingsPage'));
const ListingFormPage = lazy(() => import('@/pages/dashboard/ListingFormPage'));
const WalletPage = lazy(() => import('@/pages/dashboard/WalletPage'));
const PurchasePage = lazy(() => import('@/pages/dashboard/PurchasePage'));
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage'));
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'));
const FavoritesPage = lazy(() => import('@/pages/dashboard/FavoritesPage'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'));
const AdminBrokersPage = lazy(() => import('@/pages/admin/AdminBrokersPage'));
const AdminListingsPage = lazy(() => import('@/pages/admin/AdminListingsPage'));
const AdminDealsPage = lazy(() => import('@/pages/admin/AdminDealsPage'));

// =============================================
// 🔐 Route Guards
// =============================================

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  
  if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// =============================================
// 🧭 App Router
// =============================================

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          
          {/* Guest Routes */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />
        </Route>
        
        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHomePage />} />
          <Route path="listings" element={<DashboardListingsPage />} />
          <Route path="listings/create" element={<ListingFormPage />} />
          <Route path="listings/:id/edit" element={<ListingFormPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="wallet/purchase" element={<PurchasePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="brokers" element={<AdminBrokersPage />} />
          <Route path="listings" element={<AdminListingsPage />} />
          <Route path="deals" element={<AdminDealsPage />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
