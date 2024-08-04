import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { GetsTodoInput } from './dto/gets-todo.input';
import { Role } from 'src/type';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoInput: CreateTodoInput) {
    return await this.prisma.todos.create({
      data: createTodoInput,
    });
  }

  async findAll(getsTodoInput: GetsTodoInput) {
    // 管理者の場合はすべてのTodoデータを返す
    if (getsTodoInput.roleId === Role.ADMIN) {
      return await this.prisma.todos.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }
    // ユーザーの場合は自分のTodoデータのみ返す
    return await this.prisma.todos.findMany({
      where: { userId: getsTodoInput.userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.todos.findUnique({ where: { id } });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return await this.prisma.todos.update({
      where: { id },
      data: updateTodoInput,
    });
  }

  async remove(id: number): Promise<{ id: number }> {
    const { id: res } = await this.prisma.todos.delete({ where: { id } });
    return { id: res };
  }
}
