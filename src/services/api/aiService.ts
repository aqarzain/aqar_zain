import { api } from './apiClient';

export const aiService = {
  getScore: (id: string) => api.get(`/listings/${id}/ai-score`),
  getSimilar: (id: string, limit = 4) => api.get(`/listings/${id}/similar`, { params: { limit } }),
};
