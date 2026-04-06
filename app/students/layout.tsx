import { AppShell } from '@/components/layouts/app-shell';

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
