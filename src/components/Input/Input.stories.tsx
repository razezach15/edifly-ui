import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello World',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Error input',
    errorMessage: 'This field is required',
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: 'Username',
    prefix: '@',
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: 'Enter URL',
    suffix: '.com',
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    placeholder: 'Username',
    prefix: 'https://',
    suffix: '.edifly.com',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div style={{ width: '300px' }}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled input"
        />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          Value: {value}
        </p>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
};