import clsx from 'clsx';
import { Size, Variant } from '../types';

export const cn = (...args: Parameters<typeof clsx>) => clsx(args);

// Size mapping for components
export const sizeClasses: Record<Size, string> = {
  small: 'h-8 px-2 text-xs',
  medium: 'h-10 px-3 text-sm', 
  large: 'h-12 px-4 text-base'
};

// Variant mapping for components
export const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
};

export const getComponentClasses = (
  base: string,
  variant?: Variant,
  size?: Size,
  disabled?: boolean,
  className?: string
) => {
  return cn(
    base,
    variant && variant in variantClasses ? variantClasses[variant] : '',
    size && size in sizeClasses ? sizeClasses[size] : '',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );
};