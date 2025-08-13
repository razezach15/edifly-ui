import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Collapsible, CollapsibleProps } from './Collapsible';

describe('Collapsible', () => {
  const defaultProps: Partial<CollapsibleProps> = {
    'data-testid': 'collapsible-container'
  };

  const renderCollapsible = (props: Partial<CollapsibleProps> = {}) => {
    return render(
      <Collapsible {...defaultProps} {...props}>
        <div data-testid="collapsible-content">Test content</div>
      </Collapsible>
    );
  };

  it('renders with default props', () => {
    renderCollapsible();
    
    const container = screen.getByTestId('collapsible-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('border', 'border-gray-200', 'rounded-lg');
  });

  it('renders default trigger when no trigger is provided', () => {
    renderCollapsible();
    
    expect(screen.getByText('Show content')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders custom trigger when provided', () => {
    const customTrigger = <span data-testid="custom-trigger">Custom Trigger</span>;
    renderCollapsible({ trigger: customTrigger });
    
    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    expect(screen.queryByText('Show content')).not.toBeInTheDocument();
  });

  it('starts closed by default', () => {
    renderCollapsible();
    
    const content = screen.getByTestId('collapsible-content');
    const contentContainer = content.closest('[role="region"]');
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('starts open when defaultOpen is true', () => {
    renderCollapsible({ defaultOpen: true });
    
    const content = screen.getByTestId('collapsible-content');
    const contentContainer = content.closest('[role="region"]');
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('Hide content')).toBeInTheDocument();
  });

  it('toggles open/closed on trigger click', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    // Initially closed
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Show content')).toBeInTheDocument();
    
    // Click to open
    await user.click(trigger);
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByText('Hide content')).toBeInTheDocument();
    
    // Click to close
    await user.click(trigger);
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Show content')).toBeInTheDocument();
  });

  it('handles keyboard navigation (Enter)', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    trigger.focus();
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    
    await user.keyboard('{Enter}');
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
  });

  it('handles keyboard navigation (Space)', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    trigger.focus();
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    
    await user.keyboard(' ');
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
  });

  it('ignores other keyboard events', async () => {
    const user = userEvent.setup();
    renderCollapsible();
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    trigger.focus();
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    
    await user.keyboard('{Tab}');
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls onOpenChange when state changes', async () => {
    const onOpenChange = jest.fn();
    const user = userEvent.setup();
    renderCollapsible({ onOpenChange });
    
    const trigger = screen.getByRole('button');
    
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    
    await user.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('works in controlled mode', () => {
    const { rerender } = renderCollapsible({ open: false });
    
    const contentContainer = screen.getByRole('region', { hidden: true });
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    
    rerender(
      <Collapsible {...defaultProps} open={true}>
        <div data-testid="collapsible-content">Test content</div>
      </Collapsible>
    );
    
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
  });

  it('prevents closing when collapsible is false and open', async () => {
    const user = userEvent.setup();
    renderCollapsible({ defaultOpen: true, collapsible: false });
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
    
    await user.click(trigger);
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
  });

  it('allows opening when collapsible is false and closed', async () => {
    const user = userEvent.setup();
    renderCollapsible({ collapsible: false });
    
    const trigger = screen.getByRole('button');
    const contentContainer = screen.getByRole('region', { hidden: true });
    
    expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    
    await user.click(trigger);
    expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
  });

  it('applies custom className', () => {
    renderCollapsible({ className: 'custom-collapsible' });
    
    const container = screen.getByTestId('collapsible-container');
    expect(container).toHaveClass('custom-collapsible');
    expect(container).toHaveClass('border', 'border-gray-200', 'rounded-lg'); // Still has base classes
  });

  it('applies custom trigger className', () => {
    renderCollapsible({ triggerClassName: 'custom-trigger' });
    
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('passes through triggerProps', () => {
    renderCollapsible({ 
      triggerProps: { 'data-testid': 'custom-trigger', title: 'Custom Title' } as React.HTMLAttributes<HTMLButtonElement>
    });
    
    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveAttribute('title', 'Custom Title');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red', border: '2px solid blue' };
    renderCollapsible({ style: customStyle });
    
    const container = screen.getByTestId('collapsible-container');
    expect(container).toHaveStyle(customStyle);
  });

  describe('animation', () => {
    it('has animation classes when animated is true', () => {
      renderCollapsible({ animated: true });
      
      const contentContainer = screen.getByRole('region', { hidden: true });
      expect(contentContainer).toHaveClass('transition-all', 'duration-300', 'ease-in-out');
    });

    it('does not have animation classes when animated is false', () => {
      renderCollapsible({ animated: false });
      
      const contentContainer = screen.getByRole('region', { hidden: true });
      expect(contentContainer).not.toHaveClass('transition-all');
    });

    it('uses custom animation duration', () => {
      renderCollapsible({ animationDuration: 500 });
      
      const contentContainer = screen.getByRole('region', { hidden: true });
      // Check if the style includes the custom duration
      expect(contentContainer).toHaveStyle('transition-duration: 500ms');
    });

    it('sets height to auto when not animated', async () => {
      const user = userEvent.setup();
      renderCollapsible({ animated: false });
      
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      const contentContainer = screen.getByRole('region', { hidden: true });
      expect(contentContainer).toHaveStyle('height: auto');
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      renderCollapsible();
      
      const trigger = screen.getByRole('button');
      const contentContainer = screen.getByRole('region', { hidden: true });
      
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls', 'collapsible-content');
      expect(contentContainer).toHaveAttribute('id', 'collapsible-content');
      expect(contentContainer).toHaveAttribute('aria-hidden', 'true');
    });

    it('updates ARIA attributes when opened', async () => {
      const user = userEvent.setup();
      renderCollapsible();
      
      const trigger = screen.getByRole('button');
      const contentContainer = screen.getByRole('region', { hidden: true });
      
      await user.click(trigger);
      
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
    });

    it('has proper role attributes', () => {
      renderCollapsible();
      
      const trigger = screen.getByRole('button');
      const contentContainer = screen.getByRole('region', { hidden: true });
      
      expect(trigger).toBeInTheDocument();
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('content rendering', () => {
    it('renders children content', () => {
      renderCollapsible();
      
      expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders complex content', async () => {
      const user = userEvent.setup();
      const complexContent = (
        <div>
          <h3 data-testid="content-title">Complex Content</h3>
          <p data-testid="content-text">This is some complex content</p>
          <button data-testid="content-button">Action</button>
        </div>
      );
      
      render(
        <Collapsible {...defaultProps}>
          {complexContent}
        </Collapsible>
      );
      
      const trigger = screen.getByRole('button');
      await user.click(trigger);
      
      expect(screen.getByTestId('content-title')).toBeInTheDocument();
      expect(screen.getByTestId('content-text')).toBeInTheDocument();
      expect(screen.getByTestId('content-button')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('handles rapid toggling', async () => {
      const user = userEvent.setup();
      renderCollapsible();
      
      const trigger = screen.getByRole('button');
      const contentContainer = screen.getByRole('region', { hidden: true });
      
      // Rapid clicks
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);
      
      expect(contentContainer).toHaveAttribute('aria-hidden', 'false');
    });

    it('forwards additional props', () => {
      render(
        <Collapsible 
          {...defaultProps}
          id="custom-collapsible"
          aria-label="Custom collapsible"
        >
          <div>Content</div>
        </Collapsible>
      );
      
      const container = screen.getByTestId('collapsible-container');
      expect(container).toHaveAttribute('id', 'custom-collapsible');
      expect(container).toHaveAttribute('aria-label', 'Custom collapsible');
    });

    it('handles empty content gracefully', () => {
      render(<Collapsible {...defaultProps} />);
      
      const container = screen.getByTestId('collapsible-container');
      const contentContainer = screen.getByRole('region', { hidden: true });
      
      expect(container).toBeInTheDocument();
      expect(contentContainer).toBeInTheDocument();
    });

    it('rotates chevron icon when opened', async () => {
      const user = userEvent.setup();
      renderCollapsible();
      
      const trigger = screen.getByRole('button');
      let chevron = trigger.querySelector('svg');
      
      expect(chevron).not.toHaveClass('rotate-180');
      
      await user.click(trigger);
      
      // Wait for the state update and re-render
      await waitFor(() => {
        chevron = trigger.querySelector('svg'); // Re-query after state change
        expect(chevron).toHaveClass('rotate-180');
      });
    });
  });
});