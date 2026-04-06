import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { listUsers } from '@/lib/user-service';

export async function GET() {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const users = await listUsers();
  return NextResponse.json(users);
}
