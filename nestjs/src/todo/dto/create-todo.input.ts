import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細', nullable: true })
  @IsOptional()
  description: string;
}
