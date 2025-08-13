import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox>Test Label</Checkbox>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('handles controlled checked state', () => {
    const { rerender } = render(<Checkbox checked={false}>Controlled</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    rerender(<Checkbox checked={true}>Controlled</Checkbox>);
    expect(checkbox).toBeChecked();
  });

  it('handles uncontrolled state with defaultChecked', () => {
    render(<Checkbox defaultChecked>Default Checked</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange when clicked', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<Checkbox onChange={handleChange}>Clickable</Checkbox>);
    await user.click(screen.getByRole('checkbox'));
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<Checkbox disabled onChange={handleChange}>Disabled</Checkbox>);
    await user.click(screen.getByRole('checkbox'));
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled state correctly', () => {
    render(<Checkbox disabled>Disabled Checkbox</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  });

  it('supports keyboard navigation', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<Checkbox onChange={handleChange}>Keyboard</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    
    checkbox.focus();
    await user.keyboard(' ');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Checkbox className="custom-class">Custom</Checkbox>);
    const label = screen.getByText('Custom');
    expect(label.closest('label')).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<Checkbox id="test-checkbox">Accessible</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accessible').closest('label');
    
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    expect(label).toHaveAttribute('for', 'test-checkbox');
  });
});