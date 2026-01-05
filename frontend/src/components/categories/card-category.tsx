import { SquarePen, Trash, Home } from 'lucide-react';
import { Badge } from '../ui/badge';
import { iconMap } from '@/utils/iconMap';

type CardCategoryProps = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  transactionCount: number;
  totalAmount: number;
};

export function CardCategory({
  title,
  description,
  icon,
  color,
  transactionCount,
}: CardCategoryProps) {
  const IconComponent = iconMap[icon] || Home;

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 w-[284px] gap-5">
      <div className="flex items-start justify-between">
        <div
          className={`flex items-center justify-center bg-${color}-light size-10 rounded-lg`}
        >
          <IconComponent className={`size-5 text-${color}-dark`} />
        </div>
        <div className="flex items-center gap-2">
          <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <Trash className="size-4 text-danger" />
          </button>
          <button className="size-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <SquarePen className="size-4 text-gray-700" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <strong className="font-semibold text-base leading-6 text-gray-800">
          {title}
        </strong>
        <span className="font-normal text-sm leading-5 text-gray-600">
          {description || 'Sem descrição'}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Badge title={title} color={color} />
        <span className="text-gray-600 font-normal text-sm leading-5">
          {transactionCount} {transactionCount === 1 ? 'item' : 'itens'}
        </span>
      </div>
    </div>
  );
}
