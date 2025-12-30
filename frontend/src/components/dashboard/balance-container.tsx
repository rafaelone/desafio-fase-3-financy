import { GET_BALANCE } from '@/lib/graphql/queries/balance';
import type { Balance } from '@/types';

import { useQuery } from '@apollo/client/react';
import { CircleArrowDown, CircleArrowUp, Wallet } from 'lucide-react';

import { BalanceCard } from './balance-card';

export function BalanceContainer() {
  const { data, loading } = useQuery<{ getBalance: Balance }>(GET_BALANCE, {});

  return (
    <div className="flex gap-6 items-center max-lg:flex-col">
      <BalanceCard
        icon={<Wallet className="size-5 text-purple-base" />}
        title="Saldo total"
        value={data?.getBalance.totalBalance || 0}
        loading={loading}
      />
      <BalanceCard
        icon={<CircleArrowUp className="size-5 text-brand-base" />}
        title="Receitas do mês"
        value={data?.getBalance.totalIncome || 0}
        loading={loading}
      />
      <BalanceCard
        icon={<CircleArrowDown className="size-5 text-red-base" />}
        title="Despesas do mês"
        value={data?.getBalance.totalExpense || 0}
        loading={loading}
      />
    </div>
  );
}
