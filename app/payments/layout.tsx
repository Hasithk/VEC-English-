import { AppShell } from '@/components/layouts/app-shell';

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
