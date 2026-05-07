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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Payment } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Download, MessageCircle, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentTableProps {
  payments: Payment[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const { toast } = useToast();
  const [sendingReceiptId, setSendingReceiptId] = useState<string | null>(null);

  const handleDownloadReceipt = (paymentId: string) => {
    console.log('Downloading receipt for payment:', paymentId);
    toast({
      title: 'Receipt Download',
      description: 'Receipt download feature coming soon.',
    });
  };

  const handleSendWhatsApp = async (payment: Payment) => {
    if (!payment.studentName) {
      toast({
        title: 'Error',
        description: 'Student information not found.',
        variant: 'destructive',
      });
      return;
    }

    setSendingReceiptId(payment.id);
    try {
      const response = await fetch(`/api/payments/${payment.id}/send-receipt`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          title: 'Failed to send receipt',
          description: error.message || 'Please try again.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success!',
        description: `Payment receipt sent to ${payment.studentName} via WhatsApp.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send WhatsApp message. Please try again.',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setSendingReceiptId(null);
    }
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
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadReceipt(payment.id)}
                        className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Receipt
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendWhatsApp(payment)}
                        disabled={sendingReceiptId === payment.id}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        {sendingReceiptId === payment.id ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <MessageCircle className="mr-2 h-4 w-4" />
                            WhatsApp
                          </>
                        )}
                      </Button>
                    </div>
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
