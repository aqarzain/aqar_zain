import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, User, Mail, Phone, Lock, UserPlus } from 'lucide-react';
import { TextInput } from '@/components/foundation/Input/TextInput';
import { Button } from '@/components/foundation/Button/Button';
import { registerSchema, type RegisterFormData } from '@/utils/validators';
import { useAuth } from '@/components/user/auth/AuthContext';
import { ROUTES } from '@/utils/constants';
import toast from 'react-hot-toast';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      toast.success('تم إنشاء الحساب بنجاح');
      navigate(ROUTES.dashboard.home);
    } catch {
      toast.error('حدث خطأ في إنشاء الحساب');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextInput
        label="الاسم الكامل"
        placeholder="محمد أحمد"
        leftIcon={<User className="w-4 h-4" />}
        error={errors.name?.message}
        {...register('name')}
      />

      <TextInput
        label="البريد الإلكتروني"
        type="email"
        placeholder="example@email.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register('email')}
      />

      <TextInput
        label="رقم الهاتف"
        type="tel"
        placeholder="0100 000 0000"
        leftIcon={<Phone className="w-4 h-4" />}
        error={errors.phone?.message}
        {...register('phone')}
      />

      <TextInput
        label="كلمة المرور"
        type={showPassword ? 'text' : 'password'}
        placeholder="8 أحرف على الأقل"
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-slate-400"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
        hint="يجب أن تحتوي على حرف كبير ورقم"
        error={errors.password?.message}
        {...register('password')}
      />

      <TextInput
        label="تأكيد كلمة المرور"
        type={showConfirm ? 'text' : 'password'}
        placeholder="أعد كتابة كلمة المرور"
        leftIcon={<Lock className="w-4 h-4" />}
        error={errors.password_confirmation?.message}
        {...register('password_confirmation')}
      />

      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 mt-0.5 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
          {...register('accept_terms')}
        />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          أوافق على{' '}
          <Link to={ROUTES.terms} className="text-primary-500 hover:underline">
            الشروط والأحكام
          </Link>{' '}
          و{' '}
          <Link to={ROUTES.privacy} className="text-primary-500 hover:underline">
            سياسة الخصوصية
          </Link>
        </span>
      </label>
      {errors.accept_terms && (
        <p className="text-sm text-red-500">{errors.accept_terms.message}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        leftIcon={<UserPlus className="w-4 h-4" />}
      >
        إنشاء حساب
      </Button>

      <p className="text-center text-sm text-slate-500">
        لديك حساب بالفعل؟{' '}
        <Link to={ROUTES.login} className="text-primary-500 hover:text-primary-600 font-medium">
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
};
