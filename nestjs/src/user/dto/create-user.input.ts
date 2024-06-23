import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String, { description: '名前' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'メールアドレス' })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'パスワード' })
  password: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'ロールID' })
  roleId: string;
}
