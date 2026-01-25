import { prismaClient } from '../../prisma/prisma';
import type { CreateTransactionInput, UpdateTransactionInput } from '../dtos/input/transaction.input';
import type { TransactionFilterInput } from '../dtos/input/transaction-filter.input';

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

  async listTransactions(userId: string, filters?: TransactionFilterInput) {
    const where: any = {
      userId: userId,
    };

    if (filters?.description) {
      where.description = {
        contains: filters.description,
      };
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.categoryId) {
      where.categoryId = filters.categoryId;
    }

    if (filters?.year || filters?.month) {
      const year = filters.year || new Date().getFullYear();
      const month = filters.month;

      let startDate: Date;
      let endDate: Date;

      if (month) {
        // Criar datas em UTC para evitar problemas de timezone
        startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));
        endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
      } else {
        startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
        endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
      }


      where.date = {
        gte: startDate,
        lte: endDate,
      };
    } else if (filters?.startDate || filters?.endDate) {
      where.date = {};
      
      if (filters.startDate) {
        where.date.gte = filters.startDate;
      }
      
      if (filters.endDate) {
        where.date.lte = filters.endDate;
      }
    }


    // Paginação
    const page = filters?.page || 1;
    const perPage = filters?.perPage || 10;
    const skip = (page - 1) * perPage;

    // Buscar total de registros
    const total = await prismaClient.transaction.count({ where });

    // Buscar transações paginadas
    const transactions = await prismaClient.transaction.findMany({
      where,
      orderBy: {
        date: 'desc',
      },
      skip,
      take: perPage,
    });

    const totalPages = Math.ceil(total / perPage);


    return {
      transactions,
      total,
      totalPages,
    };
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

  async updateTransaction(transactionId: string, data: UpdateTransactionInput, userId: string) {
    const transaction = await prismaClient.transaction.findFirst({
      where: {
        id: transactionId,
        userId: userId,
      },
    });

    if (!transaction) {
      throw new Error('Transação não encontrada ou você não tem permissão para editá-la.');
    }

    if (data.type && data.type !== 'expense' && data.type !== 'income') {
      throw new Error('Tipo de transação inválido. Use "expense" ou "income".');
    }

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
}
