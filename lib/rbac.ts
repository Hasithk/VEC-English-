import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import { AppRole, authOptions } from '@/lib/auth';

interface AuthorizationResult {
  session: Session | null;
  errorResponse: NextResponse | null;
}

export const authorizeApiRequest = async (
  allowedRoles: AppRole[]
): Promise<AuthorizationResult> => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return {
      session,
      errorResponse: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    };
  }

  const role = session.user.role;
  if (!role || !allowedRoles.includes(role)) {
    return {
      session,
      errorResponse: NextResponse.json({ message: 'Forbidden' }, { status: 403 }),
    };
  }

  return {
    session,
    errorResponse: null,
  };
};
