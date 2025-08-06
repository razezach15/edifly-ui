import React, { useState, useRef, useEffect } from 'react';
import { BaseComponentProps } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Command.css';

export interface CommandItem {
  id: string;
  label: string;
  value?: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandGroup {
  id: string;
  label: string;
  items: CommandItem[];
}

export interface CommandProps extends BaseComponentProps {
  items?: CommandItem[];
  groups?: CommandGroup[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (item: CommandItem) => void;
  filter?: (items: CommandItem[], search: string) => CommandItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  emptyMessage?: string;
  maxHeight?: number | string;
  loading?: boolean;
}

const defaultFilter = (items: CommandItem[], search: string): CommandItem[] => {
  if (!search.trim()) return items;
  
  const searchLower = search.toLowerCase().trim();
  
  return items.filter(item => {
    const labelMatch = item.label.toLowerCase().includes(searchLower);
    const valueMatch = item.value?.toLowerCase().includes(searchLower);
    const descMatch = item.description?.toLowerCase().includes(searchLower);
    const keywordMatch = item.keywords?.some(keyword => 
      keyword.toLowerCase().includes(searchLower)
    );
    
    return labelMatch || valueMatch || descMatch || keywordMatch;
  });
};

export const Command: React.FC<CommandProps> = ({
  items = [],
  groups = [],
  placeholder = 'Search...',
  value = '',
  onValueChange,
  onSelect,
  filter = defaultFilter,
  open = true,
  onOpenChange,
  emptyMessage = 'No results found.',
  maxHeight = 300,
  loading = false,
  className,
  style,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isControlled = onValueChange !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Flatten all items from groups and standalone items
  const allItems = React.useMemo(() => {
    const groupItems = groups.flatMap(group => group.items);
    return [...items, ...groupItems];
  }, [items, groups]);

  // Filter items based on search
  const filteredItems = React.useMemo(() => {
    return filter(allItems, currentValue).filter(item => !item.disabled);
  }, [allItems, currentValue, filter]);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
  };

  const handleItemSelect = (item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
    onOpenChange?.(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleItemSelect(filteredItems[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onOpenChange?.(false);
        inputRef.current?.blur();
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      ) as HTMLElement;
      
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);

  const commandClasses = getComponentClasses(
    'edifly-command',
    undefined,
    undefined,
    undefined,
    className
  );

  const renderItem = (item: CommandItem, index: number) => {
    const isSelected = index === selectedIndex;
    const itemClasses = [
      'edifly-command__item',
      isSelected && 'edifly-command__item--selected',
      item.disabled && 'edifly-command__item--disabled'
    ].filter(Boolean).join(' ');

    return (
      <div
        key={item.id}
        data-index={index}
        className={itemClasses}
        onClick={() => !item.disabled && handleItemSelect(item)}
        onMouseEnter={() => setSelectedIndex(index)}
        role="option"
        aria-selected={isSelected}
      >
        {item.icon && (
          <span className="edifly-command__item-icon">
            {item.icon}
          </span>
        )}
        <div className="edifly-command__item-content">
          <div className="edifly-command__item-label">
            {item.label}
          </div>
          {item.description && (
            <div className="edifly-command__item-description">
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderGroupedItems = () => {
    if (groups.length === 0) {
      return filteredItems.map((item, index) => renderItem(item, index));
    }

    let itemIndex = 0;
    return groups.map(group => {
      const groupItems = group.items.filter(item => 
        filteredItems.includes(item)
      );
      
      if (groupItems.length === 0) return null;

      return (
        <div key={group.id} className="edifly-command__group">
          <div className="edifly-command__group-label">
            {group.label}
          </div>
          {groupItems.map(item => {
            const renderedItem = renderItem(item, itemIndex);
            itemIndex++;
            return renderedItem;
          })}
        </div>
      );
    }).filter(Boolean);
  };

  return (
    <div
      className={commandClasses}
      style={style}
      {...rest}
    >
      <div className="edifly-command__input-wrapper">
        <svg
          className="edifly-command__search-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M11.5 7a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM13.5 13.5l-3-3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          className="edifly-command__input"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-activedescendant={
            filteredItems[selectedIndex] ? 
            `command-item-${filteredItems[selectedIndex].id}` : 
            undefined
          }
        />
        {loading && (
          <div className="edifly-command__loading">
            <div className="edifly-command__spinner" />
          </div>
        )}
      </div>

      {open && (
        <div
          ref={listRef}
          className="edifly-command__list"
          style={{ maxHeight }}
          role="listbox"
        >
          {loading ? (
            <div className="edifly-command__loading-state">
              <div className="edifly-command__spinner" />
              <span>Loading...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="edifly-command__empty">
              {emptyMessage}
            </div>
          ) : (
            renderGroupedItems()
          )}
        </div>
      )}
    </div>
  );
};