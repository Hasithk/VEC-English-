import { NextResponse } from 'next/server';
import { APP_ROLES, AppRole } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { createUser, findUserByEmail } from '@/lib/user-service';

const buildTemporaryPassword = () =>
  `Temp#${Math.random().toString(36).slice(2, 8)}${Math.floor(Math.random() * 90 + 10)}`;

export async function POST(request: Request) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const body = await request.json();
  const name = String(body?.name ?? '').trim();
  const email = String(body?.email ?? '').trim().toLowerCase();
  const role = String(body?.role ?? '') as AppRole;

  if (!name || !email || !role) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  const allowedRoles: AppRole[] = [APP_ROLES.MAIN_ADMIN, APP_ROLES.ADMIN_USER];
  if (authorization.session?.user.role === APP_ROLES.SUPER_ADMIN) {
    allowedRoles.push(APP_ROLES.SUPER_ADMIN);
  }

  if (!allowedRoles.includes(role)) {
    return NextResponse.json(
      { message: 'You are not allowed to assign this role' },
      { status: 403 }
    );
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const temporaryPassword = buildTemporaryPassword();

  const user = await createUser({
    name,
    email,
    role,
    plainPassword: temporaryPassword,
  });

  return NextResponse.json(
    {
      user,
      temporaryPassword,
    },
    { status: 201 }
  );
}
