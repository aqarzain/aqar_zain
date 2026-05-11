import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { TextInput } from '@/components/foundation/Input/TextInput';
import { Button } from '@/components/foundation/Button/Button';
import { loginSchema, type LoginFormData } from '@/utils/validators';
import { useAuth } from '@/components/user/auth/AuthContext';
import { ROUTES } from '@/utils/constants';
import toast from 'react-hot-toast';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('تم تسجيل الدخول بنجاح');
      navigate(ROUTES.dashboard.home);
    } catch {
      toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <TextInput
        label="البريد الإلكتروني"
        type="email"
        placeholder="example@email.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <div>
        <TextInput
          label="كلمة المرور"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            {...register('remember_me')}
          />
          <span className="text-sm text-slate-600 dark:text-slate-400">تذكرني</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          نسيت كلمة المرور؟
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        leftIcon={<LogIn className="w-4 h-4" />}
      >
        تسجيل الدخول
      </Button>

      <p className="text-center text-sm text-slate-500">
        ليس لديك حساب؟{' '}
        <Link to={ROUTES.register} className="text-primary-500 hover:text-primary-600 font-medium">
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
};
