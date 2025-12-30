import { prismaClient } from '../../prisma/prisma';

export class BalanceService {
  async getBalance(userId: string) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const allTransactions = await prismaClient.transaction.findMany({
      where: { userId },
      select: {
        type: true,
        amount: true,
      },
    });

    const monthTransactions = await prismaClient.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      select: {
        type: true,
        amount: true,
      },
    });

    const totalIncome = allTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = allTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

    const monthIncome = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthExpense = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalBalance,
      totalIncome: monthIncome,
      totalExpense: monthExpense,
    };
  }
}
