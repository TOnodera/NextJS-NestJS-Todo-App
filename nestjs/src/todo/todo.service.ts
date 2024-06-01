import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoInput: CreateTodoInput) {
    return await this.prisma.todos.create({ data: createTodoInput });
  }

  async findAll() {
    return await this.prisma.todos.findMany();
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

  async remove(id: number) {
    await this.prisma.todos.delete({ where: { id } });
  }
}
