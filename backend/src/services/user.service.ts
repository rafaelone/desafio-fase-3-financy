import { prismaClient } from '../../prisma/prisma';
import type { UpdateUserInput } from '../dtos/input/user.input';

export class UserService {
  async getUser(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return user;
  }

  async updateUser(userId: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: data.fullName,
      },
    });

    return updatedUser;
  }
}
