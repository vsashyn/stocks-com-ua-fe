import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ThemeProvider } from '@/components/theme-provider';
import { I18nProvider } from '@/components/i18n-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <I18nProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          <Outlet />
        </div>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </I18nProvider>
    </ThemeProvider>
  ),
});
