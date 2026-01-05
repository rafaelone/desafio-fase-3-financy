import { Tag } from 'lucide-react';

export function EmptyCategories() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Tag className="size-8 text-gray-700" />
      </div>
      <h3 className="text-gray-800 font-semibold text-lg mb-2">
        Nenhuma categoria cadastrada.
      </h3>
      <p className="text-gray-600 text-sm text-center max-w-md">
        Comece criando sua primeira categoria para organizar suas transações
        financeiras.
      </p>
    </div>
  );
}
