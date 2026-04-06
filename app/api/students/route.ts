import { NextResponse } from 'next/server';
import { createStudent, listStudents } from '@/lib/backend';
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

  return NextResponse.json(listStudents());
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
    !body?.name ||
    !body?.dateOfBirth ||
    !body?.currentSchool ||
    !Array.isArray(body?.courses) ||
    !body?.parentName ||
    !body?.address ||
    !body?.phone
  ) {
    return NextResponse.json(
      { message: 'Invalid student payload' },
      { status: 400 }
    );
  }

  const student = createStudent({
    name: String(body.name),
    dateOfBirth: String(body.dateOfBirth),
    currentSchool: String(body.currentSchool),
    courses: body.courses.map((course: unknown) => String(course)),
    parentName: String(body.parentName),
    address: String(body.address),
    phone: String(body.phone),
  });

  return NextResponse.json(student, { status: 201 });
}