import { api } from './apiClient';

export interface Notification {
  id: string;
  type: 'ai' | 'deal' | 'system' | 'wallet';
  title: string;
  message: string;
  is_read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

const NOTIFICATION_ENDPOINTS = {
  index: '/notifications',
  markRead: (id: string) => `/notifications/${id}/read`,
  markAllRead: '/notifications/read-all',
  delete: (id: string) => `/notifications/${id}`,
  deleteAll: '/notifications/delete-all',
  settings: '/notifications/settings',
};

export const notificationService = {
  getAll: (params?: { page?: number; type?: string; is_read?: boolean }) =>
    api.get<{ data: Notification[]; meta: { total: number; unread: number } }>(
      NOTIFICATION_ENDPOINTS.index,
      { params }
    ),
    
  markAsRead: (id: string) =>
    api.post(NOTIFICATION_ENDPOINTS.markRead(id)),
    
  markAllAsRead: () =>
    api.post(NOTIFICATION_ENDPOINTS.markAllRead),
    
  delete: (id: string) =>
    api.delete(NOTIFICATION_ENDPOINTS.delete(id)),
    
  deleteAll: () =>
    api.delete(NOTIFICATION_ENDPOINTS.deleteAll),
    
  updateSettings: (settings: Record<string, boolean>) =>
    api.put(NOTIFICATION_ENDPOINTS.settings, settings),
};
