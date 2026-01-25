import { useQuery, useMutation } from '@apollo/client/react';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';
import { UPDATE_CATEGORY } from '@/lib/graphql/mutations/update-category';
import { CardCategory } from './card-category';
import { CardCategorySkeleton } from './card-category-skeleton';
import { Dialog } from '../dialog';
import { DialogFormCategory } from '../dialog/dialog-form-category';
import { useState } from 'react';
import { toast } from 'sonner';
import { GET_TOTAL_CATEGORIES } from '@/lib/graphql/queries/total-categories';
import { GET_TOTAL_TRANSACTIONS } from '@/lib/graphql/queries/total-transactions';
import { GET_MOST_USED_CATEGORY } from '@/lib/graphql/queries/most-used-category';
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
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { data, loading } = useQuery<{
    listCategories: {
      categories: Category[];
    };
  }>(LIST_ALL_CATEGORIES);

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [
      { query: LIST_ALL_CATEGORIES },
      { query: GET_TOTAL_CATEGORIES },
      { query: GET_TOTAL_TRANSACTIONS },
      { query: GET_MOST_USED_CATEGORY },
    ],
    onCompleted: () => {
      toast.success('Categoria atualizada com sucesso!');
      setEditingCategory(null);
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar categoria');
    },
  });

  function handleUpdate(data: {
    title: string;
    description?: string;
    icon: string;
    color: string;
  }) {
    if (!editingCategory) return;

    updateCategory({
      variables: {
        id: editingCategory.id,
        data: {
          title: data.title,
          description: data.description,
          icon: data.icon,
          color: data.color,
        },
      },
    });
  }

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
    <>
      <ul className="flex items-center gap-4 flex-wrap w-full">
        {categories.map((category) => (
          <li key={category.id} className="max-md:w-full">
            <CardCategory
              id={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              color={category.color}
              transactionCount={category.transactionCount}
              totalAmount={category.totalAmount}
              onEdit={() => setEditingCategory(category)}
            />
          </li>
        ))}
      </ul>

      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        title="Editar Categoria"
      >
        {editingCategory && (
          <DialogFormCategory
            onSubmit={handleUpdate}
            initialData={{
              title: editingCategory.title,
              description: editingCategory.description,
              icon: editingCategory.icon,
              color: editingCategory.color,
            }}
          />
        )}
      </Dialog>
    </>
  );
}
