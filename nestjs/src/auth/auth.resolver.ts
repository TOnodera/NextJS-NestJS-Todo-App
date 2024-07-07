import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Token } from './value/Token';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.dto';

@Resolver(() => Token)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => Token, { name: 'login' })
  async login(@Args('login') loginInput: LoginInput) {
    return await this.authService.login(loginInput.email, loginInput.password);
  }
}
