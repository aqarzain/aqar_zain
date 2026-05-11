import { z } from 'zod';

// =============================================
// ✅ Validators - AqarZain Forms
// =============================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('بريد إلكتروني غير صالح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  remember_me: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'الاسم مطلوب')
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'الاسم طويل جداً'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('بريد إلكتروني غير صالح'),
  phone: z
    .string()
    .min(1, 'رقم الهاتف مطلوب')
    .regex(/^(01[0-9]|00201)[0-9]{8,9}$/, 'رقم هاتف غير صالح'),
  password: z
    .string()
    .min(1, 'كلمة المرور مطلوبة')
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير')
    .regex(/[0-9]/, 'كلمة المرور يجب أن تحتوي على رقم'),
  password_confirmation: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  accept_terms: z.literal(true, {
    errorMap: () => ({ message: 'يجب الموافقة على الشروط والأحكام' }),
  }),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'كلمات المرور غير متطابقة',
  path: ['password_confirmation'],
});

export const listingSchema = z.object({
  title: z
    .string()
    .min(1, 'العنوان مطلوب')
    .min(5, 'العنوان يجب أن يكون 5 أحرف على الأقل')
    .max(200, 'العنوان طويل جداً'),
  description: z
    .string()
    .min(1, 'الوصف مطلوب')
    .min(20, 'الوصف يجب أن يكون 20 حرف على الأقل'),
  property_type: z.enum(['apartment', 'villa', 'townhouse', 'duplex', 'shop', 'land'], {
    errorMap: () => ({ message: 'نوع العقار مطلوب' }),
  }),
  transaction_type: z.enum(['sale', 'rent'], {
    errorMap: () => ({ message: 'نوع المعاملة مطلوب' }),
  }),
  finish_type: z.enum(['super_lux', 'luxury', 'normal'], {
    errorMap: () => ({ message: 'نوع التشطيب مطلوب' }),
  }),
  price: z
    .number({ required_error: 'السعر مطلوب' })
    .min(1, 'السعر يجب أن يكون أكبر من 0'),
  area: z
    .number({ required_error: 'المساحة مطلوبة' })
    .min(1, 'المساحة يجب أن تكون أكبر من 0'),
  rooms: z.number().min(0, 'عدد الغرف غير صالح').optional(),
  bathrooms: z.number().min(0, 'عدد الحمامات غير صالح').optional(),
  city: z.string().min(1, 'المدينة مطلوبة'),
  district: z.string().min(1, 'الحي مطلوب'),
  images: z.array(z.instanceof(File)).min(1, 'صورة واحدة على الأقل مطلوبة'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ListingFormData = z.infer<typeof listingSchema>;
