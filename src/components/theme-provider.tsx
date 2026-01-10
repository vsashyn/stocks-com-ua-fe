import { useTheme } from '@/hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize theme hook to ensure theme is applied
  useTheme();

  return <>{children}</>;
}
