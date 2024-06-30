import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String, { description: 'メールアドレス' })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'パスワード' })
  password: string;
}
