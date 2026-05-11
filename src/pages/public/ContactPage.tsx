import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { TextInput } from '@/components/foundation/Input/TextInput';
import { Button } from '@/components/foundation/Button/Button';

const CONTACT_INFO = [
  { icon: Phone, label: 'هاتف', value: '0100 000 0000' },
  { icon: Mail, label: 'بريد', value: 'info@aqarzain.com' },
  { icon: MapPin, label: 'العنوان', value: 'القاهرة، مصر' },
  { icon: Clock, label: 'ساعات العمل', value: 'السبت - الخميس، 9 ص - 6 م' },
];

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">اتصل بنا</h1>
        <p className="text-slate-500">نحن هنا للإجابة على استفساراتك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {CONTACT_INFO.map((item) => (
          <div key={item.label} className="card p-4 text-center">
            <item.icon className="w-6 h-6 mx-auto mb-2 text-primary-500" />
            <div className="text-xs text-slate-500 mb-1">{item.label}</div>
            <div className="font-medium text-slate-900 dark:text-white text-sm">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="card p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">أرسل رسالة</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput label="الاسم" placeholder="محمد أحمد" />
            <TextInput label="البريد الإلكتروني" type="email" placeholder="example@email.com" />
          </div>
          <TextInput label="الموضوع" placeholder="موضوع الرسالة" />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              الرسالة
            </label>
            <textarea
              rows={5}
              className="input"
              placeholder="اكتب رسالتك هنا..."
            />
          </div>
          <Button type="submit" variant="primary">إرسال الرسالة</Button>
        </form>
      </div>
    </div>
  );
}
