import React, { useRef, useEffect, useState } from 'react';
import { BaseComponentProps } from '../../types';
import { cn } from '../../utils/classNames';

export interface CollapsibleProps extends BaseComponentProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  triggerProps?: React.HTMLAttributes<HTMLButtonElement>;
  collapsible?: boolean;
  animated?: boolean;
  animationDuration?: number;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  open,
  defaultOpen = false,
  onOpenChange,
  trigger,
  triggerClassName,
  triggerProps = {},
  collapsible = true,
  animated = true,
  animationDuration = 300,
  className,
  children,
  style,
  ...rest
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('0px');
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    if (contentRef.current) {
      if (animated) {
        const height = isOpen ? `${contentRef.current.scrollHeight}px` : '0px';
        setContentHeight(height);
      } else {
        setContentHeight(isOpen ? 'auto' : '0px');
      }
    }
  }, [isOpen, animated, children]);

  const handleToggle = () => {
    if (!collapsible && isOpen) return;
    
    const newOpen = !isOpen;
    
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    
    onOpenChange?.(newOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const rootClasses = cn(
    'border border-gray-200 rounded-lg',
    className
  );

  const triggerClasses = cn(
    'w-full flex items-center justify-between p-3 text-left',
    'bg-transparent border-none cursor-pointer',
    'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
    'transition-colors duration-200',
    'text-gray-900 font-medium',
    triggerClassName
  );

  const contentStyle: React.CSSProperties = {
    height: animated ? contentHeight : (isOpen ? 'auto' : '0px'),
    ...(animated && {
      transitionDuration: `${animationDuration}ms`
    })
  };

  const DefaultTrigger = () => (
    <span className="flex items-center justify-between w-full">
      <span className="text-sm font-medium text-gray-700">
        {isOpen ? 'Hide' : 'Show'} content
      </span>
      <svg
        className={cn(
          'w-3 h-3 text-gray-500 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M6 9L1.5 4.5 2.5 3.5 6 7L9.5 3.5 10.5 4.5 6 9Z" />
      </svg>
    </span>
  );

  return (
    <div
      className={rootClasses}
      style={style}
      {...rest}
    >
      <button
        type="button"
        className={triggerClasses}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls="collapsible-content"
        {...triggerProps}
      >
        {trigger || <DefaultTrigger />}
      </button>
      
      <div
        className={cn(
          'overflow-hidden border-t border-gray-200',
          animated && 'transition-all duration-300 ease-in-out'
        )}
        style={contentStyle}
        id="collapsible-content"
        role="region"
        aria-hidden={!isOpen}
      >
        <div
          ref={contentRef}
          className="p-3 bg-gray-50"
        >
          {children}
        </div>
      </div>
    </div>
  );
};