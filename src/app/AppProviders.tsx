import { ReactNode } from 'react';
import { AuthProvider } from '@/components/user/auth/AuthContext';
import { ThemeProvider } from '@/components/foundation/Layout/ThemeContext';
import { I18nProvider } from '@/services/i18n/I18nContext';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};
