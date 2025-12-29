import type { User } from '@prisma/client';
import { prismaClient } from '../../prisma/prisma';

import { comparePassword, hashPassword } from '../utils/hash';
import { signJwt } from '../utils/jwt';
import type { LoginInput, RegisterInput } from '../dtos/input/auth.input';

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser) throw new Error('Usuário não cadastrado!');

    const compare = await comparePassword(data.password, existingUser.password);

    if (!compare) throw new Error('E-mail ou senhá inválidos');

    return this.generateTokens(existingUser);
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) throw new Error('E-mail já cadastrado');

    const hash = await hashPassword(data.password);

    const user = await prismaClient.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hash,
      },
    });
    return this.generateTokens(user);
  }

  generateTokens(user: User) {
    const token = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      '15m',
    );

    const refreshToken = signJwt(
      {
        id: user.id,
        email: user.email,
      },
      '1d',
    );

    return { token, refreshToken, user };
  }
}