import FinancyLogo from '@/assets/icons/financy-logo.svg';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials } from '@/utils/getInitials';
import { HeaderLink } from './header-link';
import { useQuery } from '@apollo/client/react';
import { GET_ME } from '@/lib/graphql/queries/me';

export function Header() {
  const { data } = useQuery<{
    me: {
      id: string;
      fullName: string;
      email: string;
    };
  }>(GET_ME);

  const user = data?.me;

  return (
    <header className="px-12 py-4 bg-white h-17 w-full">
      <div className="flex items-center justify-between max-w-296 w-full mx-auto">
        <img src={FinancyLogo} alt="Financy" className="w-25 h-6" />
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
        <HeaderLink to="/me">
          <Avatar>
            <AvatarFallback className="bg-gray-300 text-gray-800 font-medium text-sm leading-5">
              {user ? getInitials(user.fullName) : '...'}
            </AvatarFallback>
          </Avatar>
        </HeaderLink>
      </div>
    </header>
  );
}
