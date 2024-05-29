import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoResolver, TodoService, PrismaService],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  it('createTodoで正常なデータの場合は登録できる', async () => {
    const data: CreateTodoInput = {
      title: 'タイトル',
      description: '詳細',
    };
    const result = await resolver.createTodo(data);
    expect(result.title).toBe(data.title);
    expect(result.description).toBe(data.description);
  });
});
