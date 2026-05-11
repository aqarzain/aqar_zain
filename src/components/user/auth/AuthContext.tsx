import { createContext, useContext, useCallback, useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { authService } from '@/services/api/authService';
import type { LoginPayload, RegisterPayload, User } from '@/types/api/user.types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    isAuthenticated,
    accessToken,
    refreshToken,
    setAuth,
    setUser,
    clearAuth,
  } = useAuthStore();

  // Load user data on mount if authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken && !user) {
      authService.getMe()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          clearAuth();
        });
    }
  }, [isAuthenticated, accessToken]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await authService.login(payload);
    const { user, access_token, refresh_token } = response.data;
    
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    
    setAuth(user, access_token, refresh_token);
  }, [setAuth]);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await authService.register(payload);
    const { user, access_token, refresh_token } = response.data;
    
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    
    setAuth(user, access_token, refresh_token);
  }, [setAuth]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Even if API call fails, clear local state
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    clearAuth();
  }, [clearAuth]);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, [setUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: false,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
