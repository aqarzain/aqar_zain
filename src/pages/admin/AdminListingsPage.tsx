import { useState } from 'react';
import { DataTable } from '@/components/dashboard/tables/DataTable';
import { SearchInput } from '@/components/foundation/Input/SearchInput';
import { Button } from '@/components/foundation/Button/Button';
import { cn, getImageUrl } from '@/utils/helpers';
import { formatPriceCompact, formatDate } from '@/utils/formatters';
import { Trash2, CheckCircle, XCircle, Star, Eye } from 'lucide-react';

const MOCK_LISTINGS = [
  { id: '1', title: 'فيلا فاخرة في التجمع', price: 5500000, city: 'القاهرة', district: 'التجمع الخامس', status: 'active', is_featured: true, ai_score: 85, views: 2340, broker: 'حسن محمد', created_at: '2025-06-01' },
  { id: '2', title: 'شقة متميزة في المعادي', price: 2500000, city: 'القاهرة', district: 'المعادي', status: 'active', is_featured: false, ai_score: 72, views: 890, broker: 'أحمد علي', created_at: '2025-06-05' },
  { id: '3', title: 'محل تجاري في وسط البلد', price: 1800000, city: 'القاهرة', district: 'وسط البلد', status: 'inactive', is_featured: false, ai_score: 45, views: 120, broker: 'سارة خالد', created_at: '2025-05-20' },
  { id: '4', title: 'أرض للبيع في الشيخ زايد', price: 3200000, city: 'الجيزة', district: 'الشيخ زايد', status: 'active', is_featured: true, ai_score: 91, views: 5600, broker: 'محمد نور', created_at: '2025-06-10' },
];

export default function AdminListingsPage() {
  const [search, setSearch] = useState('');

  const columns = [
    {
      header: 'العقار',
      accessor: 'title',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{row.title}</p>
            <p className="text-xs text-slate-500">{row.district}، {row.city}</p>
          </div>
          {row.is_featured && <Star className="w-3.5 h-3.5 text-primary-500 fill-primary-500 flex-shrink-0" />}
        </div>
      ),
    },
    { header: 'السعر', accessor: 'price', render: (v: number) => <span className="text-sm font-medium">{formatPriceCompact(v)}</span> },
    { header: 'AI', accessor: 'ai_score', render: (v: number) => <span className={cn('badge text-xs font-bold', v >= 80 ? 'badge-ai-high' : v >= 60 ? 'badge-ai-medium' : 'badge-ai-low')}>{v}</span> },
    { header: 'مشاهدات', accessor: 'views', render: (v: number) => <span className="text-sm flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{v}</span> },
    { header: 'الوسيط', accessor: 'broker', render: (v: string) => <span className="text-sm text-slate-600">{v}</span> },
    {
      header: 'الحالة', accessor: 'status',
      render: (v: string) => <span className={cn('badge text-xs', v === 'active' ? 'badge-ai-high' : 'badge bg-slate-100 text-slate-600')}>{v === 'active' ? 'نشط' : 'غير نشط'}</span>,
    },
    { header: 'التاريخ', accessor: 'created_at', render: (v: string) => <span className="text-xs text-slate-500">{formatDate(v)}</span> },
    {
      header: 'إجراءات', accessor: 'id',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="xs"><CheckCircle className="w-4 h-4 text-emerald-500" /></Button>
          <Button variant="ghost" size="xs"><XCircle className="w-4 h-4 text-red-500" /></Button>
          <Button variant="ghost" size="xs"><Trash2 className="w-4 h-4 text-red-400" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">إدارة العقارات</h1>
          <p className="text-slate-500 text-sm">مراجعة وإدارة جميع العقارات</p>
        </div>
        <SearchInput onSearch={setSearch} size="sm" placeholder="بحث عن عقار..." className="max-w-xs" />
      </div>
      <DataTable columns={columns} data={MOCK_LISTINGS} />
    </div>
  );
}
