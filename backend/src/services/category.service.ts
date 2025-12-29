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

    return category;
  }

  async listCategories(userId: string) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId: userId,
      },
      include: {
        _count: {
          select: {
            transactions: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    const categoriesWithCount = categories.map((category) => ({
      ...category,
      transactionCount: category._count.transactions,
    }));

    const totalCategories = categories.length;

    const totalTransactions = await prismaClient.transaction.count({
      where: {
        userId: userId,
      },
    });

    // Categoria mais utilizada
    const mostUsedCategory = categoriesWithCount.reduce((prev, current) => {
      return current.transactionCount > (prev?.transactionCount || 0) ? current : prev;
    }, categoriesWithCount[0] || null);

    return {
      categories: categoriesWithCount,
      totalCategories,
      totalTransactions,
      mostUsedCategory: mostUsedCategory?.transactionCount > 0 ? mostUsedCategory : null,
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

    return updatedCategory;
  }
}
