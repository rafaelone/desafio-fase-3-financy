import {
  ChevronLeft,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  SquarePen,
  Trash,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/list-transactions';
import { iconMap } from '@/utils/iconMap';
import { TransactionsFilters } from '@/components/transactions/transactions-filters';

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

  const page = Number(searchParams.get('page')) || 1;
  const type = searchParams.get('type') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const month = searchParams.get('month') || '';
  const year = searchParams.get('year') || '';

  const { data, loading } = useQuery<{
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
        month: month ? Number(month) : undefined,
        year: year ? Number(year) : undefined,
        page,
        perPage: 12,
      },
    },
  });

  const transactions = data?.listTransactions.transactions || [];
  const total = data?.listTransactions.total || 0;
  const totalPages = data?.listTransactions.totalPages || 1;

  function handlePageChange(newPage: number) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    setSearchParams(newParams);
  }

  const startItem = (page - 1) * 12 + 1;
  const endItem = Math.min(page * 12, total);
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
          <button className="bg-brand-base  px-3 justify-center py-2 text-white flex items-center gap-2 rounded-[8px] h-9 font-medium text-sm leading-5 hover:bg-brand-dark transition-colors">
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
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <span className="text-gray-500">Carregando...</span>
                  </td>
                </tr>
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
                  const formattedDate = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  });
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
                          <button className="size-8 border border-gray-200 bg-white rounded-lg text-danger flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Trash className="size-4" />
                          </button>
                          <button className="size-8 border border-gray-200 bg-white rounded-lg text-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors">
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
          <footer className="px-6 py-5 flex items-center justify-between">
            <span className="flex gap-1 font-normal text-sm text-gray-700">
              {total > 0 ? `${startItem} a ${endItem}` : '0 a 0'}
              <span className="h-5 bg-gray-700 w-px block" />
              {total} {total === 1 ? 'resultado' : 'resultados'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="size-8 rounded-lg text-gray-700 border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => {
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`size-8 rounded-lg border transition-colors flex items-center justify-center ${
                          pageNum === page
                            ? 'bg-brand-base text-white border-brand-base hover:bg-brand-dark'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                },
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || totalPages === 0}
                className="size-8 rounded-lg text-gray-700 border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </footer>
        </div>
        {/* tabela */}
      </div>
    </div>
  );
}
