import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { BalanceModel } from '../models/balance.model';
import { IsAuth } from '../middlewares/auth.middleware';
import { BalanceService } from '../services/balance.service';
import { GqlUser } from '../graphql/decorators/user.decorator';
import type { User } from '@prisma/client';

@Resolver(() => BalanceModel)
@UseMiddleware(IsAuth)
export class BalanceResolver {
  private readonly balanceService = new BalanceService();

  @Query(() => BalanceModel)
  async getBalance(@GqlUser() user: User): Promise<BalanceModel> {
    return this.balanceService.getBalance(user.id);
  }
}
