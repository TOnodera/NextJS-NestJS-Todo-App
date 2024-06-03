import { Injectable } from '@nestjs/common';
import { UserWithoutPassword } from 'src/type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
}
