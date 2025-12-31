export type User = {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type Balance = {
  totalBalance: number;
  totalExpense: number;
  totalIncome: number;
};

export type Category = {
  id: string;
  title: string;
  icon: string;
  color: string;
  transactionCount: number;
  totalAmount: number;
};

export type ListCategories = {
  categories: Category[];
  totalCategories: number;
  totalTransactions: number;
  mostUsedCategory: {
    title: string;
  };
};
