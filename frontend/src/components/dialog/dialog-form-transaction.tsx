import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@apollo/client/react';
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/create-transaction';
import { UPDATE_TRANSACTION } from '@/lib/graphql/mutations/update-transaction';
import { GET_BALANCE } from '@/lib/graphql/queries/balance';
import { GET_RECENT_TRANSACTIONS } from '@/lib/graphql/queries/recent-transactions';
import { GET_DASHBOARD_CATEGORIES } from '@/lib/graphql/queries/dashboard-categories';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { DatePicker } from '../ui/date-picker';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { CircleArrowDown, CircleArrowUp, LoaderCircle } from 'lucide-react';
import { Button } from '../ui/button';

const transactionSchema = z.object({
  description: z.string().min(3, 'Informe uma descrição'),
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, 'Data é obrigatória'),
  amount: z.number().positive('Valor deve ser maior que zero'),
  categoryId: z.string().min(1, 'Selecione uma categoria'),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

type DialogFormTransactionProps = {
  categories: Array<{ id: string; title: string }>;
  initialData?: Partial<TransactionFormData>;
  transactionId?: string;
  onSuccess?: () => void;
  onClose?: () => void;
};

export function DialogFormTransaction({
  categories,
  initialData,
  transactionId,
  onSuccess,
  onClose,
}: DialogFormTransactionProps) {
  const isEditing = !!transactionId;

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [
      { query: GET_BALANCE },
      { query: GET_RECENT_TRANSACTIONS },
      { query: GET_DASHBOARD_CATEGORIES, variables: { limit: 10 } },
    ],
    onCompleted: () => {
      toast.success('Transação criada com sucesso!');
      onClose?.();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao criar transação');
    },
  });

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [
      { query: GET_BALANCE },
      { query: GET_RECENT_TRANSACTIONS },
      { query: GET_DASHBOARD_CATEGORIES, variables: { limit: 10 } },
    ],
    onCompleted: () => {
      toast.success('Transação atualizada com sucesso!');
      onClose?.();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar transação');
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: initialData?.type || 'expense',
      amount: initialData?.amount || 0,
      date: initialData?.date || '',
      description: initialData?.description || '',
      categoryId: initialData?.categoryId || '',
    },
  });

  function onSubmit(data: TransactionFormData) {
    if (isEditing) {
      updateTransaction({
        variables: {
          id: transactionId,
          data: {
            type: data.type,
            description: data.description,
            date: new Date(data.date),
            amount: data.amount,
            categoryId: data.categoryId,
          },
        },
      });
    } else {
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
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-4 w-99.5 "
    >
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="flex-row gap-2 border border-gray-200 rounded-lg p-2"
          >
            <RadioGroupItem
              fullWidth
              value="expense"
              className="w-full h-10 justify-center gap-2 border-0 data-[state=checked]:border data-[state=checked]:border-red-base"
            >
              <CircleArrowDown className="size-4 text-gray-400 group-data-[state=checked]:text-red-base" />
              <span className="text-gray-700 font-medium text-sm">Despesa</span>
            </RadioGroupItem>
            <RadioGroupItem
              fullWidth
              value="income"
              className="w-full h-10 justify-center gap-2 border-0 data-[state=checked]:border data-[state=checked]:border-green-base"
            >
              <CircleArrowUp className="size-4 text-gray-400 group-data-[state=checked]:text-green-base" />
              <span className="text-gray-700 font-medium text-sm">Receita</span>
            </RadioGroupItem>
          </RadioGroup>
        )}
      />

      <div className="flex flex-col gap-2">
        <Input
          {...register('description')}
          htmlFor="description"
          labelText="Descrição"
          placeholder="Descrição da transação"
          errorMessage={errors.description?.message}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 min-w-0">
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                htmlFor="date"
                labelText="Data"
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.date?.message}
              />
            )}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                htmlFor="amount"
                labelText="Valor"
                placeholder="R$ 0,00"
                type="text"
                value={
                  field.value
                    ? new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(field.value)
                    : ''
                }
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const numericValue = Number(value) / 100;
                  field.onChange(numericValue);
                }}
                errorMessage={errors.amount?.message}
              />
            )}
          />
        </div>
      </div>

      <Select
        {...register('categoryId')}
        htmlFor="categoryId"
        labelText="Categoria"
        errorMessage={errors.categoryId?.message}
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Select>

      <Button
        type="submit"
        background="primary"
        fontSize="base"
        className="mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Salvar'}
      </Button>
    </form>
  );
}
