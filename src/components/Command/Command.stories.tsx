import type { Meta, StoryObj } from '@storybook/react';
import { Command } from './Command';
import React from 'react';

const meta = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
    maxHeight: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    icon: React.createElement('span', {}, '📄'),
    keywords: ['create', 'file', 'new'],
  },
  {
    id: 'open-file',
    label: 'Open File',
    description: 'Open an existing file',
    icon: React.createElement('span', {}, '📁'),
    keywords: ['open', 'file'],
  },
  {
    id: 'save-file',
    label: 'Save File',
    description: 'Save the current file',
    icon: React.createElement('span', {}, '💾'),
    keywords: ['save', 'file'],
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Open application settings',
    icon: React.createElement('span', {}, '⚙️'),
    keywords: ['settings', 'preferences', 'config'],
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
    placeholder: 'Type a command...',
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const WithGroups: Story = {
  args: {
    groups: [
      {
        id: 'file',
        label: 'File',
        items: [
          {
            id: 'new-file',
            label: 'New File',
            description: 'Create a new file',
            icon: React.createElement('span', {}, '📄'),
          },
          {
            id: 'open-file',
            label: 'Open File',
            description: 'Open an existing file',
            icon: React.createElement('span', {}, '📁'),
          },
          {
            id: 'save-file',
            label: 'Save File',
            description: 'Save the current file',
            icon: React.createElement('span', {}, '💾'),
          },
        ],
      },
      {
        id: 'edit',
        label: 'Edit',
        items: [
          {
            id: 'copy',
            label: 'Copy',
            description: 'Copy selected text',
            icon: React.createElement('span', {}, '📋'),
          },
          {
            id: 'paste',
            label: 'Paste',
            description: 'Paste from clipboard',
            icon: React.createElement('span', {}, '📌'),
          },
          {
            id: 'find',
            label: 'Find',
            description: 'Search in document',
            icon: React.createElement('span', {}, '🔍'),
          },
        ],
      },
      {
        id: 'view',
        label: 'View',
        items: [
          {
            id: 'fullscreen',
            label: 'Toggle Fullscreen',
            description: 'Enter or exit fullscreen mode',
            icon: React.createElement('span', {}, '🖥️'),
          },
          {
            id: 'zoom-in',
            label: 'Zoom In',
            description: 'Increase zoom level',
            icon: React.createElement('span', {}, '🔍'),
          },
          {
            id: 'zoom-out',
            label: 'Zoom Out',
            description: 'Decrease zoom level',
            icon: React.createElement('span', {}, '🔍'),
          },
        ],
      },
    ],
    placeholder: 'Search commands...',
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '500px' } }, React.createElement(Story))
  ],
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: 'Searching...',
    items: [],
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const Empty: Story = {
  args: {
    items: [],
    placeholder: 'Search for something...',
    emptyMessage: 'No commands found. Try a different search term.',
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState(null);
    
    return React.createElement('div', { style: { width: '400px' } },
      React.createElement('div', {
        style: { marginBottom: '16px', fontSize: '14px', color: '#666' }
      }, `Search: "${value}"${selectedItem ? ` | Selected: ${selectedItem.label}` : ''}`),
      React.createElement(Command, {
        items: basicItems,
        value: value,
        onValueChange: setValue,
        onSelect: (item) => {
          setSelectedItem(item);
          alert(`Selected: ${item.label}`);
        },
        placeholder: 'Type to search...',
      })
    );
  },
};

