import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/utils/getInitials';

export function Header() {
  return (
    <header className="px-12 py-4 bg-white h-[68px] w-full">
      <div className="flex items-center justify-between max-w-[1184px] w-full mx-auto">
        <img src={FinancyLogo} alt="Financy" className="w-[100px] h-6" />
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Link
                to="/dashboard"
                className="font-semibold text-sm leading-5 text-brand-base hover:text-brand-dark transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                className="font-normal text-sm leading-5 text-gray-600 hover:text-gray-400 transition-colors"
              >
                Transações
              </Link>
            </li>
            <li>
              <Link
                to="/categories"
                className="font-normal text-sm leading-5 text-gray-600 hover:text-gray-400 transition-colors "
              >
                Categorias
              </Link>
            </li>
          </ul>
        </nav>
        <Avatar>
          <AvatarFallback className="bg-gray-300 text-gray-800 font-medium text-sm leading-5">
            {getInitials('Rafael Sergio')}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
