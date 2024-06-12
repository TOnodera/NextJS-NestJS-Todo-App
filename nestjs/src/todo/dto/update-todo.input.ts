import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Status } from '@prisma/client';

@InputType()
export class UpdateTodoInput {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: 'タイトル' })
  title: string;

  @IsNotEmpty()
  @Field(() => String, {
    description: 'ステータス（DO:未着手、DOING:着手中、DONE:完了)',
  })
  status: Status;

  @Field(() => String, { description: '詳細', nullable: true })
  description?: string;
}
