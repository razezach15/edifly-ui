import React, { useEffect, useRef } from 'react';
import { BaseComponentProps, Variant } from '../../types';
import { cn } from '../../utils/classNames';
import { Button } from '../Button';

export interface AlertDialogProps extends BaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: Variant | 'info';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  width?: number | string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  variant = 'primary',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  confirmLoading = false,
  closable = true,
  maskClosable = true,
  centered = true,
  width = 416,
  className,
  children,
  ...rest
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      // Focus the dialog
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.focus();
        }
      }, 0);
    } else {
      document.body.style.overflow = '';
      
      // Return focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && maskClosable) {
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (!confirmLoading) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closable) {
      onClose();
    }
  };

  if (!open) return null;

  const overlayClasses = cn(
    'fixed inset-0 z-50 bg-black bg-opacity-50',
    'flex justify-center p-4',
    centered ? 'items-center' : 'items-start pt-20',
    'backdrop-blur-sm transition-opacity duration-200'
  );

  const dialogClasses = cn(
    'bg-white rounded-lg shadow-xl max-w-md w-full',
    'transform transition-all duration-200',
    'max-h-screen overflow-y-auto',
    className
  );

  const getIcon = () => {
    const iconClasses = 'w-6 h-6 flex-shrink-0';
    const iconMap = {
      primary: (
        <div className={cn(iconClasses, 'text-blue-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      secondary: (
        <div className={cn(iconClasses, 'text-gray-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      info: (
        <div className={cn(iconClasses, 'text-blue-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      success: (
        <div className={cn(iconClasses, 'text-green-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      warning: (
        <div className={cn(iconClasses, 'text-yellow-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      ),
      danger: (
        <div className={cn(iconClasses, 'text-red-500')}>
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
      ),
    };
    return iconMap[variant];
  };

  return (
    <div
      className={overlayClasses}
      onClick={handleMaskClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className={dialogClasses}
        style={{ width }}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={title ? 'alert-dialog-title' : undefined}
        aria-describedby={description ? 'alert-dialog-description' : undefined}
        tabIndex={-1}
        {...rest}
      >
        {closable && (
          <button
            className={cn(
              'absolute top-4 right-4 p-1 rounded-full',
              'text-gray-400 hover:text-gray-600 hover:bg-gray-100',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'transition-colors duration-200'
            )}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}

        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
              {title && (
                <h3 id="alert-dialog-title" className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
              )}
              {description && (
                <p id="alert-dialog-description" className="text-sm text-gray-600 mb-4">
                  {description}
                </p>
              )}
              {children && (
                <div className="mt-4">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-200">
          {onCancel && (
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={confirmLoading}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={variant === 'info' ? 'primary' : variant}
            onClick={handleConfirm}
            loading={confirmLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};