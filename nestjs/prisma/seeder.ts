import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      name: 'test-user1',
      email: 'test-user1@example.com',
      password: 'hogefuga',
    },
  });
}

main()
  .then(() => console.info('シーディング完了'))
  .catch((e) => console.error('シーディングでエラーが発生しました: ', e));
