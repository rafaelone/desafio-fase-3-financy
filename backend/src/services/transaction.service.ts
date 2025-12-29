import { prismaClient } from '../../prisma/prisma';
import type { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input';

export class TransactionService {
  async createTransaction(data: CreateTransactionInput, userId: string) {
    if (data.type !== 'expense' && data.type !== 'income') {
      throw new Error('Tipo de transação inválido. Use "expense" ou "income".');
    }

    const category = await prismaClient.category.findFirst({
      where: {
        id: data.categoryId,
        userId: userId,
      },
    });

    if (!category) {
      throw new Error('Categoria não encontrada.');
    }

    const transaction = await prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
        userId: userId,
      },
    });

    return transaction;
  }

  async listTransactions(userId: string) {
    return prismaClient.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async deleteTransaction(transactionId: string, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userId,
      },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada ou você não tem permissão para deletá-la.');
    }

    await prismaClient.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return true;
  }
}

  async updateTransaction(transactionId: string, data: UpdateTransactionInput, userId: string) {
    // Verificar se a transação existe e pertence ao usuário
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userId,
      },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada ou você não tem permissão para editá-la.');
    }

    // Validar tipo se fornecido
    if (data.type && data.type !== 'expense' && data.type !== 'income') {
      throw new Error('Tipo de transação inválido. Use "expense" ou "income".');
    }

    // Validar categoria se fornecida
    if (data.categoryId) {
      const category = await prismaClient.category.findFirst({
        where: {
          id: data.categoryId,
          userId: userId,
        },
      });

      if (!category) {
        throw new Error('Categoria não encontrada ou não pertence ao usuário.');
      }
    }

    // Atualizar a transação
    const updatedTransaction = await prismaClient.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        type: data.type,
        description: data.description,
        date: data.date,
        amount: data.amount,
        categoryId: data.categoryId,
      },
    });

    return updatedTransaction;
  }
