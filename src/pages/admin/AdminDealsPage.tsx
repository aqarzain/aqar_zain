import { useState } from 'react';
import { DataTable } from '@/components/dashboard/tables/DataTable';
import { Button } from '@/components/foundation/Button/Button';
import { formatPriceCompact, formatDate } from '@/utils/formatters';
import { cn } from '@/utils/helpers';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const MOCK_DEALS = [
  { id: '1', property: 'فيلا في التجمع', buyer: 'عميل 1', seller: 'حسن محمد', price: 5500000, commission: 110000, status: 'completed', date: '2025-06-01' },
  { id: '2', property: 'شقة في المعادي', buyer: 'عميل 2', seller: 'أحمد علي', price: 2500000, commission: 50000, status: 'pending', date: '2025-06-05' },
  { id: '3', property: 'محل تجاري', buyer: 'عميل 3', seller: 'سارة خالد', price: 1800000, commission: 36000, status: 'cancelled', date: '2025-05-20' },
  { id: '4', property: 'أرض في زايد', buyer: 'عميل 4', seller: 'محمد نور', price: 3200000, commission: 64000, status: 'completed', date: '2025-06-10' },
];

export default function AdminDealsPage() {
  const columns = [
    { header: 'العقار', accessor: 'property', render: (v: string) => <span className="text-sm font-medium">{v}</span> },
    { header: 'المشتري', accessor: 'buyer', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { header: 'الوسيط', accessor: 'seller', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    { header: 'السعر', accessor: 'price', render: (v: number) => <span className="text-sm font-medium">{formatPriceCompact(v)}</span> },
    { header: 'العمولة', accessor: 'commission', render: (v: number) => <span className="text-sm text-emerald-600 font-medium">{formatPriceCompact(v)}</span> },
    {
      header: 'الحالة', accessor: 'status',
      render: (v: string) => (
        <span className={cn('badge text-xs', v === 'completed' ? 'badge-ai-high' : v === 'pending' ? 'badge-ai-medium' : 'badge-ai-low')}>
          {v === 'completed' ? 'مكتملة' : v === 'pending' ? 'معلقة' : 'ملغية'}
        </span>
      ),
    },
    { header: 'التاريخ', accessor: 'date', render: (v: string) => <span className="text-xs text-slate-500">{formatDate(v)}</span> },
    { header: 'إجراءات', accessor: 'id', render: () => <Button variant="ghost" size="xs"><Eye className="w-4 h-4" /></Button> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">إدارة الصفقات</h1>
        <p className="text-slate-500 text-sm">متابعة جميع صفقات المنصة</p>
      </div>
      <DataTable columns={columns} data={MOCK_DEALS} />
    </div>
  );
}
