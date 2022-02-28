import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'Invalid Name!' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Invalid Email!' })
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password is required!' })
  password?: string;
}
