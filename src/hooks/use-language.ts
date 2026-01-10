import { useTranslation } from 'react-i18next';
import type { Language } from '@/lib/i18n';

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = i18n.language as Language;

  const setLanguage = (newLanguage: Language) => {
    void i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'uk' : 'en';
    setLanguage(newLanguage);
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
}
