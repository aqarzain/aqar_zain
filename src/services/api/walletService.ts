import { api } from './apiClient';

export const walletService = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: (params?: any) => api.get('/wallet/transactions', params),
  getPackages: () => api.get('/wallet/packages'),
  purchase: (data: any) => api.post('/wallet/purchase', data),
};
