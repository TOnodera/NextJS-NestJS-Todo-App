import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @Field(() => String, { description: '名前' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'メールアドレス' })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'ロールID' })
  roleId: string;
}
