import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細', nullable: true })
  description?: string;
}
