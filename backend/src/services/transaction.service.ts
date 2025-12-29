import { prismaClient } from '../../prisma/prisma';
import type { CreateTransactionInput } from '../dtos/input/transaction.input';

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
    // Verificar se a transação existe e pertence ao usuário
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userId,
      },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada ou você não tem permissão para deletá-la.');
    }

    // Deletar a transação
    await prismaClient.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    return true;
  }
}
