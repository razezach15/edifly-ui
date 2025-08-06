import React from 'react';
import { BaseComponentProps, Variant, Size } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Button.css';

export interface ButtonProps extends BaseComponentProps {
  variant?: Variant;
  size?: Size;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  className,
  onClick,
  ...rest
}) => {
  const buttonClasses = getComponentClasses(
    'edifly-btn',
    variant,
    size,
    disabled || loading,
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? <span className="edifly-btn__spinner" /> : null}
      <span className="edifly-btn__content">{children}</span>
    </button>
  );
};