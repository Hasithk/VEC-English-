import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';
import { resetUserPassword } from '@/lib/user-service';

const buildTemporaryPassword = () =>
  `Reset#${Math.random().toString(36).slice(2, 8)}${Math.floor(Math.random() * 90 + 10)}`;

export async function POST(request: Request) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const body = await request.json();
  const userId = String(body?.userId ?? '').trim();

  if (!userId) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  if (
    authorization.session?.user.role !== APP_ROLES.SUPER_ADMIN &&
    user.role === APP_ROLES.SUPER_ADMIN
  ) {
    return NextResponse.json(
      { message: 'Only Super Admin can reset Super Admin password' },
      { status: 403 }
    );
  }

  const temporaryPassword = buildTemporaryPassword();

  await resetUserPassword({
    userId,
    plainPassword: temporaryPassword,
  });

  return NextResponse.json({ temporaryPassword });
}
