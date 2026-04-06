'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Payment } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Download } from 'lucide-react';

interface PaymentTableProps {
  payments: Payment[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const handleDownloadReceipt = (paymentId: string) => {
    console.log('Downloading receipt for payment:', paymentId);
  };

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
                Amount
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
            {payments.map((payment) => (
              <TableRow key={payment.id} className="border-slate-200">
                <TableCell className="font-medium text-slate-900">
                  {payment.studentName}
                </TableCell>
                <TableCell className="text-slate-700">
                  {payment.course}
                </TableCell>
                <TableCell className="text-slate-700">{payment.month}</TableCell>
                <TableCell className="text-slate-900 font-semibold">
                  LKR {payment.amount}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={
                      payment.status === 'Paid'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : payment.status === 'Pending'
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-100'
                        : 'bg-red-100 text-red-700 hover:bg-red-100'
                    }
                  >
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {payment.status === 'Paid' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadReceipt(payment.id)}
                      className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Receipt
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
