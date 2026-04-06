import { NextResponse } from 'next/server';
import { createPayment, listPayments } from '@/lib/backend';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';

export async function GET() {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  return NextResponse.json(listPayments());
}

export async function POST(request: Request) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const body = await request.json();

  if (
    !body?.studentId ||
    !body?.course ||
    !body?.month ||
    !body?.amount ||
    !body?.paymentMethod ||
    !body?.paymentDate
  ) {
    return NextResponse.json(
      { message: 'Invalid payment payload' },
      { status: 400 }
    );
  }

  const amount = Number(body.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    return NextResponse.json(
      { message: 'Amount must be a positive number' },
      { status: 400 }
    );
  }

  const payment = createPayment({
    studentId: String(body.studentId),
    course: String(body.course),
    month: String(body.month),
    amount,
    paymentMethod: String(body.paymentMethod),
    paymentDate: String(body.paymentDate),
    status: body?.status,
  });

  return NextResponse.json(payment, { status: 201 });
}