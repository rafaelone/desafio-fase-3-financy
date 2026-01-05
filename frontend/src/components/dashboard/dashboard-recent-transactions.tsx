import { useQuery } from '@apollo/client/react';
import { GET_RECENT_TRANSACTIONS } from '@/lib/graphql/queries/recent-transactions';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { iconMap } from '@/utils/iconMap';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Transaction = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
  category: {
    id: string;
    title: string;
    icon: string;
    color: string;
  };
};

export function DashboardRecentTransactions() {
  const { data, loading } = useQuery<{
    listTransactions: {
      transactions: Transaction[];
      total: number;
    };
  }>(GET_RECENT_TRANSACTIONS);

  const transactions = data?.listTransactions.transactions || [];

  if (loading) {
    return (
      <div className="px-6 py-8 text-center text-gray-500">
        Carregando transações...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-gray-500">
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <>
      {transactions.map((transaction) => {
        const IconComponent =
          iconMap[transaction.category.icon] || iconMap.home;
        const isIncome = transaction.type === 'income';
        const color = transaction.category.color;

        return (
          <div
            key={transaction.id}
            className="grid grid-cols-[1fr_160px_160px] items-center gap-4 px-6 h-[80px] border-b border-b-gray-200 
              max-sm:h-auto max-sm:flex max-sm:flex-col max-sm:p-6
            "
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className={`size-10 rounded-[8px] bg-${color}-light flex items-center justify-center shrink-0`}
              >
                <IconComponent className={`size-4 text-${color}-base`} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <strong className="font-medium text-base leading-6 text-gray-800 truncate">
                  {transaction.description}
                </strong>
                <span className="font-normal text-sm leading-5 text-gray-600">
                  {format(new Date(transaction.date), 'dd/MM/yy', {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>

            <div className="flex justify-center max-lg:ml-auto max-sm:ml-0">
              <span
                className={`px-6 py-1 rounded-full bg-${color}-light text-${color}-dark font-medium text-sm leading-5`}
              >
                {transaction.category.title}
              </span>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <strong className="font-semibold text-sm leading-5 text-right text-gray-800">
                {isIncome ? '+ ' : '- '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </strong>
              {isIncome ? (
                <CircleArrowUp className="size-4 text-brand-base" />
              ) : (
                <CircleArrowDown className="size-4 text-red-base" />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
