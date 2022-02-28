import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { AuthType } from './dto/auth.type';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  public async login(@Args('data') data: CreateAuthInput): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return { user: response.user, token: response.token };
  }
}
