import { GET_TOTAL_CATEGORIES } from '@/lib/graphql/queries/total-categories';
import { useQuery } from '@apollo/client/react';
import { Tag } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export function TotalCategories() {
  const { data, loading } = useQuery<{
    listCategories: {
      totalCategories: number;
    };
  }>(GET_TOTAL_CATEGORIES);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex gap-4 w-full">
      <Tag className="size-8 text-gray-700" />
      <div className="flex flex-col gap-2">
        {loading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <strong className="text-gray-800 font-bold text-[28px] leading-8">
            {data?.listCategories.totalCategories || 0}
          </strong>
        )}
        <span className="font-medium uppercase text-xs text-gray-500 leading-4">
          total de categorias
        </span>
      </div>
    </div>
  );
}
