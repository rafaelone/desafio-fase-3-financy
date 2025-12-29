import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { EyeClosed, Lock, Mail, UserRoundPlus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

export function SignIn() {
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
            Fazer login
          </h1>
          <p className="text-base font-normal text-gray-600 leading-6 text-center mb-8">
            Entre na sua conta para continuar
          </p>
          <div className="flex flex-col gap-4">
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
            </div>
          </div>
          <div className="mt-[18px] flex justify-between">
            <label className="gap-2 flex items-center cursor-pointer">
              <Checkbox defaultChecked id="remember-me" />
              <span className=" font-normal text-sm leading-5 text-gray-700">
                Lembrar me
              </span>
            </label>
            <Link
              to="#"
              className="font-medium text-sm leading-5 text-brand-base"
            >
              Recuperar senha
            </Link>
          </div>
          <button
            type="submit"
            className="mt-6 bg-brand-base px-4 py-3 h-12 text-white font-medium text-base leading-6 w-full rounded-lg hover:bg-brand-dark transition-colors"
          >
            Entrar
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
            Ainda não tem uma conta?
          </span>
          <Link
            to="/"
            className="text-gray-700 font-medium text-base leading-6 flex gap-2 items-center justify-center px-4 py-3 h-12 rounded-lg bg-white border border-gray-300 hover:text-gray-400 transition-colors group"
          >
            <UserRoundPlus className="size-[18px] text-gray-700 group-hover:text-gray-400 " />
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
