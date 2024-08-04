import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginResult {
  @Field(() => Number, { description: 'ユーザーID' })
  userId: number;

  @Field(() => String, { description: 'ユーザー名' })
  userName: string;

  @Field(() => String, { description: 'トークン' })
  accessToken: string;

  @Field(() => String, { description: 'ロールID' })
  roleId: string;
}
