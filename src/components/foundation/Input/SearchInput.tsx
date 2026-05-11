import { forwardRef, useState, useCallback, type InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { debounce } from '@/utils/helpers';

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (value: string) => void;
  onClear?: () => void;
  debounceMs?: number;
  size?: 'sm' | 'md' | 'lg';
  showAIButton?: boolean;
}

const sizeStyles = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-sm',
  lg: 'h-14 text-base',
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      onClear,
      debounceMs = 300,
      size = 'md',
      showAIButton = false,
      className,
      placeholder = 'ابحث عن عقار...',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState('');

    const debouncedSearch = useCallback(
      debounce((searchValue: string) => {
        onSearch(searchValue);
      }, debounceMs),
      [onSearch, debounceMs]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      debouncedSearch(newValue);
    };

    const handleClear = () => {
      setValue('');
      onSearch('');
      onClear?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSearch(value);
      }
    };

    return (
      <div className={cn('relative w-full', className)}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className={cn('text-slate-400', size === 'lg' ? 'w-5 h-5' : 'w-4 h-4')} />
        </div>
        
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full ps-10 pe-10 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            sizeStyles[size]
          )}
          {...props}
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
