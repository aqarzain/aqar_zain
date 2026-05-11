import { useState } from 'react';
import { Button } from '@/components/foundation/Button/Button';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { formatRelativeTime } from '@/utils/formatters';
import { cn } from '@/utils/helpers';
import { Bell, Brain, Handshake, Wallet, Info, Check, Trash2, Filter } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'ai', title: 'تحديث AI Score', message: 'تم تحديث تقييم عقارك "فيلا في التجمع" إلى 85', is_read: false, created_at: '2026-05-10T08:30:00' },
  { id: '2', type: 'deal', title: 'صفقة جديدة', message: 'تم تسجيل صفقة جديدة على عقارك "شقة في المعادي"', is_read: false, created_at: '2026-05-10T07:15:00' },
  { id: '3', type: 'wallet', title: 'رصيد مجاني', message: 'تم إضافة 50 رصيد مجاني إلى محفظتك', is_read: true, created_at: '2026-05-09T18:00:00' },
  { id: '4', type: 'system', title: 'تحديث النظام', message: 'تم تحديث المنصة إلى الإصدار الجديد', is_read: true, created_at: '2026-05-09T10:00:00' },
  { id: '5', type: 'ai', title: 'تنبيه AI', message: 'عقارك في الشيخ زايد يحتاج إلى تعديل السعر', is_read: false, created_at: '2026-05-08T14:00:00' },
];

const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  ai: { icon: Brain, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  deal: { icon: Handshake, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  wallet: { icon: Wallet, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20' },
  system: { icon: Info, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const filtered = filter === 'all' ? notifications : filter === 'unread' ? notifications.filter((n) => !n.is_read) : notifications.filter((n) => n.is_read);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
  };

  const clearAll = () => setNotifications([]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6" />
            الإشعارات
            {unreadCount > 0 && <span className="badge bg-red-500 text-white text-xs">{unreadCount} جديدة</span>}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={markAllRead} leftIcon={<Check className="w-4 h-4" />}>تعليم الكل كمقروء</Button>
          <Button variant="ghost" size="sm" onClick={clearAll} leftIcon={<Trash2 className="w-4 h-4 text-red-500" />}>حذف الكل</Button>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 w-fit">
        {['all', 'unread', 'read'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-colors', filter === f ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500')}>
            {f === 'all' ? 'الكل' : f === 'unread' ? 'غير مقروءة' : 'مقروءة'}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system;
            const Icon = config.icon;
            return (
              <div key={notif.id} className={cn('card p-4 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800', !notif.is_read && 'border-s-4 border-s-primary-500')}>
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', config.bg)}>
                  <Icon className={cn('w-5 h-5', config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{notif.title}</h4>
                    {!notif.is_read && <span className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-slate-500">{notif.message}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0">{formatRelativeTime(notif.created_at)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={<Bell />} title="لا توجد إشعارات" description="أنت على اطلاع بكل شيء" />
      )}
    </div>
  );
}
