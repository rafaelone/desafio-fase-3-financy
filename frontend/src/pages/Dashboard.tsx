import { DashboardBalanceContainer } from '@/components/dashboard/dashboard-balance-container';
import { DashboardCategories } from '@/components/dashboard/dashboard-categories';
import { DashboardRecentTransactions } from '@/components/dashboard/dashboard-recent-transactions';
import { ChevronRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog } from '@/components/dialog';
import { DialogFormTransaction } from '@/components/dialog/dialog-form-transaction';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { LIST_ALL_CATEGORIES } from '@/lib/graphql/queries/list-all-categories';
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/create-transaction';
import { GET_BALANCE } from '@/lib/graphql/queries/balance';
import { GET_RECENT_TRANSACTIONS } from '@/lib/graphql/queries/recent-transactions';
import { toast } from 'sonner';

export function DashBoard() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const { data: categoriesData } = useQuery<{
    listCategories: {
      categories: Array<{ id: string; title: string }>;
    };
  }>(LIST_ALL_CATEGORIES);

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [
      { query: GET_BALANCE },
      { query: GET_RECENT_TRANSACTIONS },
    ],
    onCompleted: () => {
      toast.success('Transação criada com sucesso!');
      setIsTransactionModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao criar transação');
    },
  });

  const categories = categoriesData?.listCategories.categories || [];

  function handleCreateTransaction(data: {
    description?: string;
    type: 'income' | 'expense';
    date: string;
    amount: number;
    categoryId: string;
  }) {
    if (!data.description) {
      toast.error('Descrição é obrigatória');
      return;
    }

    createTransaction({
      variables: {
        data: {
          type: data.type,
          description: data.description,
          date: new Date(data.date),
          amount: data.amount,
          categoryId: data.categoryId,
        },
      },
    });
  }
  return (
    <main className="max-w-[1184px] w-auto mx-auto mt-12">
      {/* cards */}
      <DashboardBalanceContainer />
      <div className="flex gap-6 mt-6 items-start max-lg:flex-col">
        {/* tabela de transacoes */}
        <div className="max-lg:max-w-full w-full max-w-[781px] bg-white rounded-xl border border-gray-200">
          {/* header */}
          <div className="flex items-center justify-between h-[61px] border-b border-b-gray-200 px-6">
            <span className="font-medium text-xs leading-4  text-gray-500 uppercase">
              Transações recentes
            </span>
            <Link
              to="/"
              className="text-brand-base items-center flex gap-1 font-medium text-sm leading-5 group hover:text-brand-dark"
            >
              Ver todas
              <ChevronRight className="size-5" />
            </Link>
          </div>

          <DashboardRecentTransactions />

          <div className="h-[60px] flex items-center justify-center">
            <button
              onClick={() => setIsTransactionModalOpen(true)}
              className="font-medium text-sm leading-5 text-brand-base flex items-center justify-center gap-1 hover:text-brand-dark transition-colors"
            >
              <Plus className="size-5 text-brand-base" />
              Nova transação
            </button>
          </div>
        </div>
        {/* tabela de categorias */}
        <DashboardCategories />
      </div>

      <Dialog
        open={isTransactionModalOpen}
        onOpenChange={setIsTransactionModalOpen}
        title="Nova Transação"
        description="Registre sua despesa ou receita"
      >
        <DialogFormTransaction
          onSubmit={handleCreateTransaction}
          categories={categories}
        />
      </Dialog>
    </main>
  );
}
