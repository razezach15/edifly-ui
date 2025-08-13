import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import React from 'react';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default checkbox',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
    children: 'Checked checkbox',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
    children: 'Disabled checked checkbox',
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    children: 'Indeterminate checkbox',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small checkbox',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large checkbox',
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const AllSizes: Story = {
  args: {},
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  },
    React.createElement(Checkbox, { size: 'small' }, 'Small checkbox'),
    React.createElement(Checkbox, { size: 'medium' }, 'Medium checkbox'),
    React.createElement(Checkbox, { size: 'large' }, 'Large checkbox')
  ),
};

export const AllStates: Story = {
  args: {},
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  },
    React.createElement(Checkbox, {}, 'Unchecked'),
    React.createElement(Checkbox, { defaultChecked: true }, 'Checked'),
    React.createElement(Checkbox, { indeterminate: true }, 'Indeterminate'),
    React.createElement(Checkbox, { disabled: true }, 'Disabled'),
    React.createElement(Checkbox, { disabled: true, defaultChecked: true }, 'Disabled Checked'),
    React.createElement(Checkbox, { disabled: true, indeterminate: true }, 'Disabled Indeterminate')
  ),
};

export const Controlled: Story = {
  args: {},
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    },
      React.createElement(Checkbox, {
        checked,
        onChange: (newChecked) => setChecked(newChecked)
      }, 'Controlled checkbox'),
      React.createElement('div', {
        style: { fontSize: '14px', color: '#666' }
      }, `Current value: ${checked}`)
    );
  },
};

export const CheckboxGroup: Story = {
  args: {},
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState(['item1']);
    
    const items = [
      { id: 'item1', label: 'Item 1' },
      { id: 'item2', label: 'Item 2' },
      { id: 'item3', label: 'Item 3' },
      { id: 'item4', label: 'Item 4 (disabled)', disabled: true },
    ];
    
    const handleItemChange = (itemId: string, checked: boolean) => {
      if (checked) {
        setSelectedItems(prev => [...prev, itemId]);
      } else {
        setSelectedItems(prev => prev.filter(id => id !== itemId));
      }
    };
    
    const allChecked = items.filter(item => !item.disabled).every(item => 
      selectedItems.includes(item.id)
    );
    const someChecked = selectedItems.length > 0;
    const indeterminate = someChecked && !allChecked;
    
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelectedItems(items.filter(item => !item.disabled).map(item => item.id));
      } else {
        setSelectedItems([]);
      }
    };
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '200px'
      }
    },
      React.createElement(Checkbox, {
        checked: allChecked,
        indeterminate,
        onChange: handleSelectAll,
        style: { fontWeight: 'bold', marginBottom: '8px' }
      }, 'Select All'),
      React.createElement('div', {
        style: { 
          borderTop: '1px solid #e0e0e0', 
          paddingTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }
      }, ...items.map(item =>
        React.createElement(Checkbox, {
          key: item.id,
          checked: selectedItems.includes(item.id),
          disabled: item.disabled,
          onChange: (checked) => handleItemChange(item.id, checked),
          style: { marginLeft: '16px' }
        }, item.label)
      )),
      React.createElement('div', {
        style: { 
          marginTop: '12px', 
          fontSize: '13px', 
          color: '#666',
          padding: '8px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }
      }, `Selected: ${selectedItems.join(', ') || 'none'}`)
    );
  },
};

export const FormExample: Story = {
  args: {},
  render: () => {
    const [formData, setFormData] = React.useState({
      newsletter: false,
      terms: false,
      notifications: true,
      marketing: false
    });
    
    const handleChange = (name: string, checked: boolean) => {
      setFormData(prev => ({ ...prev, [name]: checked }));
    };
    
    return React.createElement('form', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '280px',
        padding: '20px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px'
      },
      onSubmit: (e) => {
        e.preventDefault();
        alert(`Form data: ${JSON.stringify(formData, null, 2)}`);
      }
    },
      React.createElement('h3', { 
        style: { margin: '0 0 12px 0', fontSize: '16px' } 
      }, 'Preferences'),
      
      React.createElement(Checkbox, {
        checked: formData.newsletter,
        onChange: (checked) => handleChange('newsletter', checked),
        name: 'newsletter'
      }, 'Subscribe to newsletter'),
      
      React.createElement(Checkbox, {
        checked: formData.notifications,
        onChange: (checked) => handleChange('notifications', checked),
        name: 'notifications'
      }, 'Enable notifications'),
      
      React.createElement(Checkbox, {
        checked: formData.marketing,
        onChange: (checked) => handleChange('marketing', checked),
        name: 'marketing'
      }, 'Receive marketing emails'),
      
      React.createElement(Checkbox, {
        checked: formData.terms,
        onChange: (checked) => handleChange('terms', checked),
        required: true,
        name: 'terms'
      }, React.createElement('span', {},
        'I agree to the ',
        React.createElement('a', { 
          href: '#', 
          style: { color: '#1890ff' }
        }, 'Terms of Service'),
        ' *'
      )),
      
      React.createElement('button', {
        type: 'submit',
        disabled: !formData.terms,
        style: {
          padding: '8px 16px',
          backgroundColor: formData.terms ? '#1890ff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: formData.terms ? 'pointer' : 'not-allowed',
          marginTop: '8px'
        }
      }, 'Submit')
    );
  },
};

export const CustomStyling: Story = {
  args: {},
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  },
    React.createElement(Checkbox, {
      defaultChecked: true,
      style: {
        '--edifly-color-primary': '#52c41a'
      } as React.CSSProperties
    }, 'Success color checkbox'),
    
    React.createElement(Checkbox, {
      defaultChecked: true,
      style: {
        '--edifly-color-primary': '#faad14'
      } as React.CSSProperties
    }, 'Warning color checkbox'),
    
    React.createElement(Checkbox, {
      defaultChecked: true,
      style: {
        '--edifly-color-primary': '#ff4d4f'
      } as React.CSSProperties
    }, 'Danger color checkbox')
  ),
};