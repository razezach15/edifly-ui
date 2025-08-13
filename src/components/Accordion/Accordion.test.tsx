import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItemProps } from './Accordion';

const mockItems: AccordionItemProps[] = [
  {
    key: '1',
    title: 'Panel 1',
    content: 'Content of panel 1'
  },
  {
    key: '2',
    title: 'Panel 2',
    content: 'Content of panel 2'
  },
  {
    key: '3',
    title: 'Panel 3',
    content: 'Content of panel 3',
    disabled: true
  }
];

describe('Accordion', () => {
  it('renders all accordion items', () => {
    render(<Accordion items={mockItems} />);
    
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
    expect(screen.getByText('Panel 2')).toBeInTheDocument();
    expect(screen.getByText('Panel 3')).toBeInTheDocument();
  });

  it('expands and collapses items in non-accordion mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);
    
    const panel1 = screen.getByText('Panel 1');
    await user.click(panel1);
    
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
    
    await user.click(panel1);
    const content = screen.getByText('Content of panel 1');
    expect(content.closest('[role="region"]')).toHaveStyle('height: 0px');
  });

  it('works in accordion mode (only one panel open)', async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} accordion />);
    
    const panel1 = screen.getByText('Panel 1');
    const panel2 = screen.getByText('Panel 2');
    
    await user.click(panel1);
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
    
    await user.click(panel2);
    expect(screen.getByText('Content of panel 2')).toBeInTheDocument();
    const content1 = screen.getByText('Content of panel 1');
    expect(content1.closest('[role="region"]')).toHaveStyle('height: 0px');
  });

  it('handles defaultActiveKey correctly', () => {
    render(<Accordion items={mockItems} defaultActiveKey="1" accordion />);
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
  });

  it('handles controlled activeKey', () => {
    const { rerender } = render(<Accordion items={mockItems} activeKey="1" accordion />);
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
    
    rerender(<Accordion items={mockItems} activeKey="2" accordion />);
    expect(screen.getByText('Content of panel 2')).toBeInTheDocument();
    const content1 = screen.getByText('Content of panel 1');
    expect(content1.closest('[role="region"]')).toHaveStyle('height: 0px');
  });

  it('calls onChange when item is clicked', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    render(<Accordion items={mockItems} onChange={handleChange} accordion />);
    
    await user.click(screen.getByText('Panel 1'));
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('does not expand disabled items', async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);
    
    const panel3 = screen.getByText('Panel 3');
    await user.click(panel3);
    
    const content3 = screen.getByText('Content of panel 3');
    expect(content3.closest('[role="region"]')).toHaveStyle('height: 0px');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);
    
    const panel1 = screen.getByText('Panel 1');
    panel1.focus();
    
    await user.keyboard('{Enter}');
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
    
    await user.keyboard(' ');
    const content = screen.getByText('Content of panel 1');
    expect(content.closest('[role="region"]')).toHaveStyle('height: 0px');
  });

  it('applies ghost styling when ghost prop is true', () => {
    const { container } = render(<Accordion items={mockItems} ghost />);
    const accordion = container.firstChild;
    expect(accordion).toHaveClass('border-0', 'bg-transparent', 'shadow-none');
  });

  it('applies custom className', () => {
    const { container } = render(<Accordion items={mockItems} className="custom-class" />);
    const accordion = container.firstChild;
    expect(accordion).toHaveClass('custom-class');
  });

  it('renders expand icon in correct position', () => {
    render(<Accordion items={mockItems} expandIconPosition="end" />);
    
    // Check that icons are positioned at the end (after title)
    const panels = screen.getAllByRole('button');
    panels.forEach(panel => {
      const svg = panel.querySelector('svg');
      expect(svg?.parentElement).toHaveClass('ml-3');
    });
  });

  it('has proper ARIA attributes', () => {
    render(<Accordion items={mockItems} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('tabIndex');
    });
  });

  it('handles multiple active keys in non-accordion mode', () => {
    render(<Accordion items={mockItems} defaultActiveKey={['1', '2']} />);
    
    expect(screen.getByText('Content of panel 1')).toBeInTheDocument();
    expect(screen.getByText('Content of panel 2')).toBeInTheDocument();
  });

  it('renders extra content when provided', () => {
    const itemsWithExtra: AccordionItemProps[] = [
      {
        key: '1',
        title: 'Panel 1',
        content: 'Content 1',
        extra: <span>Extra info</span>
      }
    ];
    
    render(<Accordion items={itemsWithExtra} />);
    expect(screen.getByText('Extra info')).toBeInTheDocument();
  });
});