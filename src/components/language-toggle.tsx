import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function LanguageToggle() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={t('common.toggleLanguage')}
      className="font-medium"
    >
      {t(`language.${language}`)}
    </Button>
  );
}
