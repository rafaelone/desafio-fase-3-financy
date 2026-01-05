import { forwardRef, type ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectProps = ComponentProps<'select'> & {
  htmlFor: string;
  labelText: string;
  errorMessage?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ htmlFor, labelText, errorMessage, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full min-w-0">
        <label
          htmlFor={htmlFor}
          className="font-medium text-sm leading-5 text-gray-700"
        >
          {labelText}
        </label>
        <div className="relative">
          <select
            id={htmlFor}
            ref={ref}
            className="w-full h-12 px-3 rounded-lg border border-gray-300 text-gray-400 text-base font-normal leading-7 focus:outline-none  focus:ring-0 focus:border-gray-800 bg-white appearance-none pr-10"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
            }}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
        </div>
        {errorMessage && (
          <span className="text-danger font-normal text-xs leading-4 block">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
