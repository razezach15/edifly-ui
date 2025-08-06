import clsx from 'clsx';

export const cn = (...args: Parameters<typeof clsx>) => clsx(args);

export const getComponentClasses = (
  base: string,
  variant?: string,
  size?: string,
  disabled?: boolean,
  className?: string
) => {
  return cn(
    base,
    variant && `${base}--${variant}`,
    size && `${base}--${size}`,
    disabled && `${base}--disabled`,
    className
  );
};