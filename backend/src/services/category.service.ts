import { prismaClient } from '../../prisma/prisma';
import type { CreateCategoryInput } from '../dtos/input/category.input';

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
}
