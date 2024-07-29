import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResult {
  @Field(() => String, { description: 'トークン' })
  accessToken: string;

  @Field(() => String, { description: 'ユーザーID' })
  userId: number;
}
