import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchInput } from '@/components/foundation/Input/SearchInput';
import { FilterBar } from '@/components/property/filters/FilterBar';
import { PropertyGrid } from '@/components/property/cards/PropertyGrid';
import { EmptyState } from '@/components/foundation/Feedback/EmptyState';
import { searchService } from '@/services/api/searchService';
import { SearchX, Clock } from 'lucide-react';

const RECENT_SEARCHES_KEY = 'aqarzain_recent_searches';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const searchQuery = useQuery({
    queryKey: ['search', { q: query }],
    queryFn: () => searchService.search({ query }),
    enabled: query.length > 0,
  });

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams(value ? { q: value } : {});

    if (value.trim()) {
      const updated = [value, ...recentSearches.filter((s) => s !== value)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  };

  const results = searchQuery.data?.data || [];
  const totalResults = searchQuery.data?.meta?.total || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-6">
          بحث متقدم
        </h1>
        <SearchInput
          onSearch={handleSearch}
          size="lg"
          placeholder="ابحث عن عقار، منطقة، نوع..."
          defaultValue={query}
        />
      </div>

      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            آخر عمليات البحث
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => handleSearch(search)}
                className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query && (
        <>
          <div className="mb-4">
            <p className="text-sm text-slate-500">
              {totalResults > 0
                ? `تم العثور على ${totalResults} نتيجة لـ "${query}"`
                : `لا توجد نتائج لـ "${query}"`}
            </p>
          </div>

          <PropertyGrid
            listings={results}
            isLoading={searchQuery.isLoading}
          />

          {!searchQuery.isLoading && results.length === 0 && (
            <EmptyState
              icon={<SearchX />}
              title="لا توجد نتائج"
              description="لم نجد أي عقارات تطابق بحثك، جرب كلمات بحث مختلفة"
            />
          )}
        </>
      )}
    </div>
  );
}
