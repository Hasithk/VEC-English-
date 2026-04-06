import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const users = [
  {
    name: 'Super Admin',
    email: 'superadmin@edupay.com',
    role: 'SUPER_ADMIN',
    password: 'SuperAdmin#123',
  },
  {
    name: 'Main Admin',
    email: 'mainadmin@edupay.com',
    role: 'MAIN_ADMIN',
    password: 'MainAdmin#123',
  },
  {
    name: 'Admin User',
    email: 'adminuser@edupay.com',
    role: 'ADMIN_USER',
    password: 'AdminUser#123',
  },
];

async function run() {
  for (const user of users) {
    const passwordHash = await hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        passwordHash,
        isActive: true,
      },
      create: {
        name: user.name,
        email: user.email,
        role: user.role,
        passwordHash,
        isActive: true,
      },
    });
  }

  console.log('Seed complete');
}

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
