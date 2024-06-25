import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsDateString, IsEmail, Min } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'ID' })
  @Min(1)
  id: number;

  @Field(() => String, { description: '名前' })
  name: string;

  @Field(() => String, { description: 'email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'ロールID' })
  roleId: string;

  @Field(() => Date, { description: '登録日時' })
  @IsDateString()
  createdAt: Date;

  @Field(() => Date, { description: '更新日時' })
  @IsDateString()
  updatedAt: Date;
}
