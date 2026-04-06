import { OverduePaymentsTable } from '@/components/communications/overdue-payments-table';
import { AutomationSettings } from '@/components/communications/automation-settings';
import { Card, CardContent } from '@/components/ui/card';
import { CircleAlert as AlertCircle } from 'lucide-react';
import { listPayments } from '@/lib/backend';

export default function CommunicationsPage() {
  const payments = listPayments();

  const overdueCount = payments.filter(
    (p) => p.status === 'Overdue'
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Communications</h1>
        <p className="mt-2 text-slate-600">
          Manage WhatsApp reminders and payment notifications
        </p>
      </div>

      {overdueCount > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="flex items-start gap-3 p-4">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900">
                {overdueCount} Overdue Payment{overdueCount !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                There {overdueCount === 1 ? 'is' : 'are'} {overdueCount} student
                {overdueCount !== 1 ? 's' : ''} with overdue payments requiring
                attention
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <AutomationSettings />

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Overdue Payments
        </h2>
        <OverduePaymentsTable payments={payments} />
      </div>
    </div>
  );
}
