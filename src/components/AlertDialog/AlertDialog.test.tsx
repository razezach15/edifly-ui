import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AlertDialog, AlertDialogProps } from './AlertDialog';

const defaultProps: AlertDialogProps = {
  open: true,
  onClose: jest.fn(),
  title: 'Test Dialog',
  description: 'This is a test dialog',
};

describe('AlertDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders dialog when open is true', () => {
    render(<AlertDialog {...defaultProps} />);
    
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('This is a test dialog')).toBeInTheDocument();
  });

  it('does not render dialog when open is false', () => {
    render(<AlertDialog {...defaultProps} open={false} />);
    
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    
    render(<AlertDialog {...defaultProps} onClose={onClose} />);
    
    const closeButton = screen.getByLabelText('Close dialog');
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn();
    
    render(<AlertDialog {...defaultProps} onClose={onClose} />);
    
    fireEvent.keyDown(screen.getByRole('alertdialog'), {
      key: 'Escape',
      code: 'Escape'
    });
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closable is false', () => {
    const onClose = jest.fn();
    
    render(<AlertDialog {...defaultProps} onClose={onClose} closable={false} />);
    
    fireEvent.keyDown(screen.getByRole('alertdialog'), {
      key: 'Escape',
      code: 'Escape'
    });
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when mask is clicked and maskClosable is true', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    
    render(<AlertDialog {...defaultProps} onClose={onClose} maskClosable={true} />);
    
    // Click on the overlay (mask)
    const overlay = screen.getByRole('alertdialog').parentElement;
    if (overlay) {
      await user.click(overlay);
    }
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when mask is clicked and maskClosable is false', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    
    render(<AlertDialog {...defaultProps} onClose={onClose} maskClosable={false} />);
    
    // Click on the overlay (mask)
    const overlay = screen.getByRole('alertdialog').parentElement;
    if (overlay) {
      await user.click(overlay);
    }
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('hides close button when closable is false', () => {
    render(<AlertDialog {...defaultProps} closable={false} />);
    
    expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    
    render(
      <AlertDialog 
        {...defaultProps} 
        onConfirm={onConfirm}
        onClose={onClose}
      />
    );
    
    const confirmButton = screen.getByText('OK');
    await user.click(confirmButton);
    
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel and onClose when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onCancel = jest.fn();
    const onClose = jest.fn();
    
    render(
      <AlertDialog 
        {...defaultProps} 
        onCancel={onCancel}
        onClose={onClose}
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);
    
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render cancel button when onCancel is not provided', () => {
    render(<AlertDialog {...defaultProps} />);
    
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('shows loading state on confirm button', () => {
    render(
      <AlertDialog 
        {...defaultProps} 
        confirmLoading={true}
        onConfirm={jest.fn()}
      />
    );
    
    const confirmButton = screen.getByText('OK');
    expect(confirmButton).toBeDisabled();
  });

  it('does not close dialog when confirm is loading', async () => {
    const user = userEvent.setup();
    const onConfirm = jest.fn();
    const onClose = jest.fn();
    
    render(
      <AlertDialog 
        {...defaultProps} 
        onConfirm={onConfirm}
        onClose={onClose}
        confirmLoading={true}
      />
    );
    
    const confirmButton = screen.getByText('OK');
    
    // Button should be disabled when loading, so click shouldn't trigger handlers
    expect(confirmButton).toBeDisabled();
    await user.click(confirmButton);
    
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders custom confirm and cancel text', () => {
    render(
      <AlertDialog 
        {...defaultProps} 
        confirmText="Save"
        cancelText="Discard"
        onCancel={jest.fn()}
      />
    );
    
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Discard')).toBeInTheDocument();
  });

  it('renders different variants with correct icons', () => {
    const variants: Array<'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'> = [
      'primary', 'secondary', 'info', 'success', 'warning', 'danger'
    ];

    variants.forEach(variant => {
      const { unmount } = render(
        <AlertDialog {...defaultProps} variant={variant} />
      );
      
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
      
      unmount();
    });
  });

  it('renders children when provided', () => {
    render(
      <AlertDialog {...defaultProps}>
        <div data-testid="custom-content">Custom Content</div>
      </AlertDialog>
    );
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AlertDialog {...defaultProps} className="custom-dialog" />);
    
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveClass('custom-dialog');
  });

  it('applies custom width', () => {
    render(<AlertDialog {...defaultProps} width={500} />);
    
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveStyle('width: 500px');
  });

  it('applies string width', () => {
    render(<AlertDialog {...defaultProps} width="80%" />);
    
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveStyle('width: 80%');
  });

  it('has proper ARIA attributes', () => {
    render(<AlertDialog {...defaultProps} />);
    
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(dialog).toHaveAttribute('tabIndex', '-1');
  });

  it('manages body scroll correctly', () => {
    const { rerender } = render(<AlertDialog {...defaultProps} open={true} />);
    
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<AlertDialog {...defaultProps} open={false} />);
    
    expect(document.body.style.overflow).toBe('');
  });

  it('handles focus management', async () => {
    // Create a button to have initial focus
    const TestComponent = () => (
      <div>
        <button data-testid="initial-button">Initial Button</button>
        <AlertDialog {...defaultProps} />
      </div>
    );
    
    render(<TestComponent />);
    
    const initialButton = screen.getByTestId('initial-button');
    initialButton.focus();
    expect(initialButton).toHaveFocus();
    
    // Wait for dialog to focus itself
    await waitFor(() => {
      const dialog = screen.getByRole('alertdialog');
      expect(dialog).toHaveFocus();
    });
  });

  it('renders without title and description', () => {
    render(
      <AlertDialog 
        open={true}
        onClose={jest.fn()}
      />
    );
    
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('positions dialog based on centered prop', () => {
    const { rerender } = render(<AlertDialog {...defaultProps} centered={true} />);
    
    let overlay = screen.getByRole('alertdialog').parentElement;
    expect(overlay).toHaveClass('items-center');
    
    rerender(<AlertDialog {...defaultProps} centered={false} />);
    
    overlay = screen.getByRole('alertdialog').parentElement;
    expect(overlay).toHaveClass('items-start', 'pt-20');
  });

  it('disables cancel button when confirm is loading', () => {
    render(
      <AlertDialog 
        {...defaultProps} 
        onCancel={jest.fn()}
        confirmLoading={true}
      />
    );
    
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeDisabled();
  });
});