import { Input } from '@/components/ui/input';
import {
  Eye,
  EyeClosed,
  LoaderCircle,
  Lock,
  Mail,
  UserRound,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';

const signUpSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Nome completo é obrigatório')
    .refine((name) => name.trim().split(' ').length >= 2, {
      message: 'Digite seu nome completo',
    }),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const signup = useAuthStore((state) => state.signup);

  async function onSubmit({
    fullName,
    email,
    password,
  }: SignUpFormData): Promise<void> {
    try {
      const signupMutate = await signup({
        fullName,
        email,
        password,
      });

      if (signupMutate) {
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch {
      toast.error('Erro ao realizar o cadastro');
    }
  }

  function togglePasswordVisibility(): void {
    setShowPassword(!showPassword);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-gray-800 font-bold text-[20px] leading-7 text-center mb-1">
        Criar conta
      </h1>
      <p className="text-base font-normal text-gray-600 leading-6 text-center mb-8">
        Comece a controlar suas finanças ainda hoje
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <Input
            htmlFor="fullName"
            labelText="Nome completo"
            iconLeft={<UserRound className="text-gray-400 size-4" />}
            placeholder="Seu nome completo"
            type="text"
            errorMessage={errors.fullName && errors.fullName.message}
            {...register('fullName')}
          />
        </div>

        <div>
          <Input
            htmlFor="email"
            labelText="E-mail"
            iconLeft={<Mail className="text-gray-400 size-4" />}
            placeholder="mail@exemplo.com"
            type="text"
            errorMessage={errors.email && errors.email.message}
            {...register('email')}
          />
        </div>

        <div>
          <Input
            htmlFor="password"
            labelText="Senha"
            iconLeft={<Lock className="text-gray-400 size-4" />}
            iconRight={
              showPassword ? (
                <Eye className="text-gray-700 size-4" />
              ) : (
                <EyeClosed className="text-gray-700 size-4" />
              )
            }
            onIconRightClick={togglePasswordVisibility}
            placeholder="Digite sua senha"
            type={showPassword ? 'text' : 'password'}
            errorMessage={errors.password && errors.password.message}
            {...register('password')}
          />
        </div>
      </div>
      <Button
        disabled={isSubmitting}
        background="primary"
        size="lg"
        fontSize="base"
        className="mt-6"
      >
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Cadastrar'}
      </Button>
    </form>
  );
}
