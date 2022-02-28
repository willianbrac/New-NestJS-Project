import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  token: string;
}
