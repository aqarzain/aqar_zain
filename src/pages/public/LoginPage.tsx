import { Link } from 'react-router-dom';
import { LoginForm } from '@/components/user/auth/LoginForm';
import { ROUTES } from '@/utils/constants';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">تسجيل الدخول</h1>
          <p className="text-slate-500 mt-1">مرحباً بعودتك إلى عقار زين</p>
        </div>

        {/* Form Card */}
        <div className="card p-6 sm:p-8">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-400 mt-6">
          بالدخول، أنت توافق على{' '}
          <Link to={ROUTES.terms} className="text-primary-500 hover:underline">الشروط</Link>
          {' '}و{' '}
          <Link to={ROUTES.privacy} className="text-primary-500 hover:underline">الخصوصية</Link>
        </p>
      </div>
    </div>
  );
}
