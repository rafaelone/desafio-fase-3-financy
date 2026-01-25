import { Input } from '@/components/ui/input';
import { LoaderCircle, LogOut, Mail, UserRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useMutation } from '@apollo/client/react';
import { UPDATE_USER } from '@/lib/graphql/mutations/update-profile';
import { GET_ME } from '@/lib/graphql/queries/me';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useNavigate } from 'react-router-dom';

const profileSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .refine((name) => name.trim().split(' ').length >= 2, {
      message: 'Digite seu nome completo',
    }),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type ProfileFormProps = {
  initialData?: {
    fullName: string;
    email: string;
  };
};

export function ProfileForm({ initialData }: ProfileFormProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
    onCompleted: () => {
      toast.success('Dados atualizados com sucesso!');
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar dados');
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('fullName', initialData.fullName);
      setValue('email', initialData.email);
    }
  }, [initialData, setValue]);

  async function onSubmit({ fullName }: ProfileFormData): Promise<void> {
    await updateUser({
      variables: { fullName },
    });
  }

  function handleLogout() {
    logout();
    toast.success('Logout realizado com sucesso!');
    navigate('/sign-in');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Input
          htmlFor="fullName"
          labelText="Nome completo"
          iconLeft={<UserRound className="text-black size-4" />}
          placeholder="Seu nome completo"
          type="text"
          errorMessage={errors.fullName && errors.fullName.message}
          {...register('fullName')}
        />

        <div className="flex flex-col gap-2">
          <Input
            htmlFor="email"
            labelText="E-mail"
            iconLeft={<Mail className="text-gray-500 size-4" />}
            placeholder="mail@exemplo.com"
            type="text"
            disabled
            errorMessage={errors.email && errors.email.message}
            className="disabled:text-gray-500"
            {...register('email')}
          />
          <span className="text-sm font-normal leading-4 text-gray-500">
            O e-mail não pode ser alterado
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          disabled={isSubmitting}
          background="primary"
          size="lg"
          fontSize="base"
        >
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            'Salvar Alterações'
          )}
        </Button>
        <Button
          type="button"
          disabled={isSubmitting}
          background="secondary"
          size="lg"
          fontSize="base"
          className="flex items-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="size-[18px] text-danger" />
          Sair da conta
        </Button>
      </div>
    </form>
  );
}
