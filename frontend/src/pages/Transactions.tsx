import {
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  SquarePen,
  Trash,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/list-transactions';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/delete-transaction';
import { GET_BALANCE } from '@/lib/graphql/queries/balance';
import { GET_RECENT_TRANSACTIONS } from '@/lib/graphql/queries/recent-transactions';
import { GET_DASHBOARD_CATEGORIES } from '@/lib/graphql/queries/dashboard-categories';
import { iconMap } from '@/utils/iconMap';
import { TransactionsFilters } from '@/components/transactions/transactions-filters';
import { TransactionRowSkeleton } from '@/components/transactions/transaction-row-skeleton';
import { Dialog } from '@/components/dialog';
import { DialogFormTransaction } from '@/components/dialog/dialog-form-transaction';
import { Pagination } from '@/components/ui/pagination';
import { useTransactionModals } from '@/stores/transaction-modals';
import { toast } from 'sonner';

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

export function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    transactionModal,
    openCreateModal,
    openEditModal,
    closeTransactionModal,
  } = useTransactionModals();

  const page = Number(searchParams.get('page')) || 1;
  const type = searchParams.get('type') || '';
  const categoryId = searchParams.get('categoryId') || '';

  // Define valores default para mês/ano atual
  const currentDate = new Date();
  const month = searchParams.get('month') || String(currentDate.getMonth() + 1);
  const year = searchParams.get('year') || String(currentDate.getFullYear());

  const { data, loading, refetch } = useQuery<{
    listTransactions: {
      transactions: Transaction[];
      total: number;
      totalPages: number;
    };
  }>(LIST_TRANSACTIONS, {
    variables: {
      filters: {
        description: searchParams.get('description') || undefined,
        type: type || undefined,
        categoryId: categoryId || undefined,
        month: Number(month),
        year: Number(year),
        page,
        perPage: 10,
      },
    },
  });

  const { data: categoriesData } = useQuery<{
    listCategories: {
      categories: Array<{ id: string; title: string }>;
    };
  }>(LIST_ALL_CATEGORIES);

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [
      { query: GET_BALANCE },
      { query: GET_RECENT_TRANSACTIONS },
      { query: GET_DASHBOARD_CATEGORIES, variables: { limit: 12 } },
    ],
    onCompleted: () => {
      toast.success('Transação deletada com sucesso!');
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao deletar transação');
    },
  });

  const transactions = data?.listTransactions.transactions || [];
  const total = data?.listTransactions.total || 0;
  const totalPages = data?.listTransactions.totalPages || 1;
  const categories = categoriesData?.listCategories.categories || [];

  function handlePageChange(newPage: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  }

  function handleDeleteTransaction(id: string) {
    deleteTransaction({
      variables: { id },
    });
  }

  return (
    <div className="px-12">
      <div className="max-w-[1184px] w-auto mx-auto mt-12">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex justify-center flex-col gap-0.5">
            <strong className="font-bold text-2xl leading-8 text-gray-800">
              Transações
            </strong>
            <span className="font-normal text-base leading-6 text-gray-600">
              Gerencie todas as suas transações financeiras
            </span>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-brand-base  px-3 justify-center py-2 text-white flex items-center gap-2 rounded-[8px] h-9 font-medium text-sm leading-5 hover:bg-brand-dark transition-colors"
          >
            <Plus className="size-4" />
            Nova transação
          </button>
        </div>
        <TransactionsFilters />
        {/* tabela */}
        <div className="bg-white rounded-xl border border-gray-200 w-full mt-8 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="font-medium text-xs text-gray-500 uppercase text-left h-[57px] pl-6">
                  descrição
                </th>
                <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                  data
                </th>
                <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                  categoria
                </th>
                <th className="font-medium text-xs text-gray-500 uppercase text-center ">
                  tipo
                </th>
                <th className="font-medium text-xs text-gray-500 uppercase text-right ">
                  valor
                </th>
                <th className="font-medium text-xs text-gray-500 uppercase text-right pr-6">
                  ações
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <>
                  {Array.from({ length: 10 }).map((_, index) => (
                    <TransactionRowSkeleton key={index} />
                  ))}
                </>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <span className="text-gray-500">
                      Nenhuma transação encontrada
                    </span>
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => {
                  if (!transaction || !transaction.category) return null;

                  const Icon =
                    iconMap[transaction.category.icon] || iconMap.Wallet;
                  const isIncome = transaction.type === 'income';
                  const date = new Date(transaction.date);
                  const formattedDate = `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCFullYear()).slice(-2)}`;
                  const formattedAmount = transaction.amount.toLocaleString(
                    'pt-BR',
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  );

                  return (
                    <tr key={transaction.id}>
                      <td className="pl-6 py-4 border-b border-gray-200">
                        <div className="flex gap-4 items-center">
                          <div
                            className={`size-10 bg-${transaction.category.color}-light flex items-center justify-center rounded-lg`}
                          >
                            <Icon
                              className={`size-4 text-${transaction.category.color}-base`}
                            />
                          </div>
                          <span className="font-normal text-sm text-gray-800">
                            {transaction.description}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 border-b border-gray-200 text-center">
                        <span className="font-normal text-sm text-gray-600 leading-5">
                          {formattedDate}
                        </span>
                      </td>
                      <td className="py-4 border-b border-gray-200 text-center">
                        <span
                          className={`font-medium text-sm bg-${transaction.category.color}-light text-${transaction.category.color}-dark px-3 py-1 rounded-full`}
                        >
                          {transaction.category.title}
                        </span>
                      </td>
                      <td className="py-4 border-b border-gray-200">
                        <div className="flex items-center justify-center gap-2">
                          {isIncome ? (
                            <>
                              <CircleArrowUp className="size-4 text-green-base" />
                              <span className="font-medium text-sm text-green-dark">
                                Entrada
                              </span>
                            </>
                          ) : (
                            <>
                              <CircleArrowDown className="size-4 text-red-base" />
                              <span className="font-medium text-sm text-red-dark">
                                Saída
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="py-4 border-b border-gray-200 text-right">
                        <span className="font-semibold text-sm text-gray-800">
                          {isIncome ? '+' : '-'} R$ {formattedAmount}
                        </span>
                      </td>
                      <td className="pr-6 py-4 border-b border-gray-200 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleDeleteTransaction(transaction.id)
                            }
                            className="size-8 border border-gray-200 bg-white rounded-lg text-danger flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Trash className="size-4" />
                          </button>
                          <button
                            onClick={() => openEditModal(transaction)}
                            className="size-8 border border-gray-200 bg-white rounded-lg text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <SquarePen className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={total}
            itemsPerPage={10}
            onPageChange={handlePageChange}
          />
        </div>
        {/* tabela */}
      </div>

      <Dialog
        open={transactionModal.isOpen}
        onOpenChange={(open) => {
          if (!open) closeTransactionModal();
        }}
        title={
          transactionModal.transaction ? 'Editar Transação' : 'Nova Transação'
        }
        description={
          transactionModal.transaction
            ? 'Atualize os dados da transação'
            : 'Registre sua despesa ou receita'
        }
      >
        <DialogFormTransaction
          categories={categories}
          transactionId={transactionModal.transaction?.id}
          initialData={
            transactionModal.transaction
              ? {
                  description: transactionModal.transaction.description,
                  type: transactionModal.transaction.type,
                  date: new Date(transactionModal.transaction.date)
                    .toISOString()
                    .split('T')[0],
                  amount: transactionModal.transaction.amount,
                  categoryId: transactionModal.transaction.categoryId,
                }
              : undefined
          }
          onSuccess={refetch}
          onClose={closeTransactionModal}
        />
      </Dialog>
    </div>
  );
}
