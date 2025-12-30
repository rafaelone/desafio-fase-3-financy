import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = ComponentProps<'input'> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onIconRightClick?: () => void;
  labelText: string;
  htmlFor: string;
  errorMessage?: string;
};

export function Input({
  iconLeft,
  iconRight,
  onIconRightClick,
  labelText,
  htmlFor,
  className,
  errorMessage,
  ...rest
}: InputProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={htmlFor}
          className="text-grau-700 font-medium text-sm leading-5"
        >
          {labelText}
        </label>
        <div className="bg-white w-full border border-gray-300 rounded-lg px-3 flex items-center gap-3 h-12 focus-within:border-brand-base transition-colors">
          {iconLeft && iconLeft}
          <input
            className={twMerge(
              'font-normal text-base leading-7 text-gray-400 flex-1 outline-none',
              className,
            )}
            {...rest}
          />
          {iconRight && (
            <button
              type="button"
              onClick={onIconRightClick}
              className="cursor-pointer"
            >
              {iconRight}
            </button>
          )}
        </div>
      </div>
      {errorMessage && (
        <span className="text-danger font-normal text-xs leading-4 mt-2 block">
          {errorMessage}
        </span>
      )}
    </>
  );
}
