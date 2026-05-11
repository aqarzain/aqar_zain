import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/utils/helpers';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav className={cn('flex items-center gap-1 text-sm', className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.href} className="flex items-center gap-1">
            {index > 0 && <ChevronLeft className="w-4 h-4 text-slate-400" />}
            {isLast ? (
              <span className="text-slate-900 dark:text-white font-medium truncate max-w-[200px]">{item.label}</span>
            ) : (
              <Link to={item.href} className="text-slate-500 hover:text-primary-500 transition-colors truncate max-w-[150px]">{item.label}</Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
