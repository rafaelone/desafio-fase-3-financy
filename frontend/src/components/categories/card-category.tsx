import { SquarePen, Trash, Home } from 'lucide-react';
import { Badge } from '../ui/badge';
import { iconMap } from '@/utils/iconMap';
import { useMutation } from '@apollo/client/react';
import { DELETE_CATEGORY } from '@/lib/graphql/mutations/delete-category';
import { toast } from 'sonner';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';
import { GET_TOTAL_CATEGORIES } from '@/lib/graphql/queries/total-categories';
import { GET_TOTAL_TRANSACTIONS } from '@/lib/graphql/queries/total-transactions';
import { GET_MOST_USED_CATEGORY } from '@/lib/graphql/queries/most-used-category';

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
  id,
  title,
  description,
  icon,
  color,
  transactionCount,
}: CardCategoryProps) {
  const IconComponent = iconMap[icon] || Home;

  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      { query: LIST_ALL_CATEGORIES },
      { query: GET_TOTAL_CATEGORIES },
      { query: GET_TOTAL_TRANSACTIONS },
      { query: GET_MOST_USED_CATEGORY },
    ],
    onCompleted: () => {
      toast.success('Categoria deletada com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao deletar categoria');
    },
  });

  function handleDelete() {
    deleteCategory({ variables: { id } });
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-xl border border-gray-200 w-[284px] gap-5">
      <div className="flex items-start justify-between">
        <div
          className={`flex items-center justify-center bg-${color}-light size-10 rounded-lg`}
        >
          <IconComponent className={`size-5 text-${color}-dark`} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="size-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
        <span className="font-normal text-sm leading-5 text-gray-600 truncate">
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