export const CustomFilter: Story = {
  render: () => {
    const items = [
      { id: 'item1', label: 'React Component', description: 'JavaScript library', keywords: ['js', 'frontend'] },
      { id: 'item2', label: 'Vue Component', description: 'JavaScript framework', keywords: ['js', 'frontend'] },
      { id: 'item3', label: 'Angular Component', description: 'TypeScript framework', keywords: ['ts', 'frontend'] },
      { id: 'item4', label: 'Node.js Server', description: 'Backend runtime', keywords: ['js', 'backend'] },
      { id: 'item5', label: 'Python Script', description: 'Scripting language', keywords: ['py', 'script'] },
      { id: 'item6', label: 'Database Query', description: 'SQL database', keywords: ['sql', 'db'] },
    ];
    
    // Custom filter that gives priority to exact matches
    const customFilter = (items, search) => {
      if (!search) return items;
      
      const exactMatches = [];
      const partialMatches = [];
      
      items.forEach(item => {
        const searchLower = search.toLowerCase();
        const labelLower = item.label.toLowerCase();
        
        if (labelLower === searchLower) {
          exactMatches.push(item);
        } else if (labelLower.includes(searchLower) || 
                   item.description?.toLowerCase().includes(searchLower) ||
                   item.keywords?.some(k => k.toLowerCase().includes(searchLower))) {
          partialMatches.push(item);
        }
      });
      
      return [...exactMatches, ...partialMatches];
    };
    
    return React.createElement('div', { style: { width: '450px' } },
      React.createElement('p', { style: { fontSize: '14px', marginBottom: '16px' } },
        'Custom filter prioritizes exact matches first.'
      ),
      React.createElement(Command, {
        items: items,
        filter: customFilter,
        placeholder: 'Try "React" or "js"...',
      })
    );
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'View application overview',
        icon: React.createElement('svg', {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'currentColor'
        }, React.createElement('path', {
          d: 'M2 3a1 1 0 011-1h2.5a1 1 0 011 1v2.5a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 9.5a1 1 0 011-1h2.5a1 1 0 011 1V12a1 1 0 01-1 1H3a1 1 0 01-1-1V9.5zM9.5 2a1 1 0 00-1 1v2.5a1 1 0 001 1H12a1 1 0 001-1V3a1 1 0 00-1-1H9.5zM8.5 9.5a1 1 0 011-1H12a1 1 0 011 1V12a1 1 0 01-1 1H9.5a1 1 0 01-1-1V9.5z'
        })),
      },
      {
        id: 'users',
        label: 'Users',
        description: 'Manage user accounts',
        icon: React.createElement('svg', {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'currentColor'
        }, React.createElement('path', {
          d: 'M6 8a3 3 0 100-6 3 3 0 000 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm.5 2.5a.5.5 0 000 1h4a.5.5 0 000-1h-4zm2 3a.5.5 0 000 1h2a.5.5 0 000-1h-2z'
        })),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: 'View reports and statistics',
        icon: React.createElement('svg', {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'currentColor'
        }, React.createElement('path', {
          d: 'M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1h-2zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7zM1 11a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1v-3z'
        })),
      },
      {
        id: 'settings',
        label: 'Settings',
        description: 'Configure application',
        icon: React.createElement('svg', {
          width: 16,
          height: 16,
          viewBox: '0 0 16 16',
          fill: 'currentColor'
        }, React.createElement('path', {
          d: 'M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z'
        }), React.createElement('path', {
          d: 'M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 002.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 001.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 00-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 00-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 00-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 001.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 003.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 002.692-1.115l.094-.319z'
        })),
      },
    ],
    placeholder: 'Search with icons...',
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const AsyncSearch: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [value, setValue] = React.useState('');
    
    // Simulate async search
    React.useEffect(() => {
      if (!value.trim()) {
        setItems([]);
        return;
      }
      
      setLoading(true);
      const timer = setTimeout(() => {
        // Mock search results based on query
        const mockResults = [
          { id: 'result1', label: `Search result for "${value}"`, description: 'First result' },
          { id: 'result2', label: `Another result for "${value}"`, description: 'Second result' },
          { id: 'result3', label: `Best match for "${value}"`, description: 'Third result' },
        ].filter(item => Math.random() > 0.3); // Randomly filter some results
        
        setItems(mockResults);
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }, [value]);
    
    return React.createElement('div', { style: { width: '400px' } },
      React.createElement('p', { 
        style: { fontSize: '14px', marginBottom: '16px', color: '#666' } 
      }, 'Type to trigger async search (simulated 800ms delay)'),
      React.createElement(Command, {
        items: items,
        value: value,
        onValueChange: setValue,
        loading: loading,
        placeholder: 'Type to search remotely...',
        emptyMessage: value ? 'No results found.' : 'Start typing to search...',
      })
    );
  },
};

export const CommandPalette: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    const commands = [
      { id: 'new', label: 'New File', description: 'Ctrl+N', icon: '📄' },
      { id: 'open', label: 'Open File', description: 'Ctrl+O', icon: '📁' },
      { id: 'save', label: 'Save', description: 'Ctrl+S', icon: '💾' },
      { id: 'search', label: 'Search', description: 'Ctrl+F', icon: '🔍' },
      { id: 'replace', label: 'Replace', description: 'Ctrl+H', icon: '🔄' },
      { id: 'settings', label: 'Settings', description: 'Ctrl+,', icon: '⚙️' },
      { id: 'command', label: 'Command Palette', description: 'Ctrl+Shift+P', icon: '🎯' },
    ];
    
    React.useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
          e.preventDefault();
          setOpen(prev => !prev);
        }
        
        if (e.key === 'Escape') {
          setOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);
    
    return React.createElement('div', { style: { width: '500px', height: '300px' } },
      React.createElement('div', {
        style: {
          padding: '20px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          marginBottom: '16px'
        }
      },
        React.createElement('h3', { style: { margin: '0 0 8px 0' } }, 'Command Palette Demo'),
        React.createElement('p', { style: { margin: '0', fontSize: '14px', color: '#666' } },
          'Press Ctrl+Shift+P to open command palette'
        )
      ),
      
      React.createElement('button', {
        onClick: () => setOpen(true),
        style: {
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '16px'
        }
      }, 'Open Command Palette'),
      
      open && React.createElement('div', {
        style: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '100px',
          zIndex: 1000
        },
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            setOpen(false);
          }
        }
      }, React.createElement('div', { style: { width: '500px' } },
        React.createElement(Command, {
          items: commands.map(cmd => ({
            ...cmd,
            icon: React.createElement('span', {}, cmd.icon),
            onSelect: () => {
              alert(`Executing: ${cmd.label}`);
              setOpen(false);
            }
          })),
          placeholder: 'Type a command or search...',
          onOpenChange: setOpen,
          autoFocus: true
        })
      ))
    );
  },
};