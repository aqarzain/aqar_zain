import { Outlet } from 'react-router-dom';
import { PublicNavbar } from '@/components/layout/Navbar/PublicNavbar';
import { PublicFooter } from '@/components/layout/Footer/PublicFooter';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};
