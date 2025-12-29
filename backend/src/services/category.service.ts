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
    return prismaClient.category.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        title: 'asc',
      },
    });
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
