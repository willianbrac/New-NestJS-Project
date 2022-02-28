import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthType } from './dto/auth.type';
import { CreateAuthInput } from './dto/create-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(data: CreateAuthInput): Promise<AuthType> {
    const user = await this.userService.findUserByEmail(data.email);
    const validPassword = compareSync(data.password, user.password);
    if (!validPassword)
      throw new UnauthorizedException('Email or password incorrect!');
    const token = await this.generatejwtToken(user);
    return { user, token };
  }
  private async generatejwtToken(user: User): Promise<string> {
    const payload = {
      username: user.name,
      sub: user.id,
    };
    return this.jwtService.signAsync(payload);
  }
}
