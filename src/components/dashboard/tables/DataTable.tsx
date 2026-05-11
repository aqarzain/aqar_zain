import { Button } from '@/components/foundation/Button/Button';
import { cn } from '@/utils/helpers';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const DataTable = ({
  columns,
  data,
  page = 1,
  totalPages = 1,
  onPageChange,
  className,
}: DataTableProps) => {
  return (
    <div className={cn('card overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="text-start text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-3">
                    {col.render
                      ? col.render(row[col.accessor], row)
                      : (
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {row[col.accessor]}
                        </span>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
          <span className="text-sm text-slate-500">
            صفحة {page} من {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="secondary"
              size="xs"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="xs"
              disabled={page >= totalPages}
              onClick={() => onPageChange?.(page + 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
