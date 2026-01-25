import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/utils/getInitials';
import { HeaderLink } from './header-link';

export function Header() {
  return (
    <header className="px-12 py-4 bg-white h-[68px] w-full">
      <div className="flex items-center justify-between max-w-[1184px] w-full mx-auto">
        <img src={FinancyLogo} alt="Financy" className="w-[100px] h-6" />
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <HeaderLink to="/dashboard">Dashboard</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/transactions">Transações</HeaderLink>
            </li>
            <li>
              <HeaderLink to="/categories">Categorias</HeaderLink>
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
