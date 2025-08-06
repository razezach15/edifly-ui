import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { useState } from 'react';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    accordion: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
    ghost: {
      control: 'boolean',
    },
    expandIconPosition: {
      control: 'select',
      options: ['start', 'end'],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    key: '1',
    title: 'Getting Started',
    content: (
      <div>
        <p>Welcome to our comprehensive guide! This section covers the basic setup and installation process.</p>
        <ul>
          <li>System requirements</li>
          <li>Installation steps</li>
          <li>Initial configuration</li>
        </ul>
      </div>
    ),
  },
  {
    key: '2',
    title: 'Advanced Configuration',
    content: (
      <div>
        <p>Learn about advanced configuration options and customization.</p>
        <p>This includes environment variables, custom themes, and plugin integration.</p>
      </div>
    ),
  },
  {
    key: '3',
    title: 'Troubleshooting',
    content: (
      <div>
        <p>Common issues and their solutions:</p>
        <ol>
          <li><strong>Connection problems:</strong> Check your network settings</li>
          <li><strong>Performance issues:</strong> Clear cache and restart</li>
          <li><strong>Authentication errors:</strong> Verify your credentials</li>
        </ol>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Single: Story = {
  args: {
    items: defaultItems,
    accordion: true,
    defaultActiveKey: '1',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Ghost: Story = {
  args: {
    items: defaultItems,
    ghost: true,
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoBorder: Story = {
  args: {
    items: defaultItems,
    bordered: false,
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const IconEnd: Story = {
  args: {
    items: defaultItems,
    expandIconPosition: 'end',
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithExtra: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Basic Plan',
        content: 'Perfect for individuals and small teams just getting started.',
        extra: <span style={{ color: '#52c41a', fontWeight: 'bold' }}>$9/month</span>,
      },
      {
        key: '2',
        title: 'Pro Plan',
        content: 'Advanced features for growing businesses and professional teams.',
        extra: <span style={{ color: '#1890ff', fontWeight: 'bold' }}>$29/month</span>,
      },
      {
        key: '3',
        title: 'Enterprise Plan',
        content: 'Full-featured solution for large organizations with custom needs.',
        extra: <span style={{ color: '#722ed1', fontWeight: 'bold' }}>Contact Sales</span>,
      },
    ],
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Available Feature',
        content: 'This feature is available and can be expanded.',
      },
      {
        key: '2',
        title: 'Disabled Feature',
        content: 'This feature is currently disabled.',
        disabled: true,
      },
      {
        key: '3',
        title: 'Another Available Feature',
        content: 'This feature is also available.',
      },
    ],
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState<string[]>(['1']);
    
    return (
      <div style={{ width: '500px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          Active keys: {Array.isArray(activeKey) ? activeKey.join(', ') : activeKey}
        </div>
        <Accordion
          items={defaultItems}
          activeKey={activeKey}
          onChange={(keys) => setActiveKey(Array.isArray(keys) ? keys : [keys])}
        />
      </div>
    );
  },
};

export const CustomIcon: Story = {
  args: {
    items: defaultItems,
    expandIcon: (isActive: boolean) => (
      <span style={{ 
        fontSize: '16px',
        transition: 'transform 0.2s ease-in-out',
        transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
        color: '#1890ff'
      }}>
        ▶
      </span>
    ),
    defaultActiveKey: ['1'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FAQ: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: '600' }}>
        Frequently Asked Questions
      </h2>
      <Accordion
        items={[
          {
            key: 'q1',
            title: 'What is Edifly UI?',
            content: 'Edifly UI is a modern React component library that provides a comprehensive set of UI components for building beautiful and functional user interfaces.',
          },
          {
            key: 'q2',
            title: 'How do I install Edifly UI?',
            content: (
              <div>
                <p>You can install Edifly UI using npm or yarn:</p>
                <pre style={{ 
                  backgroundColor: '#f5f5f5', 
                  padding: '12px', 
                  borderRadius: '4px',
                  fontSize: '13px',
                  marginTop: '8px'
                }}>
                  npm install edifly-ui
                </pre>
              </div>
            ),
          },
          {
            key: 'q3',
            title: 'Is TypeScript supported?',
            content: 'Yes! Edifly UI is built with TypeScript and provides full type definitions for all components and their props.',
          },
          {
            key: 'q4',
            title: 'Can I customize the theme?',
            content: 'Absolutely! Edifly UI uses CSS variables for theming, making it easy to customize colors, fonts, spacing, and other design tokens to match your brand.',
          },
          {
            key: 'q5',
            title: 'How do I contribute?',
            content: 'We welcome contributions! Please check our GitHub repository for contribution guidelines, open issues, and development setup instructions.',
          },
        ]}
        accordion
        ghost
      />
    </div>
  ),
};