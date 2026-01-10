import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label="Toggle language"
      className="font-medium"
    >
      {language === 'uk' ? 'UK' : 'EN'}
    </Button>
  );
}
