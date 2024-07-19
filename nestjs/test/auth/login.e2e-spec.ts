import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import supertest, * as request from 'supertest';
import { print } from 'graphql';
import { loginMutation } from '../fixtures/query';

const isAuthError = (res: supertest.Response) => {
  const result = res.body.errors.some(
    (error) => error.extensions.code === 'UNAUTHENTICATED',
  );
  return result;
};
const isClientError = (res: supertest.Response) => {
  const result = res.body.errors.some(
    (error) =>
      error.extensions.code === 'BAD_REQUEST' ||
      error.extensions.code === 'BAD_USER_INPUT',
  );
  return result;
};

describe('ログイン認証e2eテスト', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  /**
   * 異常系のテスト
   */
  describe('ログイン処理異常系', () => {
    it('認証情報が一致しない場合はログインできないこと(メールアドレスが一致しないパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'invalid-user@example.com',
              password: 'password',
            },
          },
        })
        .expect((res) => {
          expect(isAuthError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(パスワードが一致しないパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'admin-user@example.com',
              password: 'invalid-password',
            },
          },
        })
        .expect((res) => {
          expect(isAuthError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(メールアドレス未入力パターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: '',
              password: 'invalid-password',
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(パスワード未入力パターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'admin-user@example.com',
              password: '',
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(メールアドレスundefinedパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: undefined,
              password: 'password',
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(パスワードundefinedパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'admin-user@example.com',
              password: undefined,
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(両方undefinedパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: undefined,
              password: undefined,
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(メールアドレスnullパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: null,
              password: 'password',
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(パスワードnullパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'admin-user@example.com',
              password: null,
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('認証情報が一致しない場合はログインできないこと(両方nullパターン)', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: null,
              password: null,
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
    it('メールアドレスの形式でない文字列を入力した場合はエラーとすること', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'thisisemail',
              password: 'password',
            },
          },
        })
        .expect((res) => {
          expect(isClientError(res)).toBeTruthy();
        });
    });
  });
  describe('ログイン処理正常系', () => {
    it('ログイン', async () => {
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: print(loginMutation),
          variables: {
            loginInput: {
              email: 'admin-user@example.com',
              password: 'password',
            },
          },
        })
        .expect((res) => {
          expect(res.body.data.login.accessToken).toBeDefined();
        });
    });
  });
});
