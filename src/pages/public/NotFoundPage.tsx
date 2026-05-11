import { Link } from 'react-router-dom';
import { Button } from '@/components/foundation/Button/Button';
import { ROUTES } from '@/utils/constants';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold gold-gradient-text mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          الصفحة غير موجودة
        </h1>
        <p className="text-slate-500 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to={ROUTES.home}>
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
              العودة للرئيسية
            </Button>
          </Link>
          <Link to={ROUTES.listings}>
            <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
              تصفح العقارات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
