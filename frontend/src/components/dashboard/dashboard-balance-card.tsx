import { Skeleton } from '../ui/skeleton';
import { formatCurrency } from '@/utils/formatMoney';
import type { ReactNode } from 'react';

type BalanceCard = {
  loading: boolean;
  title: string;
  icon: ReactNode;
  value: number;
};

export function DashboardBalanceCard({
  loading = true,
  title,
  icon,
  value,
}: BalanceCard) {
  return (
    <div className="w-full h-29.5 p-6 bg-white border border-gray-200 rounded-xl gap-4 flex flex-col">
      <div className="gap-3 flex items-center">
        {icon}
        <span className="uppercase text-gray-500 font-medium text-xs leading-4">
          {title}
        </span>
      </div>
      <strong className="font-bold text-[28px] leading-8 text-gray-800">
        {loading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          formatCurrency(value || 0)
        )}
      </strong>
    </div>
  );
}
