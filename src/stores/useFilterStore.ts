import { create } from 'zustand';
import type { ListingFilters } from '@/types/api/listing.types';

interface FilterState {
  filters: ListingFilters;
  sortBy: string;
  viewMode: 'grid' | 'list' | 'map';
  
  setFilters: (filters: Partial<ListingFilters>) => void;
  resetFilters: () => void;
  setSortBy: (sort: string) => void;
  setViewMode: (mode: 'grid' | 'list' | 'map') => void;
  removeFilter: (key: keyof ListingFilters) => void;
}

const DEFAULT_FILTERS: ListingFilters = {};

export const useFilterStore = create<FilterState>((set) => ({
  filters: DEFAULT_FILTERS,
  sortBy: 'latest',
  viewMode: 'grid',
  
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
    
  resetFilters: () => set({ filters: DEFAULT_FILTERS, sortBy: 'latest' }),
  
  setSortBy: (sortBy) => set({ sortBy }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  removeFilter: (key) =>
    set((state) => {
      const newFilters = { ...state.filters };
      delete newFilters[key];
      return { filters: newFilters };
    }),
}));
