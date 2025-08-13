import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AspectRatio, AspectRatioProps } from './AspectRatio';

describe('AspectRatio', () => {
  const defaultProps: Partial<AspectRatioProps> = {
    'data-testid': 'aspect-ratio-container'
  };

  it('renders children correctly', () => {
    render(
      <AspectRatio {...defaultProps}>
        <div data-testid="child-content">Test Content</div>
      </AspectRatio>
    );
    
    expect(screen.getByTestId('aspect-ratio-container')).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default 16:9 aspect ratio when no ratio is provided', () => {
    render(
      <AspectRatio {...defaultProps}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const paddingElement = container.firstChild as HTMLElement;
    
    // Default 16:9 ratio should result in padding-bottom: 56.25% (9/16 * 100)
    expect(paddingElement).toHaveStyle('padding-bottom: 56.25%');
  });

  it('applies custom ratio correctly', () => {
    render(
      <AspectRatio {...defaultProps} ratio={2}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const paddingElement = container.firstChild as HTMLElement;
    
    // Ratio 2 should result in padding-bottom: 50% (1/2 * 100)
    expect(paddingElement).toHaveStyle('padding-bottom: 50%');
  });

  it('calculates ratio from width and height props', () => {
    render(
      <AspectRatio {...defaultProps} width={800} height={600}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const paddingElement = container.firstChild as HTMLElement;
    
    // 800/600 = 1.333... ratio should result in padding-bottom: 75% (600/800 * 100)
    expect(paddingElement).toHaveStyle('padding-bottom: 75%');
  });

  it('prioritizes ratio prop over width/height props', () => {
    render(
      <AspectRatio {...defaultProps} ratio={1} width={800} height={600}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const paddingElement = container.firstChild as HTMLElement;
    
    // Should use ratio=1 (square), not width/height calculation
    expect(paddingElement).toHaveStyle('padding-bottom: 100%');
  });

  it('applies custom className', () => {
    render(
      <AspectRatio {...defaultProps} className="custom-aspect-ratio">
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveClass('custom-aspect-ratio');
    expect(container).toHaveClass('relative', 'w-full'); // Default classes
  });

  it('applies max width constraint', () => {
    render(
      <AspectRatio {...defaultProps} maxWidth="400px">
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle('max-width: 400px');
  });

  it('applies max height constraint', () => {
    render(
      <AspectRatio {...defaultProps} maxHeight="300px">
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle('max-height: 300px');
  });

  it('applies min width constraint', () => {
    render(
      <AspectRatio {...defaultProps} minWidth="200px">
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle('min-width: 200px');
  });

  it('applies min height constraint', () => {
    render(
      <AspectRatio {...defaultProps} minHeight="150px">
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle('min-height: 150px');
  });

  it('applies multiple constraints together', () => {
    render(
      <AspectRatio 
        {...defaultProps} 
        maxWidth="500px" 
        maxHeight="400px"
        minWidth="200px"
        minHeight="100px"
      >
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle({
      'max-width': '500px',
      'max-height': '400px',
      'min-width': '200px',
      'min-height': '100px'
    });
  });

  it('applies custom style prop', () => {
    const customStyle = { border: '1px solid red', backgroundColor: 'blue' };
    
    render(
      <AspectRatio {...defaultProps} style={customStyle}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveStyle(customStyle);
  });

  it('renders image children correctly', () => {
    render(
      <AspectRatio {...defaultProps} ratio={AspectRatio.RATIOS.SQUARE}>
        <img src="test-image.jpg" alt="Test" data-testid="test-image" />
      </AspectRatio>
    );
    
    const image = screen.getByTestId('test-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test');
  });

  it('centers content using flexbox', () => {
    render(
      <AspectRatio {...defaultProps}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const contentWrapper = container.lastChild as HTMLElement;
    
    expect(contentWrapper).toHaveClass('absolute', 'inset-0', 'flex', 'items-center', 'justify-center');
  });

  describe('RATIOS constants', () => {
    it('provides correct predefined ratios', () => {
      expect(AspectRatio.RATIOS.SQUARE).toBe(1);
      expect(AspectRatio.RATIOS.PORTRAIT_3_4).toBe(3 / 4);
      expect(AspectRatio.RATIOS.PORTRAIT_2_3).toBe(2 / 3);
      expect(AspectRatio.RATIOS.PORTRAIT_9_16).toBe(9 / 16);
      expect(AspectRatio.RATIOS.LANDSCAPE_4_3).toBe(4 / 3);
      expect(AspectRatio.RATIOS.LANDSCAPE_3_2).toBe(3 / 2);
      expect(AspectRatio.RATIOS.LANDSCAPE_16_9).toBe(16 / 9);
      expect(AspectRatio.RATIOS.LANDSCAPE_21_9).toBe(21 / 9);
      expect(AspectRatio.RATIOS.GOLDEN).toBe(1.618);
      expect(AspectRatio.RATIOS.A4).toBe(210 / 297);
    });

    it('uses predefined ratios correctly', () => {
      render(
        <AspectRatio {...defaultProps} ratio={AspectRatio.RATIOS.GOLDEN}>
          <div>Golden Ratio Content</div>
        </AspectRatio>
      );
      
      const container = screen.getByTestId('aspect-ratio-container');
      const paddingElement = container.firstChild as HTMLElement;
      
      // Golden ratio 1.618 should result in padding-bottom around 61.8%
      const style = paddingElement.style.paddingBottom;
      const paddingValue = parseFloat(style.replace('%', ''));
      
      // Check if it's approximately 61.8% (within reasonable precision)
      expect(paddingValue).toBeCloseTo(61.80469715698392, 5);
    });

    it('uses square ratio correctly', () => {
      render(
        <AspectRatio {...defaultProps} ratio={AspectRatio.RATIOS.SQUARE}>
          <div>Square Content</div>
        </AspectRatio>
      );
      
      const container = screen.getByTestId('aspect-ratio-container');
      const paddingElement = container.firstChild as HTMLElement;
      
      expect(paddingElement).toHaveStyle('padding-bottom: 100%');
    });
  });

  it('handles edge case with zero ratio gracefully', () => {
    render(
      <AspectRatio {...defaultProps} ratio={0}>
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    const paddingElement = container.firstChild as HTMLElement;
    
    // Should handle division by zero gracefully
    expect(paddingElement).toBeInTheDocument();
  });

  it('forwards additional props to container', () => {
    render(
      <AspectRatio 
        {...defaultProps} 
        id="custom-id"
        role="img" 
        aria-label="Custom aspect ratio"
      >
        <div>Content</div>
      </AspectRatio>
    );
    
    const container = screen.getByTestId('aspect-ratio-container');
    expect(container).toHaveAttribute('id', 'custom-id');
    expect(container).toHaveAttribute('role', 'img');
    expect(container).toHaveAttribute('aria-label', 'Custom aspect ratio');
  });

  it('handles complex children structures', () => {
    render(
      <AspectRatio {...defaultProps}>
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      </AspectRatio>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('recalculates aspect ratio when props change', () => {
    const { rerender } = render(
      <AspectRatio {...defaultProps} ratio={1}>
        <div>Content</div>
      </AspectRatio>
    );
    
    let container = screen.getByTestId('aspect-ratio-container');
    let paddingElement = container.firstChild as HTMLElement;
    expect(paddingElement).toHaveStyle('padding-bottom: 100%');
    
    rerender(
      <AspectRatio {...defaultProps} ratio={2}>
        <div>Content</div>
      </AspectRatio>
    );
    
    container = screen.getByTestId('aspect-ratio-container');
    paddingElement = container.firstChild as HTMLElement;
    expect(paddingElement).toHaveStyle('padding-bottom: 50%');
  });
});