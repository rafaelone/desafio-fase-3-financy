import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { SignInForm } from '@/components/forms/sign-in-form';
import { UserRoundPlus } from 'lucide-react';
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
        <SignInForm />

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
            to="/signUp"
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
