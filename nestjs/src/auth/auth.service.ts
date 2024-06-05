import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithoutPassword } from 'src/type';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
  ): Promise<UserWithoutPassword | null> {
    // TODO hash化したパスワードで実行するようにする
    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      // passwordは除外
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserWithoutPassword) {
    const payload = { userName: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
