import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細' })
  description?: string;
}
