import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import type { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={twMerge('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

type RadioGroupItemProps = ComponentProps<typeof RadioGroupPrimitive.Item> & {
  icon?: ReactNode;
  label?: string;
  fullWidth?: boolean;
};

export function RadioGroupItem({
  className,
  icon,
  label,
  children,
  fullWidth,
  ...props
}: RadioGroupItemProps) {
  return (
    <div className={twMerge('flex items-center gap-2', fullWidth && 'w-full')}>
      <RadioGroupPrimitive.Item
        className={twMerge(
          'group size-10 rounded-lg border border-gray-300 bg-white flex items-center justify-center hover:border-brand-base transition-colors',
          'data-[state=checked]:border-brand-base data-[state=checked]:bg-gray-100',
          'focus:ring-0',
          className,
        )}
        {...props}
      >
        {icon || children}
        <RadioGroupPrimitive.Indicator />
      </RadioGroupPrimitive.Item>
      {label && (
        <label className="font-normal text-sm leading-5 text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
}

// Exporta os componentes primitivos para casos mais customizados
export const RadioGroupRoot = RadioGroupPrimitive.Root;
export const RadioGroupItemPrimitive = RadioGroupPrimitive.Item;
export const RadioGroupIndicator = RadioGroupPrimitive.Indicator;
