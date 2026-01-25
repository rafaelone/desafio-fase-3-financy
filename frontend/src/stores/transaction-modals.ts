import { create } from 'zustand';

type Transaction = {
  id: string;
  type: 'income' | 'expense';
  description: string;
  date: string;
  amount: number;
  categoryId: string;
  category: {
    id: string;
    title: string;
    icon: string;
    color: string;
  };
};

type TransactionModalsState = {
  transactionModal: {
    isOpen: boolean;
    transaction: Transaction | null;
  };
  deleteModal: {
    isOpen: boolean;
    transactionId: string | null;
    transactionDescription: string;
  };
  openCreateModal: () => void;
  openEditModal: (transaction: Transaction) => void;
  closeTransactionModal: () => void;
  openDeleteModal: (transaction: Transaction) => void;
  closeDeleteModal: () => void;
};

export const useTransactionModals = create<TransactionModalsState>((set) => ({
  transactionModal: {
    isOpen: false,
    transaction: null,
  },
  deleteModal: {
    isOpen: false,
    transactionId: null,
    transactionDescription: '',
  },
  openCreateModal: () =>
    set({
      transactionModal: { isOpen: true, transaction: null },
    }),
  openEditModal: (transaction) =>
    set({
      transactionModal: { isOpen: true, transaction },
    }),
  closeTransactionModal: () =>
    set({
      transactionModal: { isOpen: false, transaction: null },
    }),
  openDeleteModal: (transaction) =>
    set({
      deleteModal: {
        isOpen: true,
        transactionId: transaction.id,
        transactionDescription: transaction.description,
      },
    }),
  closeDeleteModal: () =>
    set({
      deleteModal: {
        isOpen: false,
        transactionId: null,
        transactionDescription: '',
      },
    }),
}));
