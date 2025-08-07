import React, { useState, useRef, useEffect } from 'react';
import { BaseComponentProps } from '../../types';
import { cn } from '../../utils/classNames';

export interface AccordionItemProps {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  extra?: React.ReactNode;
}

export interface AccordionProps extends BaseComponentProps {
  items: AccordionItemProps[];
  defaultActiveKey?: string | string[];
  activeKey?: string | string[];
  onChange?: (key: string | string[]) => void;
  accordion?: boolean;
  bordered?: boolean;
  expandIcon?: (isActive: boolean) => React.ReactNode;
  expandIconPosition?: 'start' | 'end';
  ghost?: boolean;
}

const DefaultExpandIcon = (isActive: boolean) => (
  <svg
    className={cn(
      'w-3 h-3 transition-transform duration-200 ease-in-out',
      isActive ? 'rotate-180' : 'rotate-0'
    )}
    viewBox="0 0 12 12"
    fill="currentColor"
  >
    <path d="M6 9L1.5 4.5 2.5 3.5 6 7L9.5 3.5 10.5 4.5 6 9Z" />
  </svg>
);

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultActiveKey,
  activeKey,
  onChange,
  accordion = false,
  bordered = true,
  expandIcon = DefaultExpandIcon,
  expandIconPosition = 'start',
  ghost = false,
  className,
  ...rest
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[]>(() => {
    if (activeKey !== undefined) return activeKey;
    if (defaultActiveKey !== undefined) return defaultActiveKey;
    return accordion ? '' : [];
  });

  const currentActiveKey = activeKey !== undefined ? activeKey : internalActiveKey;

  const handleItemClick = (key: string) => {
    let newActiveKey: string | string[];

    if (accordion) {
      newActiveKey = currentActiveKey === key ? '' : key;
    } else {
      const activeKeys = Array.isArray(currentActiveKey) ? currentActiveKey : [];
      newActiveKey = activeKeys.includes(key)
        ? activeKeys.filter(k => k !== key)
        : [...activeKeys, key];
    }

    if (activeKey === undefined) {
      setInternalActiveKey(newActiveKey);
    }
    onChange?.(newActiveKey);
  };

  const isItemActive = (key: string): boolean => {
    if (accordion) {
      return currentActiveKey === key;
    }
    return Array.isArray(currentActiveKey) ? currentActiveKey.includes(key) : false;
  };

  const accordionClasses = cn(
    'w-full',
    bordered && 'border border-gray-200 rounded-lg overflow-hidden',
    ghost && 'border-0 bg-transparent',
    className
  );

  return (
    <div className={accordionClasses} {...rest}>
      {items.map((item) => (
        <AccordionItem
          key={item.key}
          item={item}
          isActive={isItemActive(item.key)}
          onClick={() => !item.disabled && handleItemClick(item.key)}
          expandIcon={expandIcon}
          expandIconPosition={expandIconPosition}
        />
      ))}
    </div>
  );
};

interface AccordionItemComponentProps {
  item: AccordionItemProps;
  isActive: boolean;
  onClick: () => void;
  expandIcon: (isActive: boolean) => React.ReactNode;
  expandIconPosition: 'start' | 'end';
}

const AccordionItem: React.FC<AccordionItemComponentProps> = ({
  item,
  isActive,
  onClick,
  expandIcon,
  expandIconPosition,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('0px');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isActive]);

  const itemClasses = cn(
    'border-b border-gray-200 last:border-b-0',
    item.disabled && 'opacity-50 cursor-not-allowed'
  );

  const headerClasses = cn(
    'flex items-center w-full px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-colors duration-200',
    expandIconPosition === 'end' && 'justify-between',
    item.disabled && 'cursor-not-allowed hover:bg-white'
  );

  return (
    <div className={itemClasses}>
      <div
        className={headerClasses}
        onClick={onClick}
        role="button"
        tabIndex={item.disabled ? -1 : 0}
        aria-expanded={isActive}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {expandIconPosition === 'start' && (
          <span className="mr-3 flex-shrink-0 text-gray-500">
            {expandIcon(isActive)}
          </span>
        )}
        
        <span className="flex-1 font-medium text-gray-900">{item.title}</span>
        
        {item.extra && (
          <span className="ml-3 text-sm text-gray-500">{item.extra}</span>
        )}
        
        {expandIconPosition === 'end' && (
          <span className="ml-3 flex-shrink-0 text-gray-500">
            {expandIcon(isActive)}
          </span>
        )}
      </div>
      
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out bg-gray-50"
        style={{ height: contentHeight }}
      >
        <div ref={contentRef} className="px-4 py-3 text-gray-700">
          {item.content}
        </div>
      </div>
    </div>
  );
};