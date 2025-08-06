import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bordered: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a basic card with some content. It demonstrates the default styling and layout of the Edifly Card component.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title in the header section. You can use any React node as the title.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithTitleAndExtra: Story = {
  args: {
    title: 'Card Title',
    extra: <a href="#">More</a>,
    children: 'This card has both a title and an extra element in the header.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithCover: Story = {
  args: {
    title: 'Beautiful Landscape',
    cover: (
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
        alt="Cover"
      />
    ),
    children: 'This card includes a cover image at the top. The cover can be any React element, but images are most common.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithActions: Story = {
  args: {
    title: 'Actions Card',
    children: 'This card has action buttons in the footer area.',
    actions: [
      <Button key="edit" variant="secondary" size="small">Edit</Button>,
      <Button key="delete" variant="danger" size="small">Delete</Button>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Hoverable: Story = {
  args: {
    title: 'Hoverable Card',
    hoverable: true,
    children: 'This card has hover effects enabled. Try hovering over it to see the animation.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoBorder: Story = {
  args: {
    title: 'No Border Card',
    bordered: false,
    children: 'This card has no border, giving it a cleaner look.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    title: 'Loading Card',
    loading: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const FullExample: Story = {
  args: {
    title: 'Product Card',
    extra: '$99.99',
    hoverable: true,
    cover: (
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=200&fit=crop"
        alt="Product"
      />
    ),
    children: (
      <div>
        <p><strong>Nike Air Max</strong></p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Comfortable running shoes with excellent cushioning and support.
        </p>
      </div>
    ),
    actions: [
      <Button key="cart" variant="secondary" size="small">Add to Cart</Button>,
      <Button key="buy" variant="primary" size="small">Buy Now</Button>,
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '16px',
      width: '100%',
      maxWidth: '800px'
    }}>
      <Card title="Card 1" hoverable>
        Content for the first card.
      </Card>
      <Card title="Card 2" hoverable>
        Content for the second card.
      </Card>
      <Card title="Card 3" hoverable>
        Content for the third card.
      </Card>
    </div>
  ),
};