import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useUIStore } from '@/stores/useUIStore';

interface I18nContextType {
  t: (key: string) => string;
  language: string;
}

const translations: Record<string, Record<string, string>> = {
  ar: {
    'app.name': 'عقار زين',
    'nav.home': 'الرئيسية',
    'nav.listings': 'العقارات',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.empty': 'لا توجد نتائج',
  },
  en: {
    'app.name': 'AqarZain',
    'nav.home': 'Home',
    'nav.listings': 'Listings',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.empty': 'No results found',
  },
};

const I18nContext = createContext<I18nContextType>({ t: (key: string) => key, language: 'ar' });

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const language = useUIStore((state) => state.language);
  const t = (key: string): string => translations[language]?.[key] || translations['ar']?.[key] || key;
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  return <I18nContext.Provider value={{ t, language }}>{children}</I18nContext.Provider>;
};
