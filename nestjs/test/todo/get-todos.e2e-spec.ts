import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { ApolloServer } from '@apollo/server';
import { getApolloServer } from '@nestjs/apollo';
import { CreateTodo, GetTodos, Todo } from 'src/generated/graphql';
import { SingleGraphQLResponse } from './type';

describe('Todos取得結合テスト', () => {
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
    const variables1 = {
      createTodoInput: {
        title: 'test-title1',
        description: 'test-description1',
      },
    };
    const variables2 = {
      createTodoInput: {
        title: 'test-title2',
        description: 'test-description2',
      },
    };
    it('登録済みのデータの取得', async () => {
      await apolloServer.executeOperation<SingleGraphQLResponse<Todo>>({
        query: CreateTodo,
        variables: variables1,
      });
      await apolloServer.executeOperation<SingleGraphQLResponse<Todo>>({
        query: CreateTodo,
        variables: variables2,
      });
      const res = (await apolloServer.executeOperation<
        SingleGraphQLResponse<Todo[]>
      >({
        query: GetTodos,
      })) as unknown as SingleGraphQLResponse<{ todos: Todo[] }>;
      expect(res.body.singleResult.data.todos.length > 0).toBeTruthy();
    });
  });
});
