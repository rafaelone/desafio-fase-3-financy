import FinancyLogo from '@/assets/icons/financy-logo.svg';
import {
  EyeClosed,
  Lock,
  LogIn,
  Mail,
  UserRound,
  UserRoundPlus,
} from 'lucide-react';

export function SignUp() {
  return (
    <div className="max-w-[448px] mx-auto px-4 mt-12">
      <img
        src={FinancyLogo}
        alt="Financy"
        className="w-[134px] h-8 mx-auto mb-8"
      />
      <div className="p-8 bg-white border border-gray-200 rounded-[12px]">
        <form>
          <h1 className="text-gray-800 font-bold text-[20px] leading-7 text-center mb-1">
            Criar conta
          </h1>
          <p className="text-base font-normal text-gray-600 leading-6 text-center mb-8">
            Comece a controlar suas finanças ainda hoje
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullName"
                className="text-grau-700 font-medium text-sm leading-5"
              >
                Nome completo
              </label>
              <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12">
                <UserRound className="text-gray-400 size-4" />
                <input
                  placeholder="Seu nome completo"
                  type="text"
                  className="font-normal text-base leading-7 text-gray-400 flex-1"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-grau-700 font-medium text-sm leading-5"
              >
                E-mail
              </label>
              <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12">
                <Mail className="text-gray-400 size-4" />
                <input
                  placeholder="mail@exemplo.com"
                  type="text"
                  className="font-normal text-base leading-7 text-gray-400 flex-1"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-grau-700 font-medium text-sm leading-5"
              >
                Senha
              </label>
              <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12">
                <Lock className="text-gray-400 size-4" />
                <input
                  className="font-normal text-base leading-7 text-gray-400 flex-1"
                  placeholder="Digite sua senha"
                  type="password"
                />
                <EyeClosed className="text-gray-700 size-4" />
              </div>
              <span className="font-normal text-xs text-gray-500 leading-4">
                A senha deve ter no mínimo 8 caracteres
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 bg-brand-base px-4 py-3 h-12 text-white font-medium text-base leading-6 w-full rounded-lg hover:bg-brand-dark transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <div className="flex gap-3 mt-6 items-center ">
          <span className="flex-1 text-gray-300 h-px bg-gray-300" />
          <span className="text-normal text-sm leading-5 text-gray-500">
            ou
          </span>
          <span className="flex-1 text-gray-300 h-px bg-gray-300" />
        </div>

        <div className="flex flex-col">
          <span className="mt-6 mb-4 text-center font-normal text-sm leading-5 text-gray-600">
            Já tem uma conta?
          </span>
          <a
            href="/"
            type="button"
            className="text-gray-700 font-medium text-base leading-6 flex gap-2 items-center justify-center px-4 py-3 h-12 rounded-lg bg-white border border-gray-300 hover:text-gray-400 transition-colors group"
          >
            <LogIn className="size-[18px] text-gray-700 group-hover:text-gray-400 " />
            Fazer login
          </a>
        </div>
      </div>
    </div>
  );
}
