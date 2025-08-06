import React, { useState, useRef, useEffect } from 'react';
import { BaseComponentProps } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Accordion.css';

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

const DefaultExpandIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`edifly-accordion__icon ${isActive ? 'edifly-accordion__icon--active' : ''}`}
    width="12"
    height="12"
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

  const accordionClasses = getComponentClasses(
    'edifly-accordion',
    undefined,
    undefined,
    undefined,
    className
  );

  const modifierClasses = [
    bordered && 'edifly-accordion--bordered',
    ghost && 'edifly-accordion--ghost',
    expandIconPosition === 'end' && 'edifly-accordion--icon-end'
  ].filter(Boolean).join(' ');

  return (
    <div className={`${accordionClasses} ${modifierClasses}`.trim()} {...rest}>
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

  const itemClasses = getComponentClasses(
    'edifly-accordion__item',
    undefined,
    undefined,
    item.disabled
  );

  const headerClasses = getComponentClasses(
    'edifly-accordion__header',
    undefined,
    undefined,
    item.disabled
  );

  return (
    <div className={`${itemClasses} ${isActive ? 'edifly-accordion__item--active' : ''}`.trim()}>
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
          <span className="edifly-accordion__expand-icon">
            {expandIcon(isActive)}
          </span>
        )}
        
        <span className="edifly-accordion__title">{item.title}</span>
        
        {item.extra && (
          <span className="edifly-accordion__extra">{item.extra}</span>
        )}
        
        {expandIconPosition === 'end' && (
          <span className="edifly-accordion__expand-icon">
            {expandIcon(isActive)}
          </span>
        )}
      </div>
      
      <div
        className="edifly-accordion__content"
        style={{ height: contentHeight }}
      >
        <div ref={contentRef} className="edifly-accordion__content-inner">
          {item.content}
        </div>
      </div>
    </div>
  );
};