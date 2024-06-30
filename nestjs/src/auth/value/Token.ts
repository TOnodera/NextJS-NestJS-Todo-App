import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String, { description: 'トークン' })
  accessToken: string;
}
