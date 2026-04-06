import { NextResponse } from 'next/server';
import { getDashboardSnapshot } from '@/lib/backend';
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

  return NextResponse.json(getDashboardSnapshot());
}