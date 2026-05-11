import { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/foundation/Button/Button';
import { useFilterStore } from '@/stores/useFilterStore';
import { PROPERTY_TYPES, TRANSACTION_TYPES, SORT_OPTIONS, EGYPTIAN_CITIES } from '@/utils/constants';
import { cn } from '@/utils/helpers';

interface FilterBarProps {
  totalResults?: number;
  onFilterChange?: () => void;
  className?: string;
}

export const FilterBar = ({
  totalResults = 0,
  onFilterChange,
  className,
}: FilterBarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { filters, sortBy, setFilters, setSortBy, resetFilters, removeFilter } = useFilterStore();

  const handleFilterChange = (key: string, value: string | number | undefined) => {
    if (!value) {
      removeFilter(key as keyof typeof filters);
    } else {
      setFilters({ [key]: value });
    }
    onFilterChange?.();
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {totalResults.toLocaleString('ar-EG')} عقار
          </span>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            leftIcon={<SlidersHorizontal className="w-4 h-4" />}
          >
            الفلاتر
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm border border-slate-300 dark:border-slate-600 rounded-xl px-3 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {Object.entries(SORT_OPTIONS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            const label = typeof value === 'string'
              ? PROPERTY_TYPES[value as keyof typeof PROPERTY_TYPES]
                || TRANSACTION_TYPES[value as keyof typeof TRANSACTION_TYPES]
                || value
              : value;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 text-xs font-medium"
              >
                {label}
                <button onClick={() => removeFilter(key as keyof typeof filters)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={resetFilters}
            className="text-xs text-red-500 hover:text-red-600 font-medium"
          >
            مسح الكل
          </button>
        </div>
      )}

      {/* Expanded Filters */}
      {isFilterOpen && (
        <div className="card p-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Property Type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">نوع العقار</label>
              <select
                value={filters.property_type || ''}
                onChange={(e) => handleFilterChange('property_type', e.target.value)}
                className="input text-sm"
              >
                <option value="">الكل</option>
                {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">نوع المعاملة</label>
              <select
                value={filters.transaction_type || ''}
                onChange={(e) => handleFilterChange('transaction_type', e.target.value)}
                className="input text-sm"
              >
                <option value="">الكل</option>
                {Object.entries(TRANSACTION_TYPES).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">المدينة</label>
              <select
                value={filters.city || ''}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="input text-sm"
              >
                <option value="">الكل</option>
                {EGYPTIAN_CITIES.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">نطاق السعر</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="من"
                  value={filters.price_min || ''}
                  onChange={(e) => handleFilterChange('price_min', e.target.value ? Number(e.target.value) : undefined)}
                  className="input text-sm w-full"
                />
                <span className="text-slate-400">-</span>
                <input
                  type="number"
                  placeholder="إلى"
                  value={filters.price_max || ''}
                  onChange={(e) => handleFilterChange('price_max', e.target.value ? Number(e.target.value) : undefined)}
                  className="input text-sm w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
