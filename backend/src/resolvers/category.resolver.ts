import { Arg, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from 'type-graphql';
import { CategoryModel } from '../models/category.model';
import { IsAuth } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';
import { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input';
import { GqlUser } from '../graphql/decorators/user.decorator';
import type { User } from '@prisma/client';
import { UserModel } from '../models/user.model';
import { TransactionModel } from '../models/transaction.model';
import { prismaClient } from '../../prisma/prisma';
import { CategoriesListOutput } from '../dtos/output/category.output';

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private readonly categoryService = new CategoryService();

  @Query(() => CategoriesListOutput)
  async listCategories(
    @GqlUser() user: User,
    @Arg('limit', () => Int, { nullable: true }) limit?: number,
  ): Promise<CategoriesListOutput> {
    return this.categoryService.listCategories(user.id, limit);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    return this.categoryService.deleteCategory(id, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('id', () => String) id: string,
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(id, data, user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() category: CategoryModel): Promise<UserModel> {
    const user = await prismaClient.user.findUnique({
      where: { id: category.userId },
    });
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    return prismaClient.transaction.findMany({
      where: { categoryId: category.id },
      orderBy: { date: 'desc' },
    });
  }
}
