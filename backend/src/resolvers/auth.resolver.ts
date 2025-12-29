import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { LoginInput, RegisterInput } from '../dtos/input/auth.input';

import { AuthService } from '../services/auth.service';
import { LoginOutput, RegisterOutput } from '../dtos/output/auth.output';

@Resolver()
export class AuthResolver {
  private readonly authService = new AuthService();

  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello World!';
  }

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput,
  ): Promise<LoginOutput> {
    return this.authService.login(data);
  }

  @Mutation(() => RegisterOutput)
  async register(
    @Arg('data', () => RegisterInput) data: RegisterInput,
  ): Promise<RegisterOutput> {
    return this.authService.register(data);
  }
}