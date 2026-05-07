import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { getPaymentById } from '@/lib/backend';
import { sendPaymentReceiptViaWhatsApp } from '@/lib/whatsapp-service';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function POST(request: Request, context: RouteContext) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const paymentId = context.params.id;
  const payment = getPaymentById(paymentId);

  if (!payment) {
    return NextResponse.json(
      { message: 'Payment not found' },
      { status: 404 }
    );
  }

  if (payment.status !== 'Paid') {
    return NextResponse.json(
      { message: 'Receipt can only be sent for paid payments' },
      { status: 400 }
    );
  }

  try {
    const result = await sendPaymentReceiptViaWhatsApp(payment);

    if (!result.success) {
      return NextResponse.json(
        { message: `Failed to send WhatsApp message: ${result.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      message: 'Receipt sent successfully via WhatsApp',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error sending receipt: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
