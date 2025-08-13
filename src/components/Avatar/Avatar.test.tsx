import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Avatar, AvatarProps } from './Avatar';

describe('Avatar', () => {
  const defaultProps: Partial<AvatarProps> = {
    'data-testid': 'avatar-container'
  };

  it('renders with default props', () => {
    render(<Avatar {...defaultProps} />);
    
    const avatar = screen.getByTestId('avatar-container');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('inline-flex', 'items-center', 'justify-center');
    expect(avatar).toHaveClass('rounded-full'); // Default circle shape
    expect(avatar).toHaveClass('w-10', 'h-10'); // Default medium size
  });

  it('renders image when src is provided', () => {
    render(
      <Avatar 
        {...defaultProps} 
        src="test-image.jpg" 
        alt="Test Avatar" 
      />
    );
    
    const image = screen.getByAltText('Test Avatar');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveClass('w-full', 'h-full', 'object-cover');
  });

  it('renders default alt text when alt prop is not provided', () => {
    render(<Avatar {...defaultProps} src="test-image.jpg" />);
    
    const image = screen.getByAltText('Avatar');
    expect(image).toBeInTheDocument();
  });

  it('renders fallback initials when fallback is provided', () => {
    render(<Avatar {...defaultProps} fallback="John Doe" />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial when fallback is a single word', () => {
    render(<Avatar {...defaultProps} fallback="John" />);
    
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders first character when fallback cannot be split', () => {
    render(<Avatar {...defaultProps} fallback="@user" />);
    
    expect(screen.getByText('@')).toBeInTheDocument();
  });

  it('limits initials to 2 characters', () => {
    render(<Avatar {...defaultProps} fallback="John Michael Smith Doe" />);
    
    expect(screen.getByText('JM')).toBeInTheDocument();
  });

  it('renders custom icon when provided', () => {
    const customIcon = (
      <svg data-testid="custom-icon">
        <path d="test-path" />
      </svg>
    );
    
    render(<Avatar {...defaultProps} icon={customIcon} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders children when provided', () => {
    render(
      <Avatar {...defaultProps}>
        <span data-testid="custom-content">Custom</span>
      </Avatar>
    );
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('renders default user icon when no content is provided', () => {
    render(<Avatar {...defaultProps} />);
    
    const avatar = screen.getByTestId('avatar-container');
    const svg = avatar.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('w-5', 'h-5');
  });

  describe('content priority', () => {
    it('prioritizes src image over other content', () => {
      render(
        <Avatar 
          {...defaultProps} 
          src="test-image.jpg"
          fallback="John Doe"
          icon={<span data-testid="icon">Icon</span>}
        >
          <span data-testid="children">Children</span>
        </Avatar>
      );
      
      expect(screen.getByAltText('Avatar')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('children')).not.toBeInTheDocument();
    });

    it('shows children when no src is provided', () => {
      render(
        <Avatar 
          {...defaultProps} 
          fallback="John Doe"
          icon={<span data-testid="icon">Icon</span>}
        >
          <span data-testid="children">Children</span>
        </Avatar>
      );
      
      expect(screen.getByTestId('children')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('shows icon when no src or children are provided', () => {
      render(
        <Avatar 
          {...defaultProps} 
          fallback="John Doe"
          icon={<span data-testid="icon">Icon</span>}
        />
      );
      
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.queryByText('JD')).not.toBeInTheDocument();
    });

    it('shows fallback when no src, children, or icon are provided', () => {
      render(<Avatar {...defaultProps} fallback="John Doe" />);
      
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('applies small size classes', () => {
      render(<Avatar {...defaultProps} size="small" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('w-8', 'h-8', 'text-xs');
    });

    it('applies medium size classes (default)', () => {
      render(<Avatar {...defaultProps} size="medium" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('w-10', 'h-10', 'text-sm');
    });

    it('applies large size classes', () => {
      render(<Avatar {...defaultProps} size="large" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('w-12', 'h-12', 'text-base');
    });

    it('applies custom numeric size', () => {
      render(<Avatar {...defaultProps} size={50} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveStyle({
        width: '50px',
        height: '50px',
        fontSize: '22.5px' // size * 0.45
      });
    });
  });

  describe('shapes', () => {
    it('applies circle shape by default', () => {
      render(<Avatar {...defaultProps} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('rounded-full');
    });

    it('applies circle shape when explicitly set', () => {
      render(<Avatar {...defaultProps} shape="circle" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('rounded-full');
    });

    it('applies square shape', () => {
      render(<Avatar {...defaultProps} shape="square" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('rounded-lg');
    });
  });

  describe('interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Avatar {...defaultProps} onClick={handleClick} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('cursor-pointer');
      expect(avatar).toHaveAttribute('role', 'button');
      expect(avatar).toHaveAttribute('tabIndex', '0');
      
      await user.click(avatar);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Enter)', () => {
      const handleClick = jest.fn();
      
      render(<Avatar {...defaultProps} onClick={handleClick} />);
      
      const avatar = screen.getByTestId('avatar-container');
      fireEvent.keyDown(avatar, { key: 'Enter', code: 'Enter' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events (Space)', () => {
      const handleClick = jest.fn();
      
      render(<Avatar {...defaultProps} onClick={handleClick} />);
      
      const avatar = screen.getByTestId('avatar-container');
      fireEvent.keyDown(avatar, { key: ' ', code: 'Space' });
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('ignores other keyboard events', () => {
      const handleClick = jest.fn();
      
      render(<Avatar {...defaultProps} onClick={handleClick} />);
      
      const avatar = screen.getByTestId('avatar-container');
      fireEvent.keyDown(avatar, { key: 'Tab', code: 'Tab' });
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not add interactive styles when onClick is not provided', () => {
      render(<Avatar {...defaultProps} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).not.toHaveClass('cursor-pointer');
      expect(avatar).not.toHaveAttribute('role');
      expect(avatar).not.toHaveAttribute('tabIndex');
    });
  });

  describe('image loading states', () => {
    it('shows loading spinner when image is loading', () => {
      render(<Avatar {...defaultProps} src="test-image.jpg" />);
      
      const avatar = screen.getByTestId('avatar-container');
      const spinner = avatar.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('hides loading spinner when image loads successfully', () => {
      render(<Avatar {...defaultProps} src="test-image.jpg" />);
      
      const image = screen.getByAltText('Avatar');
      
      // Simulate image load
      fireEvent.load(image);
      
      const avatar = screen.getByTestId('avatar-container');
      const spinner = avatar.querySelector('.animate-spin');
      expect(spinner).not.toBeInTheDocument();
    });

    it('shows fallback content when image fails to load', async () => {
      render(
        <Avatar 
          {...defaultProps} 
          src="invalid-image.jpg" 
          fallback="John Doe"
        />
      );
      
      const image = screen.getByAltText('Avatar');
      
      // Simulate image error
      fireEvent.error(image);
      
      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });

    it('handles image error and hides spinner', () => {
      render(<Avatar {...defaultProps} src="invalid-image.jpg" />);
      
      const image = screen.getByAltText('Avatar');
      fireEvent.error(image);
      
      const avatar = screen.getByTestId('avatar-container');
      const spinner = avatar.querySelector('.animate-spin');
      expect(spinner).not.toBeInTheDocument();
    });
  });

  describe('draggable', () => {
    it('makes image draggable when draggable is true', () => {
      render(
        <Avatar 
          {...defaultProps} 
          src="test-image.jpg" 
          draggable={true}
        />
      );
      
      const image = screen.getByAltText('Avatar');
      expect(image).toHaveAttribute('draggable', 'true');
    });

    it('makes image non-draggable by default', () => {
      render(<Avatar {...defaultProps} src="test-image.jpg" />);
      
      const image = screen.getByAltText('Avatar');
      expect(image).toHaveAttribute('draggable', 'false');
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      render(<Avatar {...defaultProps} className="custom-avatar" />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveClass('custom-avatar');
      expect(avatar).toHaveClass('inline-flex'); // Still has base classes
    });

    it('applies custom style', () => {
      const customStyle = { backgroundColor: 'red', border: '2px solid blue' };
      
      render(<Avatar {...defaultProps} style={customStyle} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveStyle(customStyle);
    });

    it('merges custom style with size-based styles', () => {
      const customStyle = { backgroundColor: 'red' };
      
      render(<Avatar {...defaultProps} size={60} style={customStyle} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveStyle({
        backgroundColor: 'red',
        width: '60px',
        height: '60px',
        fontSize: '27px'
      });
    });
  });

  describe('accessibility', () => {
    it('has correct role when clickable', () => {
      render(<Avatar {...defaultProps} onClick={jest.fn()} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveAttribute('role', 'button');
    });

    it('has correct tabIndex when clickable', () => {
      render(<Avatar {...defaultProps} onClick={jest.fn()} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveAttribute('tabIndex', '0');
    });

    it('supports keyboard navigation when clickable', () => {
      const handleClick = jest.fn();
      render(<Avatar {...defaultProps} onClick={handleClick} />);
      
      const avatar = screen.getByTestId('avatar-container');
      avatar.focus();
      
      fireEvent.keyDown(avatar, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles empty fallback gracefully', () => {
      render(<Avatar {...defaultProps} fallback="" />);
      
      const avatar = screen.getByTestId('avatar-container');
      // Should render default icon
      const svg = avatar.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('handles whitespace-only fallback', () => {
      render(<Avatar {...defaultProps} fallback="   " />);
      
      const avatar = screen.getByTestId('avatar-container');
      const span = avatar.querySelector('span.font-medium');
      // Should render the first character (space) since component doesn't trim
      expect(span).toBeInTheDocument();
      expect(span?.textContent).toBe(' ');
    });

    it('forwards additional props', () => {
      render(
        <Avatar 
          {...defaultProps} 
          id="custom-avatar"
          aria-label="User avatar"
          title="Profile picture"
        />
      );
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveAttribute('id', 'custom-avatar');
      expect(avatar).toHaveAttribute('aria-label', 'User avatar');
      expect(avatar).toHaveAttribute('title', 'Profile picture');
    });

    it('handles zero size gracefully', () => {
      render(<Avatar {...defaultProps} size={0} />);
      
      const avatar = screen.getByTestId('avatar-container');
      expect(avatar).toHaveStyle({
        width: '0px',
        height: '0px',
        fontSize: '0px'
      });
    });

    it('renders without crashing when all props are undefined', () => {
      render(<Avatar />);
      
      // Should render default avatar icon
      const avatar = document.querySelector('.inline-flex');
      expect(avatar).toBeInTheDocument();
    });
  });
});