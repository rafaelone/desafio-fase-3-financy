import { formatCurrency } from '@/utils/formatMoney';
import { Badge } from '../ui/badge';

type DashboardCategoryProps = {
  title: string;
  color: string;
  numberOfItems: number;
  value: number;
};

export function DashboardCategory({
  title,
  color,
  numberOfItems,
  value,
}: DashboardCategoryProps) {
  return (
    <li className="flex items-center justify-between gap-8 max-sm:flex-col max-sm:gap-4">
      <Badge title={title} color={color} />

      <div className="flex items-center gap-4">
        <span className="font-normal text-sm leading-5 text-gray-600 whitespace-nowrap">
          {numberOfItems} {numberOfItems > 1 ? `itens` : 'item'}
        </span>
        <strong className="font-semibold text-sm leading-5 text-gray-800 whitespace-nowrap">
          {formatCurrency(value || 0)}
        </strong>
      </div>
    </li>
  );
}
