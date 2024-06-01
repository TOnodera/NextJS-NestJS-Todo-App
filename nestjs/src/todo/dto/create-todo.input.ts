import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'タイトル' })
  @IsNotEmpty({ message: 'タイトルは必須項目です。' })
  title: string;

  @Field(() => String, { description: '詳細' })
  description?: string;
}
