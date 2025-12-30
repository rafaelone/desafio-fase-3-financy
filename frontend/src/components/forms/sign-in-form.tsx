import { Input } from '@/components/ui/input';
import { Eye, EyeClosed, LoaderCircle, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const signInSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const login = useAuthStore((state) => state.login);

  async function onSubmit({ email, password }: SignInFormData) {
    try {
      const loginMutate = await login({
        email,
        password,
      });
      if (loginMutate) {
        toast.success('Login realizado com sucesso!');
      }
    } catch {
      toast.error('Falha ao realizar o login!');
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-gray-800 font-bold text-[20px] leading-7 text-center mb-1">
        Fazer login
      </h1>
      <p className="text-base font-normal text-gray-600 leading-6 text-center mb-8">
        Entre na sua conta para continuar
      </p>
      <div className="flex flex-col gap-4">
        <Input
          htmlFor="email"
          labelText="E-mail"
          iconLeft={<Mail className="text-gray-400 size-4" />}
          placeholder="mail@exemplo.com"
          type="text"
          errorMessage={errors.email && errors.email.message}
          {...register('email')}
        />

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

      <div className="mt-[18px] flex justify-between">
        <label className="gap-2 flex items-center cursor-pointer">
          <Checkbox id="remember-me" />
          <span className="font-normal text-sm leading-5 text-gray-700">
            Lembrar me
          </span>
        </label>
        <Link
          to="/forgot-password"
          className="font-medium text-sm leading-5 text-brand-base hover:text-brand-dark transition-colors"
        >
          Recuperar senha
        </Link>
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
