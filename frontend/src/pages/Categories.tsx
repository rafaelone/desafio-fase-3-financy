import { CategoriesHeader } from '@/components/categories/categories-header';
import { TotalCategories } from '@/components/categories/total-categories';
import { TotalTransactions } from '@/components/categories/total-transactions';
import { MostUsedCategory } from '@/components/categories/most-used-category';
import { ListCategories } from '@/components/categories/list-categories';

export function Categories() {
  return (
    <div className="px-12">
      <div className="max-w-[1184px] w-auto mx-auto mt-12">
        <CategoriesHeader />
        <div className="my-8 flex items-center gap-6">
          <TotalCategories />
          <TotalTransactions />
          <MostUsedCategory />
        </div>
        <ListCategories />
      </div>
    </div>
  );
}
