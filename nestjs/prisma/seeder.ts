import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { HASH_ROUND } from 'src/const';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('hogefuga', HASH_ROUND);
  await prisma.users.create({
    data: {
      name: 'test-user1',
      email: 'test-user1@example.com',
      password: hashedPassword,
    },
  });
}

main()
  .then(() => console.info('シーディング完了'))
  .catch((e) => console.error('シーディングでエラーが発生しました: ', e));
