'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { Payment } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface OverduePaymentsTableProps {
  payments: Payment[];
}

export function OverduePaymentsTable({ payments }: OverduePaymentsTableProps) {
  const { toast } = useToast();
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);

  const handleSendReminder = async (payment: Payment) => {
    setSendingReminder(payment.id);

    setTimeout(() => {
      setSendingReminder(null);
      toast({
        title: 'Reminder Sent',
        description: `WhatsApp reminder sent to ${payment.studentName}`,
      });
    }, 1500);
  };

  const overduePayments = payments.filter((p) => p.status === 'Overdue');

  return (
    <Card className="border-slate-200">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-200 bg-slate-50">
              <TableHead className="text-slate-600 font-semibold">
                Student Name
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Course
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Month
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Amount Due
              </TableHead>
              <TableHead className="text-slate-600 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-slate-600 font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {overduePayments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  No overdue payments at this time
                </TableCell>
              </TableRow>
            ) : (
              overduePayments.map((payment) => (
                <TableRow key={payment.id} className="border-slate-200">
                  <TableCell className="font-medium text-slate-900">
                    {payment.studentName}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {payment.course}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {payment.month}
                  </TableCell>
                  <TableCell className="text-slate-900 font-semibold">
                    LKR {payment.amount}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Overdue
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleSendReminder(payment)}
                      disabled={sendingReminder === payment.id}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {sendingReminder === payment.id
                        ? 'Sending...'
                        : 'Send Reminder'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
