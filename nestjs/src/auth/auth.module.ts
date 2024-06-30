import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret, // TODO configプロバイダ使う
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtStrategy, JwtModule],
})
export class AuthModule {}
