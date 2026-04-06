import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth';
import { authorizeApiRequest } from '@/lib/rbac';
import { deleteStudent, getStudentById, updateStudent } from '@/lib/backend';
import type { Student } from '@/lib/mock-data';

interface RouteContext {
  params: {
    id: string;
  };
}

const allowedStatuses: Student['status'][] = ['Active', 'Inactive', 'Dropout'];

export async function PATCH(request: Request, context: RouteContext) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const student = getStudentById(context.params.id);
  if (!student) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }

  const body = await request.json();
  const status = body?.status !== undefined ? String(body.status) : undefined;

  if (status !== undefined && !allowedStatuses.includes(status as Student['status'])) {
    return NextResponse.json(
      { message: 'Invalid status value' },
      { status: 400 }
    );
  }

  const updated = updateStudent(context.params.id, {
    name: body?.name !== undefined ? String(body.name).trim() : undefined,
    course: body?.course !== undefined ? String(body.course).trim() : undefined,
    parentName:
      body?.parentName !== undefined ? String(body.parentName).trim() : undefined,
    phone: body?.phone !== undefined ? String(body.phone).trim() : undefined,
    status: status as Student['status'] | undefined,
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, context: RouteContext) {
  const authorization = await authorizeApiRequest([
    APP_ROLES.SUPER_ADMIN,
    APP_ROLES.MAIN_ADMIN,
    APP_ROLES.ADMIN_USER,
  ]);

  if (authorization.errorResponse) {
    return authorization.errorResponse;
  }

  const deleted = deleteStudent(context.params.id);
  if (!deleted) {
    return NextResponse.json({ message: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
