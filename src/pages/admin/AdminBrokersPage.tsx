import { useState } from 'react';
import { DataTable } from '@/components/dashboard/tables/DataTable';
import { Button } from '@/components/foundation/Button/Button';
import { SearchInput } from '@/components/foundation/Input/SearchInput';
import { cn, getInitials } from '@/utils/helpers';
import { formatDate } from '@/utils/formatters';
import { Search, Filter, CheckCircle, XCircle, MoreHorizontal, Star } from 'lucide-react';

const MOCK_BROKERS = [
  { id: '1', name: 'حسن محمد', email: 'hassan@test.com', phone: '01001234567', listings: 12, deals: 45, rating: 4.8, status: 'active', verified: true, created_at: '2025-01-15' },
  { id: '2', name: 'أحمد علي', email: 'ahmed@test.com', phone: '01007654321', listings: 8, deals: 23, rating: 4.5, status: 'active', verified: true, created_at: '2025-02-20' },
  { id: '3', name: 'سارة خالد', email: 'sara@test.com', phone: '01001112233', listings: 5, deals: 10, rating: 4.2, status: 'inactive', verified: false, created_at: '2025-04-10' },
  { id: '4', name: 'محمد نور', email: 'mohamed@test.com', phone: '01004445566', listings: 20, deals: 78, rating: 4.9, status: 'active', verified: true, created_at: '2024-11-05' },
  { id: '5', name: 'نورا سمير', email: 'noura@test.com', phone: '01007778899', listings: 0, deals: 0, rating: 0, status: 'pending', verified: false, created_at: '2026-05-01' },
];

export default function AdminBrokersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const brokers = MOCK_BROKERS.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search && !b.name.includes(search) && !b.email.includes(search)) return false;
    return true;
  });

  const columns = [
    {
      header: 'الوسيط',
      accessor: 'name',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-600">{getInitials(row.name)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">{row.name}</p>
            <p className="text-xs text-slate-500">{row.email}</p>
          </div>
          {row.verified && <CheckCircle className="w-4 h-4 text-primary-500" />}
        </div>
      ),
    },
    {
      header: 'الهاتف',
      accessor: 'phone',
      render: (value: string) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>,
    },
    {
      header: 'العقارات',
      accessor: 'listings',
      render: (value: number) => <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>,
    },
    {
      header: 'الصفقات',
      accessor: 'deals',
      render: (value: number) => <span className="text-sm font-medium text-slate-900 dark:text-white">{value}</span>,
    },
    {
      header: 'التقييم',
      accessor: 'rating',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-sm">{value.toFixed(1)}</span>
        </div>
      ),
    },
    {
      header: 'الحالة',
      accessor: 'status',
      render: (value: string) => (
        <span className={cn(
          'badge text-xs',
          value === 'active' ? 'badge-ai-high' : value === 'inactive' ? 'badge bg-slate-100 text-slate-600' : 'badge-ai-medium'
        )}>
          {value === 'active' ? 'نشط' : value === 'inactive' ? 'غير نشط' : 'معلق'}
        </span>
      ),
    },
    {
      header: 'التاريخ',
      accessor: 'created_at',
      render: (value: string) => <span className="text-xs text-slate-500">{formatDate(value)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">إدارة الوسطاء</h1>
        <p className="text-slate-500 text-sm mt-1">إدارة جميع الوسطاء المسجلين في المنصة</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchInput onSearch={setSearch} size="sm" placeholder="بحث عن وسيط..." className="max-w-xs" />
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {['all', 'active', 'inactive', 'pending'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-medium transition-colors', statusFilter === s ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500')}
            >
              {s === 'all' ? 'الكل' : s === 'active' ? 'نشط' : s === 'inactive' ? 'غير نشط' : 'معلق'}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={brokers} />
    </div>
  );
}
