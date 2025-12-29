import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { UserModel } from '../models/user.model';
import { IsAuth } from '../middlewares/auth.middleware';
import { UserService } from '../services/user.service';
import { UpdateUserInput } from '../dtos/input/user.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import type { User } from '@prisma/client';

@Resolver(() => UserModel)
@UseMiddleware(IsAuth)
export class UserResolver {
  private readonly userService = new UserService();

  @Query(() => UserModel)
  async me(@GqlUser() user: User): Promise<UserModel> {
    return this.userService.getUser(user.id);
  }

  @Mutation(() => UserModel)
  async updateUser(
    @Arg('data', () => UpdateUserInput) data: UpdateUserInput,
    @GqlUser() user: User,
  ): Promise<UserModel> {
    return this.userService.updateUser(user.id, data);
  }
}
