import React from 'react';
import { BaseComponentProps, Size } from '../../types';
import { cn } from '../../utils/classNames';

export interface CheckboxProps extends Omit<BaseComponentProps, 'children'> {
  size?: Size;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name?: string;
  required?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  size = 'medium',
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  value,
  name,
  required = false,
  autoFocus = false,
  disabled = false,
  className,
  children,
  id,
  style,
  ..._rest
}) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked, event);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-4 w-4';
      case 'large':
        return 'h-6 w-6';
      default:
        return 'h-5 w-5';
    }
  };

  const checkboxClasses = cn(
    'relative inline-flex items-center justify-center flex-shrink-0 rounded border-2 border-gray-300 bg-white transition-colors duration-200 ease-in-out',
    'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
    'hover:border-gray-400',
    getSizeClasses(),
    isChecked && 'bg-blue-600 border-blue-600',
    indeterminate && 'bg-blue-600 border-blue-600',
    disabled && 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200'
  );

  const wrapperClasses = cn(
    'inline-flex items-center cursor-pointer',
    disabled && 'cursor-not-allowed',
    className
  );

  const checkmarkIcon = () => {
    if (indeterminate) {
      return (
        <svg
          className="h-3 w-3 text-white pointer-events-none"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 8h8v1H4z" />
        </svg>
      );
    }
    
    return (
      <svg
        className="h-3 w-3 text-white pointer-events-none"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M13.5 3.5L6 11 2.5 7.5l1-1L6 9l6.5-6.5 1 1z" />
      </svg>
    );
  };

  return (
    <label
      htmlFor={id}
      className={wrapperClasses}
      style={style}
    >
      <span className={checkboxClasses}>
        <input
          ref={inputRef}
          type="checkbox"
          className="absolute inset-0 opacity-0 cursor-pointer focus:outline-none"
          {...(isControlled ? { checked: isChecked } : { defaultChecked })}
          onChange={handleChange}
          value={value}
          name={name}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          id={id}
          aria-checked={indeterminate ? 'mixed' : isChecked}
          {..._rest}
        />
        <span className="flex items-center justify-center h-full w-full">
          {(isChecked || indeterminate) && checkmarkIcon()}
        </span>
      </span>
      {children && (
        <span className="ml-2 text-sm text-gray-900 select-none">
          {children}
        </span>
      )}
    </label>
  );
};