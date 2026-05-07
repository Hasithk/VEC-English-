import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { deletePayment, getPaymentById, updatePayment } from '@/lib/backend';
import { sendPaymentReceiptViaWhatsApp } from '@/lib/whatsapp-service';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PATCH(request: Request, context: RouteContext) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  if (authorization.session?.user.role === APP_ROLES.ADMIN_USER) {
    return NextResponse.json(
      {
        message:
          'Admin Users cannot edit payment records directly. Request Main Admin approval.',
      },
      { status: 403 }
    );
  }

  const payment = getPaymentById(context.params.id);
  if (!payment) {
    return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
  }

  const body = await request.json();
  const amount = body?.amount !== undefined ? Number(body.amount) : undefined;

  if (amount !== undefined && (Number.isNaN(amount) || amount <= 0)) {
    return NextResponse.json(
      { message: 'Amount must be a positive number' },
      { status: 400 }
    );
  }

  const statusChangedToPaid = body?.status === 'Paid' && payment.status !== 'Paid';

  const updated = updatePayment(context.params.id, {
    course: body?.course !== undefined ? String(body.course) : undefined,
    month: body?.month !== undefined ? String(body.month) : undefined,
    amount,
    paymentMethod:
      body?.paymentMethod !== undefined ? String(body.paymentMethod) : undefined,
    paymentDate: body?.paymentDate !== undefined ? String(body.paymentDate) : undefined,
    status: body?.status,
  });

  // Send WhatsApp receipt when payment is marked as Paid
  if (statusChangedToPaid && updated) {
    try {
      await sendPaymentReceiptViaWhatsApp(updated);
    } catch (error) {
      console.error('Failed to send WhatsApp receipt:', error);
      // Don't fail the payment update if WhatsApp fails
    }
  }

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: RouteContext) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const deleted = deletePayment(context.params.id);
  if (!deleted) {
    return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
