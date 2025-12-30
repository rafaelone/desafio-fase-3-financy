import type { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type LinkProps = ComponentProps<typeof RouterLink>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <RouterLink
      className={twMerge(
        'text-gray-700 font-medium text-base leading-6 flex gap-2 items-center justify-center px-4 py-3 h-12 rounded-lg bg-white border border-gray-300 hover:text-gray-400 transition-colors group',
        className,
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}
