import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/type';

@InputType()
export class GetsTodoInput {
  @IsNotEmpty()
  @Field(() => Int)
  userId: number;

  @Field(() => String, { description: 'ロールID' })
  roleId: Role;
}
