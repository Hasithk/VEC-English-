import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function SummaryCard({ title, value, icon: Icon, trend }: SummaryCardProps) {
  return (
    <Card className="border-slate-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p className="mt-2 text-sm">
                <span
                  className={
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }
                >
                  {trend.value}
                </span>
                <span className="text-slate-500"> vs last month</span>
              </p>
            )}
          </div>
          <div className="rounded-lg bg-sky-100 p-3">
            <Icon className="h-6 w-6 text-sky-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
