import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/type';

@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return await this.todoService.create(createTodoInput);
  }

  @Roles([Role.ADMIN])
  @Query(() => [Todo], { name: 'todos' })
  async findAll() {
    return await this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return await this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    return await this.todoService.remove(id);
  }
}
