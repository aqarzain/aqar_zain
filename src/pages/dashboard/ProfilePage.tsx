import { useState } from 'react';
import { useAuth } from '@/components/user/auth/AuthContext';
import { TextInput } from '@/components/foundation/Input/TextInput';
import { Button } from '@/components/foundation/Button/Button';
import { getInitials, getImageUrl } from '@/utils/helpers';
import { Camera, Save, User, Mail, Phone, MapPin, FileText, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">الملف الشخصي</h1>
        <p className="text-slate-500 text-sm mt-1">إدارة معلوماتك الشخصية</p>
      </div>

      {/* Avatar Section */}
      <div className="card p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center overflow-hidden ring-4 ring-primary-50 dark:ring-primary-500/10">
              {user?.avatar ? (
                <img src={getImageUrl(user.avatar)} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-primary-600">
                  {getInitials(user?.name || 'مستخدم')}
                </span>
              )}
            </div>
            <button className="absolute bottom-0 end-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</h3>
            <p className="text-sm text-slate-500">{user?.email}</p>
            <p className="text-xs text-slate-400 mt-1">
              {user?.is_verified ? '✅ موثق' : '⏳ قيد التوثيق'}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white">المعلومات الشخصية</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'إلغاء' : 'تعديل'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="الاسم"
            defaultValue={user?.name}
            disabled={!isEditing}
            leftIcon={<User className="w-4 h-4" />}
          />
          <TextInput
            label="البريد الإلكتروني"
            defaultValue={user?.email}
            disabled
            leftIcon={<Mail className="w-4 h-4" />}
          />
          <TextInput
            label="رقم الهاتف"
            defaultValue={user?.phone}
            disabled={!isEditing}
            leftIcon={<Phone className="w-4 h-4" />}
          />
          <TextInput
            label="المدينة"
            defaultValue=""
            disabled={!isEditing}
            leftIcon={<MapPin className="w-4 h-4" />}
          />
        </div>

        {isEditing && (
          <div className="flex gap-3 pt-2">
            <Button variant="primary" leftIcon={<Save className="w-4 h-4" />}>
              حفظ التغييرات
            </Button>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white">المستندات</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
            <FileText className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">الرقم القومي</p>
              <p className="text-xs text-slate-500">{user?.national_id || 'غير مرفوع'}</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
            <Shield className="w-8 h-8 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">السجل التجاري</p>
              <p className="text-xs text-slate-500">{user?.commercial_register || 'غير مرفوع'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 border-red-200 dark:border-red-900">
        <h3 className="font-bold text-red-600 mb-2">منطقة الخطر</h3>
        <p className="text-sm text-slate-500 mb-4">
          حذف الحساب نهائي ولا يمكن التراجع عنه
        </p>
        <Button variant="danger" size="sm">
          حذف الحساب
        </Button>
      </div>
    </div>
  );
}
