import { prismaClient } from '../../prisma/prisma';
import type { CreateCategoryInput, UpdateCategoryInput } from '../dtos/input/category.input';

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    const existingCategory = await prismaClient.category.findFirst({
      where: {
        title: data.title,
        userId: userId,
      },
    });

    if (existingCategory) {
      throw new Error('Você já possui uma categoria com este título.');
    }

    const category = await prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
        userId: userId,
      },
    });

    return {
      ...category,
      transactionCount: 0,
      totalAmount: 0,
    };
  }

  async listCategories(userId: string, limit?: number) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId: userId,
      },
      include: {
        transactions: {
          select: {
            amount: true,
          },
        },
      },
    });

    const categoriesWithStats = categories.map((category) => {
      const transactionCount = category.transactions.length;
      const totalAmount = category.transactions.reduce((sum, transaction) => {
        return sum + transaction.amount;
      }, 0);

      return {
        id: category.id,
        title: category.title,
        description: category.description,
        icon: category.icon,
        color: category.color,
        userId: category.userId,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        transactionCount,
        totalAmount: totalAmount,
      };
    });

    categoriesWithStats.sort((a, b) => 
      a.title.toLowerCase().localeCompare(b.title.toLowerCase(), 'pt-BR')
    );

    const totalCategories = categoriesWithStats.length;
    const totalTransactions = categoriesWithStats.reduce((sum, cat) => sum + cat.transactionCount, 0);
    
    const sortedByUsage = [...categoriesWithStats].sort((a, b) => b.transactionCount - a.transactionCount);
    const mostUsedCategory = sortedByUsage[0]?.transactionCount > 0 ? sortedByUsage[0] : null;

    const limitedCategories = limit ? categoriesWithStats.slice(0, limit) : categoriesWithStats;

    return {
      categories: limitedCategories,
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    };
  }

  async deleteCategory(categoryId: string, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada ou você não tem permissão para deletá-la.');
    }

    await prismaClient.category.delete({
      where: {
        id: categoryId,
      },
    });

    return true;
  }

  async updateCategory(categoryId: string, data: UpdateCategoryInput, userId: string) {
    const category = await prismaClient.category.findFirst({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada ou você não tem permissão para editá-la.');
    }

    if (data.title && data.title !== category.title) {
      const existingCategory = await prismaClient.category.findFirst({
        where: {
          title: data.title,
          userId: userId,
          id: { not: categoryId },
        },
      });

      if (existingCategory) {
        throw new Error('Você já possui uma categoria com este título.');
      }
    }

    const updatedCategory = await prismaClient.category.update({
      where: {
        id: categoryId,
      },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    });

    const transactions = await prismaClient.transaction.findMany({
      where: {
        categoryId: categoryId,
      },
      select: {
        amount: true,
      },
    });

    const transactionCount = transactions.length;
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    return {
      ...updatedCategory,
      transactionCount,
      totalAmount: Math.round(totalAmount * 100) / 100,
    };
  }
}
