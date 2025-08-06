import React, { useEffect, useRef } from 'react';
import { BaseComponentProps, Variant } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import { Button } from '../Button';
import './AlertDialog.css';

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

  const dialogClasses = getComponentClasses(
    'edifly-alert-dialog',
    variant,
    undefined,
    undefined,
    className
  );

  const modalClasses = [
    'edifly-alert-dialog__modal',
    centered && 'edifly-alert-dialog__modal--centered'
  ].filter(Boolean).join(' ');

  const getIcon = () => {
    const iconMap = {
      primary: '💬',
      secondary: 'ℹ️',
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      danger: '❌',
    };
    return iconMap[variant];
  };

  return (
    <div
      className="edifly-alert-dialog__overlay"
      onClick={handleMaskClick}
      onKeyDown={handleKeyDown}
    >
      <div className={modalClasses}>
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
              className="edifly-alert-dialog__close"
              onClick={onClose}
              aria-label="Close dialog"
            >
              ×
            </button>
          )}

          <div className="edifly-alert-dialog__header">
            <div className="edifly-alert-dialog__icon">
              {getIcon()}
            </div>
            <div className="edifly-alert-dialog__content">
              {title && (
                <h3 id="alert-dialog-title" className="edifly-alert-dialog__title">
                  {title}
                </h3>
              )}
              {description && (
                <p id="alert-dialog-description" className="edifly-alert-dialog__description">
                  {description}
                </p>
              )}
              {children && (
                <div className="edifly-alert-dialog__body">
                  {children}
                </div>
              )}
            </div>
          </div>

          <div className="edifly-alert-dialog__footer">
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
    </div>
  );
};