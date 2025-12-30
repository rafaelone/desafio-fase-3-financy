import type { ReactNode } from 'react';
import { Header } from '../header';

type PrivateLayout = {
  children: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayout) {
  return (
    <div>
      <Header />
      <div className="px-12">{children}</div>
    </div>
  );
}
