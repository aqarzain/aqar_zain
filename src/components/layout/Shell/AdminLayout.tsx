import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from '@/components/layout/Navbar/DashboardNavbar';
import { AdminSidebar } from '@/components/layout/Sidebar/AdminSidebar';
import { useUIStore } from '@/stores/useUIStore';
import { cn } from '@/utils/helpers';

export const AdminLayout = () => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardNavbar />
      <AdminSidebar />
      
      <main
        className={cn(
          'pt-16 transition-all duration-300',
          sidebarOpen ? 'lg:me-64' : 'lg:me-20'
        )}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
