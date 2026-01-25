import { Dialog } from './index';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/delete-transaction';
import { GET_BALANCE } from '@/lib/graphql/queries/balance';
import { GET_RECENT_TRANSACTIONS } from '@/lib/graphql/queries/recent-transactions';
import { GET_DASHBOARD_CATEGORIES } from '@/lib/graphql/queries/dashboard-categories';
import { toast } from 'sonner';

type DialogDeleteTransactionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string | null;
  transactionDescription?: string;
  onSuccess?: () => void;
};

export function DialogDeleteTransaction({
  open,
  onOpenChange,
  transactionId,
  transactionDescription,
  onSuccess,
}: DialogDeleteTransactionProps) {
  const [deleteTransaction, { loading: isDeleting }] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: [
        { query: GET_BALANCE },
        { query: GET_RECENT_TRANSACTIONS },
        { query: GET_DASHBOARD_CATEGORIES, variables: { limit: 12 } },
      ],
      onCompleted: () => {
        toast.success('Transação deletada com sucesso!');
        onOpenChange(false);
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message || 'Erro ao deletar transação');
      },
    },
  );

  function handleConfirmDelete() {
    if (transactionId) {
      deleteTransaction({
        variables: { id: transactionId },
      });
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Excluir Transação"
      description="Esta ação não pode ser desfeita"
    >
      <div className="mt-6 flex flex-col gap-6 w-[398px]">
        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
          <AlertTriangle className="size-5 text-danger shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm text-danger">Atenção!</span>
            <span className="font-normal text-sm text-danger">
              Você está prestes a excluir a transação{' '}
              {transactionDescription && (
                <strong>"{transactionDescription}"</strong>
              )}
              .
            </span>
            <span className="font-normal text-sm text-danger">
              Esta ação é permanente e não poderá ser revertida.
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            background="secondary"
            fontSize="base"
            className="flex-1"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            background="danger"
            fontSize="base"
            className="flex-1"
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Excluindo...' : 'Excluir'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
