import { AppShell } from '@/components/layouts/app-shell';

export default function CommunicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
