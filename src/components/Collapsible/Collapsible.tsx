import React, { useRef, useEffect, useState } from 'react';
import { BaseComponentProps } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Collapsible.css';

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

  const rootClasses = getComponentClasses(
    'edifly-collapsible',
    undefined,
    undefined,
    undefined,
    className
  );

  const modifierClasses = [
    isOpen && 'edifly-collapsible--open',
    animated && 'edifly-collapsible--animated'
  ].filter(Boolean).join(' ');

  const triggerClasses = [
    'edifly-collapsible__trigger',
    isOpen && 'edifly-collapsible__trigger--open',
    triggerClassName
  ].filter(Boolean).join(' ');

  const contentStyle: React.CSSProperties = {
    height: animated ? contentHeight : (isOpen ? 'auto' : '0px'),
    ...(animated && {
      transitionDuration: `${animationDuration}ms`
    })
  };

  const DefaultTrigger = () => (
    <span className="edifly-collapsible__default-trigger">
      <span className="edifly-collapsible__default-text">
        {isOpen ? 'Hide' : 'Show'} content
      </span>
      <svg
        className="edifly-collapsible__icon"
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
      className={`${rootClasses} ${modifierClasses}`.trim()}
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
        className="edifly-collapsible__content"
        style={contentStyle}
        id="collapsible-content"
        role="region"
        aria-hidden={!isOpen}
      >
        <div
          ref={contentRef}
          className="edifly-collapsible__content-inner"
        >
          {children}
        </div>
      </div>
    </div>
  );
};