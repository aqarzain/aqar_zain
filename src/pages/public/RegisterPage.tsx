import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/user/auth/RegisterForm';
import { ROUTES } from '@/utils/constants';
import { Building2, Shield, Zap, TrendingUp } from 'lucide-react';

const BROKER_BENEFITS = [
  { icon: TrendingUp, text: 'اعرض عقاراتك لملايين الباحثين' },
  { icon: Zap, text: 'تحليلات AI مجانية لعقاراتك' },
  { icon: Shield, text: 'أدوات احترافية لإدارة العقارات' },
];

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">إنشاء حساب جديد</h1>
          <p className="text-slate-500 mt-1">انضم إلى منصة عقار زين وابدأ رحلتك العقارية</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form */}
          <div className="lg:col-span-3 card p-6 sm:p-8">
            <RegisterForm />
          </div>

          {/* Benefits */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card p-6 bg-gradient-to-br from-primary-50 to-amber-50 dark:from-primary-500/5 dark:to-amber-500/5 border-primary-200 dark:border-primary-800">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                مميزات الانضمام
              </h3>
              <ul className="space-y-3">
                {BROKER_BENEFITS.map((benefit) => (
                  <li key={benefit.text} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-4 h-4 text-primary-500" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-4 text-center text-sm text-slate-500">
              لديك حساب بالفعل؟{' '}
              <Link to={ROUTES.login} className="text-primary-500 hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
