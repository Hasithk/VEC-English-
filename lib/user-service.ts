import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { AppRole } from '@/lib/auth';

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  isActive: boolean;
  createdAt: Date;
}

const toSafeUser = (user: {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}): SafeUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role as AppRole,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

export const findUserByEmail = async (email: string) =>
  prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

export const listUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: [{ role: 'asc' }, { createdAt: 'asc' }],
  });

  return users.map(toSafeUser);
};

export const createUser = async (input: {
  name: string;
  email: string;
  role: AppRole;
  plainPassword: string;
}) => {
  const passwordHash = await hash(input.plainPassword, 10);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email.toLowerCase(),
      role: input.role,
      passwordHash,
    },
  });

  return toSafeUser(user);
};

export const resetUserPassword = async (input: {
  userId: string;
  plainPassword: string;
}) => {
  const passwordHash = await hash(input.plainPassword, 10);

  return prisma.user.update({
    where: { id: input.userId },
    data: { passwordHash },
  });
};
