import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: 'font-medium transition-colors disabled:opacity-80 flex justify-center items-center ',
  variants: {
    background: {
      primary:
        'bg-brand-base text-white hover:bg-brand-dark disabled:hover:bg-brand-base',
      secondary: 'bg-white text-gray-700',
    },
    size: {
      sm: 'px-3 py-2 h-9 text-sm',
      lg: 'w-full h-12 text-base',
    },
    fontSize: {
      sm: 'text-sm leading-5 rounded-lg',
      base: 'text-base leading-6 rounded-xl',
    },
  },
  defaultVariants: {
    background: 'primary',
    size: 'lg',
    fontSize: 'base',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>;

export function Button({
  background,
  size,
  fontSize,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ background, size, fontSize, className })}
      {...props}
    />
  );
}
