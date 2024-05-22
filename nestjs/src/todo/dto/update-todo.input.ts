import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細' })
  description?: string;
}
