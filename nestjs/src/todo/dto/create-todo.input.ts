import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細', nullable: true })
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @Field(() => Number, { description: 'ユーザーID' })
  userId: number;
}
