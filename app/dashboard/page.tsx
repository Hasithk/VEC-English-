import { SummaryCard } from '@/components/dashboard/summary-card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentRegistrations } from '@/components/dashboard/recent-registrations';
import { Users, DollarSign, TrendingUp, Send } from 'lucide-react';
import { getDashboardSnapshot } from '@/lib/backend';

export default function DashboardPage() {
  const {
    totalStudents,
    pendingPayments,
    totalRevenue,
    automatedReminders,
    revenueData,
    students,
  } = getDashboardSnapshot();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          Welcome back! Here's your overview for today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Students"
          value={totalStudents}
          icon={Users}
          trend={{ value: '+12%', isPositive: true }}
        />
        <SummaryCard
          title="Pending Payments"
          value={pendingPayments}
          icon={DollarSign}
          trend={{ value: '-8%', isPositive: true }}
        />
        <SummaryCard
          title="Total Revenue (April)"
          value={`LKR ${totalRevenue}`}
          icon={TrendingUp}
          trend={{ value: '+15%', isPositive: true }}
        />
        <SummaryCard
          title="Reminders Sent"
          value={automatedReminders}
          icon={Send}
        />
      </div>

      <RevenueChart data={revenueData} />

      <RecentRegistrations students={students} />
    </div>
  );
}
