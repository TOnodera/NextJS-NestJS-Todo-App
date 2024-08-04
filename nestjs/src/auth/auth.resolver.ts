import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.dto';
import { LoginResult } from './value/LoginResult';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => LoginResult, { name: 'login' })
  async login(@Args('login') loginInput: LoginInput) {
    return await this.authService.login(loginInput.email, loginInput.password);
  }
}
