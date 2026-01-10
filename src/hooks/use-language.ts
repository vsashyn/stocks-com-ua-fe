import { useState, useCallback } from 'react';

export type Language = 'en' | 'uk';

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'uk';
  return (localStorage.getItem('language') as Language) || 'uk';
}

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(() =>
    getStoredLanguage()
  );

  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'en' ? 'uk' : 'en';
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
}
