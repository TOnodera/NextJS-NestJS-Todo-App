import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { ApolloServer } from '@apollo/server';
import { getApolloServer } from '@nestjs/apollo';
import { Todo } from 'src/generated/graphql';
import { SingleGraphQLResponse } from './todo/type';

describe('Todo結合テスト', () => {
  let app: INestApplication;
  let apolloServer: ApolloServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    apolloServer = getApolloServer(app);
  });

  // gql
  const mutation = `
      mutation CreateTodo($createTodoInput: CreateTodoInput!) {
        createTodo(createTodoInput: $createTodoInput) {
          id
          title
          description
          createdAt
          updatedAt
        }
      }
    `;

  describe('正常系', () => {
    it('todoを登録する', async () => {
      // 正常なデータ
      const variables = {
        createTodoInput: {
          title: 'test-title1',
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: mutation,
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
  });
  describe('異常系', () => {
    it('todoを登録する', async () => {
      // 正常なデータ
      const variables = {
        createTodoInput: {
          title: '',
          description: 'test-description1',
        },
      };
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo>
      >({
        query: mutation,
        variables,
      })) as unknown as SingleGraphQLResponse<{ createTodo: Todo }>;
      expect(res.body.kind).toBe('single');
      expect(res.body.singleResult.errors).toBeDefined();
    });
  });
});
