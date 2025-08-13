import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BaseComponentProps } from '../../types';
import { cn } from '../../utils/classNames';

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

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onValueChange?.(newValue);
  }, [isControlled, onValueChange]);

  const handleItemSelect = useCallback((item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
    onOpenChange?.(false);
  }, [onSelect, onOpenChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, [open, filteredItems, selectedIndex, handleItemSelect, onOpenChange]);

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

  const commandClasses = cn(
    'bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden',
    'max-w-md w-full',
    className
  );

  const renderItem = useCallback((item: CommandItem, index: number) => {
    const isSelected = index === selectedIndex;
    const itemClasses = cn(
      'flex items-center gap-3 px-3 py-2 cursor-pointer',
      'hover:bg-gray-100 transition-colors duration-150',
      'focus:outline-none focus:bg-gray-100',
      isSelected && 'bg-blue-50 border-l-2 border-l-blue-500',
      item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
    );

    return (
      <div
        key={item.id}
        id={`command-item-${item.id}`}
        data-index={index}
        className={itemClasses}
        onClick={() => !item.disabled && handleItemSelect(item)}
        onMouseEnter={() => setSelectedIndex(index)}
        role="option"
        aria-selected={isSelected}
        aria-disabled={item.disabled}
      >
        {item.icon && (
          <span className="flex-shrink-0 w-4 h-4 text-gray-500">
            {item.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 truncate">
            {item.label}
          </div>
          {item.description && (
            <div className="text-xs text-gray-500 truncate">
              {item.description}
            </div>
          )}
        </div>
      </div>
    );
  }, [selectedIndex, handleItemSelect]);

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
        <div key={group.id} className="border-b border-gray-100 last:border-b-0">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
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
      <div className="relative flex items-center border-b border-gray-200">
        <svg
          className="absolute left-3 w-4 h-4 text-gray-400"
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
          className="w-full pl-10 pr-4 py-3 text-sm bg-transparent border-none outline-none placeholder-gray-500"
          placeholder={placeholder}
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-owns={open ? "command-listbox" : undefined}
          aria-activedescendant={
            filteredItems[selectedIndex] ? 
            `command-item-${filteredItems[selectedIndex].id}` : 
            undefined
          }
        />
        {loading && (
          <div className="absolute right-3 flex items-center">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {open && (
        <div
          id="command-listbox"
          ref={listRef}
          className="overflow-y-auto"
          style={{ maxHeight }}
          role="listbox"
          aria-label="Command options"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
              <span>Loading...</span>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="py-8 px-3 text-sm text-center text-gray-500">
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