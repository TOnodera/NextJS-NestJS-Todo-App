import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ApolloServer } from '@apollo/server';
import { getApolloServer } from '@nestjs/apollo';
import { CreateTodo, Todo } from 'src/generated/graphql';
import { SingleGraphQLResponse } from './type';

describe('Todo結合テスト', () => {
  let app: INestApplication;
  let apolloServer: ApolloServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();

    apolloServer = getApolloServer(app);
  });

  /**
   * 正常系のテスト
   */
  describe('正常系', () => {
    it('タイトルも詳細も入力あり', async () => {
      const variables = {
        createTodoInput: {
          title: 'test-title1',
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: CreateTodo,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;
      expect(res.body.kind).toBe('single');
      expect(res.body.singleResult.data?.createTodo.title).toBe(
        variables.createTodoInput.title,
      );
      expect(res.body.singleResult.data?.createTodo.description).toBe(
        variables.createTodoInput.description,
      );
    });

    it('詳細は入力なし', async () => {
      const variables = {
        createTodoInput: {
          title: 'test-title1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: CreateTodo,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;

      expect(res.body.kind).toBe('single');
      expect(res.body.singleResult.data?.createTodo.title).toBe(
        variables.createTodoInput.title,
      );
    });
  });

  /**
   * 異常系のテスト
   */
  describe('異常系', () => {
    const titleErrorMessage = 'タイトルは必須項目です。';
    /*
    it('タイトル未入力', async () => {
      // タイトルが空データ
      const variables = {
        createTodoInput: {
          title: '',
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: CreateTodo,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;
      res.body.singleResult.errors.forEach((error) =>
        expect(
          error.extensions.originalError.message.includes(titleErrorMessage),
        ),
      );
    });
    */
    it('タイトルundefined', async () => {
      // タイトルがundefined
      const variables = {
        createTodoInput: {
          title: undefined,
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: CreateTodo,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;
      expect(res.body.kind).toBe('single');
      expect(res.body.singleResult.errors.length).toBe(1);
      res.body.singleResult.errors.forEach((error) =>
        expect(
          error.extensions.originalError.message.includes(titleErrorMessage),
        ),
      );
    });
    /*
    it('タイトルがnull', async () => {
      // タイトルがnull
      const variables = {
        createTodoInput: {
          title: null,
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: CreateTodo,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;
      expect(res.body.kind).toBe('single');
      expect(res.body.singleResult.errors.length).toBe(1);
      res.body.singleResult.errors.forEach((error) =>
        expect(
          error.extensions.originalError.message.includes(titleErrorMessage),
        ),
      );
    });
    */
  });
});
