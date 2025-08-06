import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible } from './Collapsible';
import React from 'react';

const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
    collapsible: {
      control: 'boolean',
    },
    animationDuration: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: React.createElement('div', {},
      React.createElement('p', {}, 'This is the collapsible content that can be shown or hidden.'),
      React.createElement('p', {}, 'You can put any content here - text, images, other components, etc.'),
      React.createElement('p', {}, 'The height will automatically adjust to fit the content.')
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    children: React.createElement('div', {},
      React.createElement('p', {}, 'This collapsible starts in an open state by default.'),
      React.createElement('p', {}, 'You can control the initial state with the defaultOpen prop.')
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const CustomTrigger: Story = {
  args: {
    trigger: React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontWeight: 'bold'
      }
    },
      React.createElement('span', {}, '🔍 Advanced Options'),
      React.createElement('span', { style: { fontSize: '12px' } }, 'Click to expand')
    ),
    children: React.createElement('div', {},
      React.createElement('h4', { style: { margin: '0 0 12px 0' } }, 'Advanced Settings'),
      React.createElement('label', { style: { display: 'block', marginBottom: '8px' } },
        React.createElement('input', { type: 'checkbox' }),
        ' Enable advanced mode'
      ),
      React.createElement('label', { style: { display: 'block', marginBottom: '8px' } },
        React.createElement('input', { type: 'checkbox' }),
        ' Debug logging'
      ),
      React.createElement('label', { style: { display: 'block' } },
        React.createElement('input', { type: 'checkbox' }),
        ' Experimental features'
      )
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return React.createElement('div', { style: { width: '400px' } },
      React.createElement('div', {
        style: { marginBottom: '16px', display: 'flex', gap: '8px' }
      },
        React.createElement('button', {
          onClick: () => setIsOpen(true),
          style: { 
            padding: '6px 12px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }
        }, 'Open'),
        React.createElement('button', {
          onClick: () => setIsOpen(false),
          style: { 
            padding: '6px 12px',
            backgroundColor: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }
        }, 'Close'),
        React.createElement('button', {
          onClick: () => setIsOpen(prev => !prev),
          style: { 
            padding: '6px 12px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }
        }, 'Toggle')
      ),
      React.createElement(Collapsible, {
        open: isOpen,
        onOpenChange: setIsOpen,
        trigger: React.createElement('span', {}, `Controlled Collapsible (${isOpen ? 'Open' : 'Closed'})`)
      },
        React.createElement('div', {},
          React.createElement('p', {}, 'This collapsible is controlled by external buttons.'),
          React.createElement('p', {}, `Current state: ${isOpen ? 'Open' : 'Closed'}`),
          React.createElement('p', {}, 'The state is managed by parent component.')
        )
      )
    );
  },
};

export const WithoutAnimation: Story = {
  args: {
    animated: false,
    trigger: React.createElement('span', {}, 'No Animation Collapsible'),
    children: React.createElement('div', {},
      React.createElement('p', {}, 'This collapsible does not have smooth animations.'),
      React.createElement('p', {}, 'It instantly shows/hides content.'),
      React.createElement('p', {}, 'This might be useful for accessibility or performance reasons.')
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const CustomAnimationDuration: Story = {
  args: {
    animationDuration: 800,
    trigger: React.createElement('span', {}, 'Slow Animation (800ms)'),
    children: React.createElement('div', {},
      React.createElement('p', {}, 'This collapsible has a slower animation duration.'),
      React.createElement('p', {}, 'The animation takes 800ms instead of the default 300ms.'),
      React.createElement('p', {}, 'You can customize the duration to fit your design needs.')
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const NestedContent: Story = {
  args: {
    trigger: React.createElement('span', {}, '📁 Project Folder'),
    children: React.createElement('div', {},
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement('h4', { style: { margin: '0 0 8px 0' } }, 'Files:'),
        React.createElement('ul', { style: { margin: 0, paddingLeft: '20px' } },
          React.createElement('li', {}, 'index.html'),
          React.createElement('li', {}, 'styles.css'),
          React.createElement('li', {}, 'script.js')
        )
      ),
      React.createElement(Collapsible, {
        trigger: React.createElement('span', {}, '📁 Subfolder')
      },
        React.createElement('ul', { style: { margin: 0, paddingLeft: '20px' } },
          React.createElement('li', {}, 'config.json'),
          React.createElement('li', {}, 'data.csv'),
          React.createElement('li', {}, 'readme.txt')
        )
      )
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '400px' } }, React.createElement(Story))
  ],
};

export const FAQ: Story = {
  render: () => {
    const faqs = [
      {
        question: 'What is Edifly UI?',
        answer: 'Edifly UI is a modern React component library that provides a comprehensive set of UI components for building beautiful and functional user interfaces. It includes buttons, inputs, cards, and many other components with consistent design and accessibility features.'
      },
      {
        question: 'How do I install Edifly UI?',
        answer: 'You can install Edifly UI using npm or yarn. Run "npm install edifly-ui" in your project directory. Then import the components you need in your React application.'
      },
      {
        question: 'Is TypeScript supported?',
        answer: 'Yes! Edifly UI is built with TypeScript and provides full type definitions for all components and their props. You get excellent IDE support with autocompletion and type checking.'
      },
      {
        question: 'Can I customize the theme?',
        answer: 'Absolutely! Edifly UI uses CSS variables for theming, making it easy to customize colors, fonts, spacing, and other design tokens. You can override the CSS variables to match your brand colors and design system.'
      }
    ];
    
    return React.createElement('div', { 
      style: { 
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      } 
    },
      React.createElement('h2', { 
        style: { marginBottom: '16px', fontSize: '24px' } 
      }, 'Frequently Asked Questions'),
      ...faqs.map((faq, index) =>
        React.createElement(Collapsible, {
          key: index,
          trigger: React.createElement('span', { 
            style: { fontWeight: '500' } 
          }, faq.question)
        }, React.createElement('p', { 
          style: { margin: 0, lineHeight: '1.6' } 
        }, faq.answer))
      )
    );
  },
};

export const MultipleCollapsibles: Story = {
  render: () => {
    const sections = [
      {
        title: 'Getting Started',
        content: 'Learn the basics of using our product with step-by-step guides and tutorials.',
        color: '#1890ff'
      },
      {
        title: 'Advanced Features',
        content: 'Explore advanced functionality and configuration options for power users.',
        color: '#52c41a'
      },
      {
        title: 'API Reference',
        content: 'Complete documentation of all available APIs, methods, and properties.',
        color: '#faad14'
      },
      {
        title: 'Troubleshooting',
        content: 'Common issues and their solutions to help you resolve problems quickly.',
        color: '#ff4d4f'
      }
    ];
    
    return React.createElement('div', { 
      style: { 
        width: '500px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      } 
    },
      React.createElement('h3', { 
        style: { margin: '0 0 16px 0', fontSize: '20px' } 
      }, 'Documentation Sections'),
      ...sections.map((section, index) =>
        React.createElement(Collapsible, {
          key: index,
          trigger: React.createElement('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }
          },
            React.createElement('div', {
              style: {
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: section.color
              }
            }),
            React.createElement('span', { 
              style: { fontWeight: '500' } 
            }, section.title)
          )
        }, React.createElement('p', { 
          style: { margin: 0, lineHeight: '1.6' } 
        }, section.content))
      )
    );
  },
};

export const WithRichContent: Story = {
  args: {
    trigger: React.createElement('span', {}, '🎨 Rich Content Example'),
    children: React.createElement('div', {},
      React.createElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '16px'
        }
      },
        React.createElement('div', {},
          React.createElement('h4', { style: { margin: '0 0 8px 0' } }, 'Features'),
          React.createElement('ul', { style: { margin: 0, paddingLeft: '20px' } },
            React.createElement('li', {}, 'Responsive design'),
            React.createElement('li', {}, 'Accessible components'),
            React.createElement('li', {}, 'TypeScript support')
          )
        ),
        React.createElement('div', {},
          React.createElement('h4', { style: { margin: '0 0 8px 0' } }, 'Stats'),
          React.createElement('div', { 
            style: { 
              padding: '12px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              textAlign: 'center'
            } 
          },
            React.createElement('div', { style: { fontSize: '24px', fontWeight: 'bold' } }, '25+'),
            React.createElement('div', { style: { fontSize: '12px', color: '#666' } }, 'Components')
          )
        )
      ),
      React.createElement('button', {
        style: {
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        onClick: () => alert('Button clicked!')
      }, 'Interactive Button')
    ),
  },
  decorators: [
    (Story) => React.createElement('div', { style: { width: '500px' } }, React.createElement(Story))
  ],
};