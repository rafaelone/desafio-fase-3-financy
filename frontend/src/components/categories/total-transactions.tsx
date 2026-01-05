import { GET_TOTAL_TRANSACTIONS } from '@/lib/graphql/queries/total-transactions';
import { useQuery } from '@apollo/client/react';
import { ArrowUpDown } from 'lucide-react';

export function TotalTransactions() {
  const { data, loading } = useQuery<{
    listCategories: {
      totalTransactions: number;
    };
  }>(GET_TOTAL_TRANSACTIONS);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
      <ArrowUpDown className="size-8 text-purple-base" />
      <div className="flex flex-col gap-2">
        <strong className="text-gray-800 font-bold text-[28px] leading-8">
          {loading ? '...' : data?.listCategories.totalTransactions || 0}
        </strong>
        <span className="font-medium uppercase text-xs text-gray-500 leading-4">
          Total de transações
        </span>
      </div>
    </div>
  );
}
