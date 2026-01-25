import { Link, useLocation } from 'react-router-dom';

type HeaderLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function HeaderLink({ to, children }: HeaderLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`font-semibold text-sm leading-5 transition-colors ${
        isActive ? 'text-brand-base' : 'text-gray-600 hover:text-brand-base'
      }`}
    >
      {children}
    </Link>
  );
}
