import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTodoInput } from './dto/update-todo.input';

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoResolver, TodoService, PrismaService],
    }).compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  describe('正常系', () => {
    it('createTodoで正常なデータの場合は登録できる', async () => {
      const data: CreateTodoInput = {
        title: 'タイトル',
        description: '詳細',
      };
      const result = await resolver.createTodo(data);
      expect(result.title).toBe(data.title);
      expect(result.description).toBe(data.description);
    });
    it('updateTodoで正常なデータの場合は更新できる', async () => {
      // 登録処理
      const createData: CreateTodoInput = {
        title: 'タイトル1',
        description: '詳細1',
      };
      const { id } = await resolver.createTodo(createData);
      // 更新処理
      const updateData: UpdateTodoInput = {
        id,
        title: 'タイトル2',
        description: '詳細2',
      };
      const result = await resolver.updateTodo(updateData);
      expect(result.title).toBe(updateData.title);
      expect(result.description).toBe(updateData.description);
    });
  });
});
