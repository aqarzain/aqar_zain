// =============================================
// 👤 User Types - AqarZain API
// =============================================

export type UserRole = 'broker' | 'admin' | 'super_admin';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
  status: UserStatus;
  is_verified: boolean;
  national_id: string | null;
  commercial_register: string | null;
  bio: string | null;
  rating: number;
  deals_count: number;
  listings_count: number;
  notifications_settings: NotificationSettings;
  created_at: string;
  updated_at: string;
}

export interface NotificationSettings {
  email: boolean;
  whatsapp: boolean;
  sms: boolean;
  in_app: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember_me?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  accept_terms: boolean;
}

export interface AuthResponse {
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };
}

export interface RefreshTokenResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}
