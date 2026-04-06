import { PaymentTable } from '@/components/payments/payment-table';
import { AddPaymentDialog } from '@/components/payments/add-payment-dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { listPayments, listStudents } from '@/lib/backend';
import Link from 'next/link';

interface PaymentsPageProps {
  searchParams?: {
    category?: string;
    q?: string;
    status?: string;
    month?: string;
  };
}

export default function PaymentsPage({ searchParams }: PaymentsPageProps) {
  const payments = listPayments();
  const activeStudents = listStudents().filter((student) => student.status === 'Active');
  const categories = Array.from(
    new Set(activeStudents.flatMap((student) => student.courses))
  ).sort((a, b) => a.localeCompare(b));
  const months = Array.from(new Set(payments.map((payment) => payment.month))).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  const selectedCategory = searchParams?.category || '';
  const rawSearchQuery = (searchParams?.q || '').trim();
  const searchQuery = rawSearchQuery.toLowerCase();
  const selectedStatus = searchParams?.status || 'all';
  const selectedMonth = searchParams?.month || 'all';

  const filteredPayments = payments.filter((payment) => {
    const matchesCategory = selectedCategory ? payment.course === selectedCategory : true;
    const matchesSearch = searchQuery
      ? payment.studentName.toLowerCase().includes(searchQuery)
      : true;
    const matchesStatus =
      selectedStatus === 'all'
        ? true
        : payment.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesMonth = selectedMonth === 'all' ? true : payment.month === selectedMonth;

    return matchesCategory && matchesSearch && matchesStatus && matchesMonth;
  });

  const queryWithCategory = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (selectedStatus !== 'all') {
      params.set('status', selectedStatus);
    }
    if (selectedMonth !== 'all') {
      params.set('month', selectedMonth);
    }
    return `/payments?${params.toString()}`;
  };

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

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Select Grade / Course</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = category === selectedCategory;

            return (
              <Link
                key={category}
                href={queryWithCategory(category)}
                className={
                  isActive
                    ? 'rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white'
                    : 'rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
                }
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row sm:items-center" method="get" action="/payments">
        {selectedCategory ? <input type="hidden" name="category" value={selectedCategory} /> : null}

        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="q"
            defaultValue={rawSearchQuery}
            placeholder="Search by student name..."
            className="pl-10"
          />
        </div>

        <select
          name="status"
          defaultValue={selectedStatus}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
        >
          <option value="all">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>

        <select
          name="month"
          defaultValue={selectedMonth}
          className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
        >
          <option value="all">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="h-10 rounded-md bg-sky-500 px-4 text-sm font-medium text-white hover:bg-sky-600"
        >
          Apply
        </button>
      </form>

      <PaymentTable payments={filteredPayments} />
    </div>
  );
}
