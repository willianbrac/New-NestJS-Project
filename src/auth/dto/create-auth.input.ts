import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  email: string;
  password: string;
}
