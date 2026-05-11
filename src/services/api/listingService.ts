import { api } from './apiClient';

export const listingService = {
  getAll: (params?: any) => api.get('/listings', params),
  getFeatured: (limit = 6) => api.get('/listings', { limit, featured: 1 }),
  getLatest: (limit = 6) => api.get('/listings', { limit }),
  getById: (id: string) => api.get(`/listings/${id}`),
  getMyListings: (params?: any) => api.get('/listings', params),
  create: (data: any) => api.post('/listings', data),
  update: (id: string, data: any) => api.put(`/listings/${id}`, data),
  delete: (id: string) => api.delete(`/listings/${id}`),
  toggleFeatured: (id: string) => api.post(`/listings/${id}/toggle-featured`),
};
