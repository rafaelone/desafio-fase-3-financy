import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DashboardCategory } from './dashboard-category';
import { DashboardCategorySkeleton } from './dashboard-category-skeleton';
import { useQuery } from '@apollo/client/react';
import { GET_DASHBOARD_CATEGORIES } from '@/lib/graphql/queries/dashboard-categories';
import type { ListCategories } from '@/types';

export function DashboardCategories() {
  const { data, loading } = useQuery<{ listCategories: ListCategories }>(
    GET_DASHBOARD_CATEGORIES,
  );

  return (
    <div className="max-w-[378px] w-full bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between h-[61px] border-b border-b-gray-200 px-6">
        <span className="font-medium text-xs leading-4  text-gray-500 uppercase">
          Categorias
        </span>
        <Link
          to="/categories"
          className="text-brand-base items-center flex gap-1 font-medium text-sm leading-5 group hover:text-brand-dark"
        >
          Gerenciar
          <ChevronRight className="size-5" />
        </Link>
      </div>

      {loading ? (
        <ul className="p-6 flex flex-col gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <DashboardCategorySkeleton key={index} />
          ))}
        </ul>
      ) : data?.listCategories.categories &&
        data.listCategories.categories.length > 0 ? (
        <ul className="p-6 flex flex-col gap-5">
          {data.listCategories.categories.map((category) => (
            <DashboardCategory
              key={category.id}
              color={category.color}
              numberOfItems={category.transactionCount}
              title={category.title}
              value={category.totalAmount || 0}
            />
          ))}
        </ul>
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          Nenhuma categoria encontrada
        </div>
      )}
    </div>
  );
}
