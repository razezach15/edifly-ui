import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import React from 'react';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    alt: 'User avatar',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    fallback: 'Jane Smith',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    fallback: 'JS',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    fallback: 'JD',
  },
};

export const CustomSize: Story = {
  args: {
    size: 60,
    fallback: 'AB',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    fallback: 'SQ',
  },
};

export const SquareWithImage: Story = {
  args: {
    shape: 'square',
    src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
    alt: 'Square avatar',
  },
};

export const WithIcon: Story = {
  args: {
    icon: React.createElement('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      style: { width: '100%', height: '100%' }
    }, React.createElement('path', {
      d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
    })),
  },
};

export const Clickable: Story = {
  args: {
    fallback: 'CL',
    onClick: () => alert('Avatar clicked!'),
  },
};

export const AllSizes: Story = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, 
    React.createElement(Avatar, { size: 'small', fallback: 'S' }),
    React.createElement(Avatar, { size: 'medium', fallback: 'M' }),
    React.createElement(Avatar, { size: 'large', fallback: 'L' }),
    React.createElement(Avatar, { size: 48, fallback: '48' }),
    React.createElement(Avatar, { size: 64, fallback: '64' })
  ),
};

export const AllShapes: Story = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  },
    React.createElement(Avatar, { 
      shape: 'circle', 
      fallback: 'C',
      size: 'large'
    }),
    React.createElement(Avatar, { 
      shape: 'square', 
      fallback: 'S',
      size: 'large'
    })
  ),
};

export const WithImages: Story = {
  render: () => {
    const images = [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1494790108755-2616c96d3877?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face',
    ];
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }
    }, ...images.map((src, index) =>
      React.createElement(Avatar, {
        key: index,
        src,
        alt: `User ${index + 1}`,
        size: 'large'
      })
    ));
  },
};

export const FallbackDemo: Story = {
  render: () => {
    const users = [
      'John Doe',
      'Jane Smith', 
      'Bob Wilson',
      'Alice Johnson',
      'Mike Brown',
      'Sarah Davis'
    ];
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap'
      }
    }, ...users.map((name, index) =>
      React.createElement(Avatar, {
        key: index,
        fallback: name,
        size: 'large'
      })
    ));
  },
};

export const UserGroup: Story = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  },
    React.createElement(Avatar, {
      src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      size: 'large'
    }),
    React.createElement(Avatar, {
      src: 'https://images.unsplash.com/photo-1494790108755-2616c96d3877?w=100&h=100&fit=crop&crop=face',
      size: 'large'
    }),
    React.createElement(Avatar, {
      fallback: 'JD',
      size: 'large'
    }),
    React.createElement(Avatar, {
      fallback: '+5',
      size: 'large',
      style: {
        backgroundColor: '#f0f0f0',
        color: '#666'
      }
    })
  ),
};

export const LoadingStates: Story = {
  render: () => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    
    React.useEffect(() => {
      const timer = setTimeout(() => setImageLoaded(true), 2000);
      return () => clearTimeout(timer);
    }, []);
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }
    },
      React.createElement(Avatar, {
        src: imageLoaded ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' : undefined,
        fallback: 'Loading...',
        size: 'large'
      }),
      React.createElement('span', {}, 'Image will load after 2 seconds')
    );
  },
};

export const CustomContent: Story = {
  args: {
    children: React.createElement('span', { style: { fontSize: '12px' } }, '🎉'),
    size: 'large',
  },
};

export const ClickableGroup: Story = {
  render: () => {
    const users = [
      { name: 'John', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { name: 'Jane', image: 'https://images.unsplash.com/photo-1494790108755-2616c96d3877?w=100&h=100&fit=crop&crop=face' },
      { name: 'Bob', fallback: 'Bob Wilson' },
      { name: 'Alice', fallback: 'Alice Johnson' },
    ];
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }
    }, ...users.map((user, index) =>
      React.createElement(Avatar, {
        key: index,
        src: user.image,
        fallback: user.fallback,
        onClick: () => alert(`Clicked ${user.name}`),
        size: 'large'
      })
    ));
  },
};