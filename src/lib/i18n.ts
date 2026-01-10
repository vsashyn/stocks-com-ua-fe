import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../locales/en.json';
import ukTranslations from '../locales/uk.json';

export type Language = 'en' | 'uk';

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'uk';
  return (localStorage.getItem('language') as Language) || 'uk';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      uk: {
        translation: ukTranslations,
      },
    },
    lng: getStoredLanguage(),
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
