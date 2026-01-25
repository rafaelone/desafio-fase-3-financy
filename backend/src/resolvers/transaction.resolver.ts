import { Arg, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { TransactionModel } from '../models/transaction.model';
import { IsAuth } from '../middlewares/auth.middleware';
import { TransactionService } from '../services/transaction.service';
import { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input';
import { TransactionFilterInput } from '../dtos/input/transaction-filter.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import type { User } from '@prisma/client';
import { UserModel } from '../models/user.model';
import { prismaClient } from '../../prisma/prisma';
import { CategoryModel } from '../models/category.model';
import { PaginatedTransactionsOutput } from '../dtos/output/transaction.output';

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private readonly transactionService = new TransactionService();

  @Query(() => PaginatedTransactionsOutput)
  async listTransactions(
    @Arg('filters', () => TransactionFilterInput, { nullable: true }) filters: TransactionFilterInput,
    @GqlUser() user: User,
  ): Promise<PaginatedTransactionsOutput> {
    return this.transactionService.listTransactions(user.id, filters);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.transactionService.deleteTransaction(id, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(id, data, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({
      where: { id: transaction.userId },
    });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  @FieldResolver(() => CategoryModel)
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
    const category = await prismaClient.category.findUnique({
      where: { id: transaction.categoryId },
      include: {
        transactions: {
          select: {
            amount: true,
          },
        },
      },
    });
    if (!category) throw new Error('Categoria não encontrada');

    const transactionCount = category.transactions.length;
    const totalAmount = category.transactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    return {
      ...category,
      transactionCount,
      totalAmount,
    };
  }
}
