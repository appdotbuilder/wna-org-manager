import * as React from 'react';
import { cn } from '@/lib/utils';

const getBadgeClasses = (variant?: string) => {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors';
  
  const variantClasses = {
    default: 'border-transparent bg-slate-900 text-white',
    secondary: 'border-transparent bg-gray-100 text-gray-900',
    destructive: 'border-transparent bg-red-500 text-white',
    outline: 'border-gray-300 text-gray-700',
  };
  
  return [
    baseClasses,
    variantClasses[variant as keyof typeof variantClasses] || variantClasses.default
  ].join(' ');
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(getBadgeClasses(variant), className)} {...props} />
  );
}

export { Badge };