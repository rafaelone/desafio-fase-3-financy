import { GET_MOST_USED_CATEGORY } from '@/lib/graphql/queries/most-used-category';
import { useQuery } from '@apollo/client/react';
import { Tag } from 'lucide-react';

export function MostUsedCategory() {
  const { data, loading } = useQuery<{
    listCategories: {
      mostUsedCategory?: {
        id: string;
        title: string;
        icon: string;
        color: string;
        transactionCount: number;
      };
    };
  }>(GET_MOST_USED_CATEGORY);

  const category = data?.listCategories.mostUsedCategory;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
      <Tag className="size-8 text-blue-base" />
      <div className="flex flex-col gap-2">
        <strong className="text-gray-800 font-bold text-[28px] leading-8">
          {loading ? '...' : category?.title || 'Nenhuma'}
        </strong>
        <span className="font-medium uppercase text-xs text-gray-500 leading-4">
          categoria mais utilizada
        </span>
      </div>
    </div>
  );
}
