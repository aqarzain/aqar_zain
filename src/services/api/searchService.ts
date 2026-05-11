import { api } from './apiClient';

export const searchService = {
  search: (params: any) => api.get('/search', { params }),
  getFilters: () => api.get('/search/filters'),
};
