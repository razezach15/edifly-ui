import React from 'react';
import { BaseComponentProps, Size } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Checkbox.css';

export interface CheckboxProps extends Omit<BaseComponentProps, 'children'> {
  size?: Size;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
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
  ...rest
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

  const checkboxClasses = getComponentClasses(
    'edifly-checkbox',
    undefined,
    size,
    disabled,
    className
  );

  const wrapperClasses = [
    'edifly-checkbox-wrapper',
    isChecked && 'edifly-checkbox-wrapper--checked',
    indeterminate && 'edifly-checkbox-wrapper--indeterminate',
    disabled && 'edifly-checkbox-wrapper--disabled'
  ].filter(Boolean).join(' ');

  const checkmarkIcon = () => {
    if (indeterminate) {
      return (
        <svg
          className="edifly-checkbox__icon edifly-checkbox__icon--indeterminate"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M4 8h8v1H4z" />
        </svg>
      );
    }
    
    return (
      <svg
        className="edifly-checkbox__icon edifly-checkbox__icon--check"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M13.5 3.5L6 11 2.5 7.5l1-1L6 9l6.5-6.5 1 1z" />
      </svg>
    );
  };

  return (
    <label
      className={wrapperClasses}
      style={style}
      {...rest}
    >
      <span className={checkboxClasses}>
        <input
          ref={inputRef}
          type="checkbox"
          className="edifly-checkbox__input"
          checked={isChecked}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          onChange={handleChange}
          value={value}
          name={name}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          id={id}
          aria-checked={indeterminate ? 'mixed' : isChecked}
        />
        <span className="edifly-checkbox__inner">
          {(isChecked || indeterminate) && checkmarkIcon()}
        </span>
      </span>
      {children && (
        <span className="edifly-checkbox__label">
          {children}
        </span>
      )}
    </label>
  );
};