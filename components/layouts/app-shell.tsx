'use client';

import { ReactNode, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Menu } from 'lucide-react';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageTitle = useMemo(() => {
    if (pathname.startsWith('/students')) {
      return 'Students';
    }
    if (pathname.startsWith('/payments')) {
      return 'Payments';
    }
    if (pathname.startsWith('/communications')) {
      return 'Communications';
    }
    if (pathname.startsWith('/settings')) {
      return 'Settings';
    }
    return 'Dashboard';
  }, [pathname]);

  return (
    <div className="flex min-h-screen md:h-screen bg-white">
      <aside className="hidden md:block md:sticky md:top-0 md:h-screen md:shrink-0">
        <Sidebar />
      </aside>

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[84vw] max-w-xs">
                  <Sidebar
                    className="w-full border-r-0"
                    onNavigate={() => setMobileMenuOpen(false)}
                  />
                </SheetContent>
              </Sheet>

              <h2 className="text-base md:text-lg font-semibold text-slate-900">
                {pageTitle}
              </h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (pathname === '/dashboard') {
                  return;
                }
                router.back();
              }}
              disabled={pathname === '/dashboard'}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </div>

        <div className="px-4 py-5 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
