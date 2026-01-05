import type { ComponentProps } from 'react';

type BadgeProps = ComponentProps<'span'> & {
  title: string;
  color: string;
};

const colorMap: Record<string, { light: string; dark: string }> = {
  blue: { light: 'bg-blue-light', dark: 'text-blue-dark' },
  purple: { light: 'bg-purple-light', dark: 'text-purple-dark' },
  pink: { light: 'bg-pink-light', dark: 'text-pink-dark' },
  red: { light: 'bg-red-light', dark: 'text-red-dark' },
  orange: { light: 'bg-orange-light', dark: 'text-orange-dark' },
  yellow: { light: 'bg-yellow-light', dark: 'text-yellow-dark' },
  green: { light: 'bg-green-light', dark: 'text-green-dark' },
  brand: { light: 'bg-green-light', dark: 'text-brand-dark' },
};

export function Badge({ title, color }: BadgeProps) {
  const colors = colorMap[color] || colorMap['blue'];

  return (
    <span
      className={`px-6 py-1 rounded-full ${colors.light} ${colors.dark} font-medium text-sm leading-5 whitespace-nowrap`}
    >
      {title}
    </span>
  );
}
