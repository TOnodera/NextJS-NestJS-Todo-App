import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import { HASH_ROUND } from 'src/const';
import { Role } from 'src/type';

const prisma = new PrismaClient();

async function main() {
  /**
   * ロール登録
   */
  await prisma.roles.create({
    data: {
      id: Role.ADMIN,
      name: '管理者',
    },
  });
  await prisma.roles.create({
    data: {
      id: Role.USER,
      name: 'ユーザー',
    },
  });
  /**
   * ユーザー登録
   */
  const hashedPassword = await hash('password', HASH_ROUND);
  await prisma.users.create({
    data: {
      name: 'user1',
      email: 'user1@example.com',
      password: hashedPassword,
      role: {
        connect: [{ id: Role.ADMIN }],
      },
    },
  });
}

main()
  .then(() => console.info('シーディング完了'))
  .catch((e) => console.error('シーディングでエラーが発生しました: ', e));
