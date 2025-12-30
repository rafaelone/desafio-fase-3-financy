import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { SignUpForm } from '@/components/forms/sign-up-form';
import { Link } from '@/components/ui/link';
import { LogIn } from 'lucide-react';

export function SignUp() {
  return (
    <div className="max-w-[448px] mx-auto px-4 mt-12">
      <img
        src={FinancyLogo}
        alt="Financy"
        className="w-[134px] h-8 mx-auto mb-8"
      />
      <div className="p-8 bg-white border border-gray-200 rounded-[12px]">
        <SignUpForm />

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
          <Link to="/">
            <LogIn className="size-[18px] text-gray-700 group-hover:text-gray-400 " />
            Fazer login
          </Link>
        </div>
      </div>
    </div>
  );
}
