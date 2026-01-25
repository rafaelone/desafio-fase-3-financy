import { MonthPicker } from '@/components/MonthPicker';
import { ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';

export function TransactionsFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('description') || '',
  );

  const type = searchParams.get('type') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const month = searchParams.get('month') || '';
  const year = searchParams.get('year') || '';

  const { data: categoriesData } = useQuery<{
    listCategories: {
      categories: Array<{ id: string; title: string }>;
    };
  }>(LIST_ALL_CATEGORIES);

  const categories = categoriesData?.listCategories.categories || [];

  function handleSearchChange(value: string) {
    setSearchInput(value);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('description', searchInput);
    } else {
      newParams.delete('description');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  }

  function handleFilterChange(key: string, value: string) {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  }

  function handleMonthChange(date: Date) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('month', String(date.getMonth() + 1));
    newParams.set('year', String(date.getFullYear()));
    newParams.set('page', '1');
    setSearchParams(newParams);
  }

  const selectedDate =
    month && year ? new Date(Number(year), Number(month) - 1, 1) : undefined;

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="w-full p-6 flex items-end gap-4 bg-white mt-8 border border-gray-200 rounded-xl"
    >
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="search"
            className="text-gray-700 font-medium text-sm leading-5"
          >
            Buscar
          </label>
          <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12">
            <Search className="text-gray-400 size-4" />
            <input
              id="search"
              placeholder="Buscar por descrição"
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="font-normal text-base leading-7 text-gray-800 flex-1 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-sm leading-5">
            Tipo
          </label>
          <div className="relative">
            <select
              value={type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="appearance-none w-full rounded-lg px-4 pr-10 h-12 bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 outline-none cursor-pointer font-normal text-base"
            >
              <option value="">Todos</option>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-sm leading-5">
            Categorias
          </label>
          <div className="relative">
            <select
              value={categoryId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
              className="appearance-none w-full rounded-lg px-4 pr-10 h-12 bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 outline-none cursor-pointer font-normal text-base"
            >
              <option value="">Todas</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium text-sm leading-5">
            Período
          </label>
          <MonthPicker value={selectedDate} onChange={handleMonthChange} />
        </div>
      </div>
    </form>
  );
}
