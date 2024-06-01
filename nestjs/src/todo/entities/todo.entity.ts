import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: 'タイトル' })
  @IsNotEmpty({ message: 'タイトルは必須項目です。' })
  title: string;

  @Field(() => String, { description: '詳細', nullable: true })
  description?: string;

  @Field({ description: '登録日時' })
  createdAt: Date;

  @Field({ description: '更新日時' })
  updatedAt: Date;
}
