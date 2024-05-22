import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int, { description: 'ID' })
  id: number;

  @Field(() => String, { description: 'タイトル' })
  title: string;

  @Field(() => String, { description: '詳細' })
  description?: string;

  @Field({ description: '登録日時' })
  createdAt: Date;

  @Field({ description: '更新日時' })
  updatedAt: Date;
}
