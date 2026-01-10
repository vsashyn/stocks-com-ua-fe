import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '@/lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync i18n language with localStorage on mount
    const storedLanguage = localStorage.getItem('language') as Language | null;
    if (storedLanguage && storedLanguage !== i18n.language) {
      void i18n.changeLanguage(storedLanguage);
    }

    // Listen for language changes in localStorage (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'language' && e.newValue) {
        void i18n.changeLanguage(e.newValue as Language);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [i18n]);

  return <>{children}</>;
}
