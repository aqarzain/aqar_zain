import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface UIState {
  theme: Theme;
  language: Language;
  direction: Direction;
  sidebarOpen: boolean;
  
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'ar',
      direction: 'rtl',
      sidebarOpen: true,
      
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },
      
      setLanguage: (language) => {
        const direction = language === 'ar' ? 'rtl' : 'ltr';
        set({ language, direction });
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
      },
      
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      
      toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
    }),
    {
      name: 'aqarzain-ui',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        direction: state.direction,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.theme === 'dark');
          document.documentElement.dir = state.direction;
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);
