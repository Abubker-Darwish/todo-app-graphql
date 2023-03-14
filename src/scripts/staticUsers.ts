import prisma from '@/services/prismaClient';
import users from '@/data/users';

const createCurrencies = async () => {
  await prisma.user.createMany({
    data: users,
  });
};

export default createCurrencies;
