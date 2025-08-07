import clsx from 'clsx';

export const cn = (...args: Parameters<typeof clsx>) => clsx(args);

// Size mapping for components
export const sizeClasses = {
  small: 'h-8 px-2 text-xs',
  medium: 'h-10 px-3 text-sm', 
  large: 'h-12 px-4 text-base'
};

// Variant mapping for components
export const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
};

export const getComponentClasses = (
  base: string,
  variant?: string,
  size?: string,
  disabled?: boolean,
  className?: string
) => {
  return cn(
    base,
    variant && variantClasses[variant as keyof typeof variantClasses],
    size && sizeClasses[size as keyof typeof sizeClasses],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );
};