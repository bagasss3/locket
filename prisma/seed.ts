import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateID } from 'src/helper/vegenerate';
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.role.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Admin',
    },
  });

  const event_organizer = await prisma.role.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Event_Organizer',
    },
  });

  const participant = await prisma.role.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: 'Participant',
    },
  });
  const unix = Math.floor(Date.now() / 1000);
  const random = Math.floor(Math.random() * 100);
  const ID = unix + random;
  const hashPassword = await bcrypt.hash(
    'akusuperadmin',
    Number(process.env.SALT),
  );
  const user_admin = await prisma.user.upsert({
    where: { id: ID },
    update: {},
    create: {
      id: ID,
      email: 'superadmin@gmail.com',
      name: 'SuperAdmin',
      password: hashPassword,
      role_id: 1,
    },
  });
  const hashPassword2 = await bcrypt.hash(
    'vimaveja123',
    Number(process.env.SALT),
  );
  const user_eo = await prisma.user.upsert({
    where: { id: ID },
    update: {},
    create: {
      id: ID,
      email: 'vimaveja@gmail.com',
      name: 'Vimaveja',
      password: hashPassword2,
      role_id: 2,
    },
  });
  const unix2 = Math.floor(Date.now() / 1000);
  const random2 = Math.floor(Math.random() * 100);
  const ID2 = unix2 + random2;
  const eo = await prisma.event_Organizer.upsert({
    where: { id: ID2 },
    update: {},
    create: {
      id: ID2,
      user_id: user_eo.id,
      is_verified: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
