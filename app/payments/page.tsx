import { PaymentTable } from '@/components/payments/payment-table';
import { AddPaymentDialog } from '@/components/payments/add-payment-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { listPayments, listStudents } from '@/lib/backend';

export default function PaymentsPage() {
  const payments = listPayments();
  const activeStudents = listStudents().filter((student) => student.status === 'Active');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payments</h1>
          <p className="mt-2 text-slate-600">
            Track and manage student fee payments
          </p>
        </div>
        <AddPaymentDialog students={activeStudents} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Payments</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="april">
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april">April 2024</SelectItem>
            <SelectItem value="march">March 2024</SelectItem>
            <SelectItem value="february">February 2024</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PaymentTable payments={payments} />
    </div>
  );
}
