import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-gray-600', 'hover:bg-gray-700');
  });

  it('applies correct size classes', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByText('Large Button');
    expect(button).toHaveClass('h-12', 'px-4', 'text-base');
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none');
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading Button</Button>);
    const button = screen.getByText('Loading Button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    
    // Check for the loading spinner SVG
    const spinner = button.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    await user.click(screen.getByText('Disabled Button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    
    render(<Button loading onClick={handleClick}>Loading Button</Button>);
    await user.click(screen.getByText('Loading Button'));
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-class');
  });

  it('sets correct button type', () => {
    render(<Button type="submit">Submit Button</Button>);
    const button = screen.getByText('Submit Button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('has proper accessibility attributes', () => {
    render(<Button data-testid="test-button">Accessible Button</Button>);
    const button = screen.getByTestId('test-button');
    
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500');
  });

  it('supports all variant types', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger'] as const;
    
    variants.forEach(variant => {
      render(<Button variant={variant}>{variant} Button</Button>);
      expect(screen.getByText(`${variant} Button`)).toBeInTheDocument();
    });
  });

  it('supports all size types', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    
    sizes.forEach(size => {
      render(<Button size={size}>{size} Button</Button>);
      expect(screen.getByText(`${size} Button`)).toBeInTheDocument();
    });
  });
});