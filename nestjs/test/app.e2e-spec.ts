import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SuperTestResponse } from './utils';
import { GraphQLResponseBody } from '@apollo/server/dist/esm/externalTypes/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const url = '/graphql';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('create todo mutation', () => {
    const query = `
      mutation CreateTodo($createTodoInput: CreateTodoInput!) {
          createTodo(createTodoInput: $createTodoInput) {
            id
            title
            description
            createdAt
            updatedAt
          }
      }`;
    const variables = {
      createTodoInput: {
        title: '',
        description: 'd-test1',
      },
    };
    const res: SuperTestResponse = request(app.getHttpServer())
      .post(url)
      .send({
        query,
        variables,
      })
      .expect(200);
    expect(res.clientError).toBe(HttpStatus.BAD_REQUEST);
    return res;
  });
});
