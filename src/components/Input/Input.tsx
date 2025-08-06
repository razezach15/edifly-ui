import React from 'react';
import { BaseComponentProps, Size } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Input.css';

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  size = 'medium',
  disabled = false,
  error = false,
  className,
  prefix,
  suffix,
  errorMessage,
  ...rest
}) => {
  const wrapperClasses = getComponentClasses(
    'edifly-input-wrapper',
    undefined,
    size,
    disabled,
    error ? 'edifly-input-wrapper--error' : undefined
  );

  const inputClasses = getComponentClasses('edifly-input', undefined, size, disabled);

  return (
    <div className={wrapperClasses}>
      <div className="edifly-input-container">
        {prefix && <span className="edifly-input__prefix">{prefix}</span>}
        <input
          type={type}
          className={inputClasses}
          disabled={disabled}
          {...rest}
        />
        {suffix && <span className="edifly-input__suffix">{suffix}</span>}
      </div>
      {error && errorMessage && (
        <span className="edifly-input__error-message">{errorMessage}</span>
      )}
    </div>
  );
};