import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(email: string, pass: string): Promise<{ accessToken: string }> {
    // TODO hash化したパスワードで実行するようにする
    const user = await this.userService.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
