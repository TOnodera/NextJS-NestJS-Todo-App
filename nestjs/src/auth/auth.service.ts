import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { strict } from 'assert';
import { compare } from 'bcryptjs';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    // ロガーのコンテキスト設定
    this.loggerService.setContext(AuthService.name);
  }
  async login(
    email: string,
    pass: string,
  ): Promise<{ accessToken: string; userId: number; roleId: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.loggerService.debug('ログインに失敗しました');
      throw new UnauthorizedException();
    }
    this.loggerService.debug(`email: ${user.email}, pass: ${pass}`);
    const isValidUser = await compare(pass, user?.password);
    if (!isValidUser) {
      this.loggerService.debug('ログインに失敗しました');
      throw new UnauthorizedException();
    }
    const payload = { username: user.name, sub: user.id };
    this.loggerService.debug('ログインしました');
    return {
      accessToken: await this.jwtService.signAsync(payload),
      userId: user.id,
      roleId: user.role.id,
    };
  }
}
