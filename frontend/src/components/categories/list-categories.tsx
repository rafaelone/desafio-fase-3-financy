import { useQuery } from '@apollo/client/react';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';
import { CardCategory } from './card-category';
import { CardCategorySkeleton } from './card-category-skeleton';
import { EmptyCategories } from './empty-categories';

type Category = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  transactionCount: number;
  totalAmount: number;
};

export function ListCategories() {
  const { data, loading } = useQuery<{
    listCategories: {
      categories: Category[];
    };
  }>(LIST_ALL_CATEGORIES);

  if (loading) {
    return (
      <div className="flex items-center gap-4 flex-wrap">
        {[1, 2, 3, 4].map((i) => (
          <CardCategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  const categories = data?.listCategories.categories || [];

  if (categories.length === 0) {
    return <EmptyCategories />;
  }

  return (
    <ul className="flex items-center gap-4 flex-wrap w-full">
      {categories.map((category) => (
        <li key={category.id}>
          <CardCategory
            id={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            color={category.color}
            transactionCount={category.transactionCount}
            totalAmount={category.totalAmount}
          />
        </li>
      ))}
    </ul>
  );
}
