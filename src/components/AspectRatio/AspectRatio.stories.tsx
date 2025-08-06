import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from './AspectRatio';
import React from 'react';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'number',
      description: 'Custom aspect ratio (width/height)',
    },
    width: {
      control: 'number',
      description: 'Width for calculating ratio (used with height)',
    },
    height: {
      control: 'number',
      description: 'Height for calculating ratio (used with width)',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width constraint',
    },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: AspectRatio.RATIOS.LANDSCAPE_16_9,
    maxWidth: '400px',
    children: React.createElement('div', {
      className: 'edifly-aspect-ratio__placeholder'
    }, '16:9 Aspect Ratio'),
  },
};

export const WithImage: Story = {
  args: {
    ratio: AspectRatio.RATIOS.LANDSCAPE_16_9,
    maxWidth: '500px',
    children: React.createElement('img', {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop',
      alt: 'Beautiful landscape'
    }),
  },
};

export const Square: Story = {
  args: {
    ratio: AspectRatio.RATIOS.SQUARE,
    maxWidth: '300px',
    children: React.createElement('img', {
      src: 'https://images.unsplash.com/photo-1494790108755-2616c96d3877?w=400&h=400&fit=crop',
      alt: 'Square image'
    }),
  },
};

export const Portrait: Story = {
  args: {
    ratio: AspectRatio.RATIOS.PORTRAIT_3_4,
    maxWidth: '300px',
    children: React.createElement('img', {
      src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop',
      alt: 'Portrait image'
    }),
  },
};

export const WithVideo: Story = {
  args: {
    ratio: AspectRatio.RATIOS.LANDSCAPE_16_9,
    maxWidth: '600px',
    children: React.createElement('iframe', {
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      title: 'YouTube video player',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: true
    }),
  },
};

export const CustomRatio: Story = {
  args: {
    ratio: 2.5,
    maxWidth: '500px',
    children: React.createElement('div', {
      style: {
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
      }
    }, 'Custom 2.5:1 Ratio'),
  },
};

export const GoldenRatio: Story = {
  args: {
    ratio: AspectRatio.RATIOS.GOLDEN,
    maxWidth: '400px',
    children: React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      }
    }, React.createElement('span', {}, 'Golden Ratio', React.createElement('br'), '1.618:1')),
  },
};

export const WithDimensions: Story = {
  args: {
    width: 800,
    height: 600,
    maxWidth: '400px',
    children: React.createElement('div', {
      style: {
        background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      }
    }, React.createElement('span', {}, '800×600', React.createElement('br'), '(4:3 ratio)')),
  },
};

export const ResponsiveGallery: Story = {
  render: () => {
    const containerStyle = { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '800px'
    };
    
    const images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&h=400&fit=crop'
    ];
    
    return React.createElement('div', { style: containerStyle },
      ...images.map((src, index) =>
        React.createElement(AspectRatio, {
          key: index,
          ratio: AspectRatio.RATIOS.SQUARE
        }, React.createElement('img', {
          src,
          alt: `Square ${index + 1}`
        }))
      )
    );
  },
};

export const AllRatios: Story = {
  render: () => {
    const ratios = [
      { name: 'Square (1:1)', ratio: AspectRatio.RATIOS.SQUARE },
      { name: 'Portrait 3:4', ratio: AspectRatio.RATIOS.PORTRAIT_3_4 },
      { name: 'Portrait 9:16', ratio: AspectRatio.RATIOS.PORTRAIT_9_16 },
      { name: 'Landscape 4:3', ratio: AspectRatio.RATIOS.LANDSCAPE_4_3 },
      { name: 'Landscape 16:9', ratio: AspectRatio.RATIOS.LANDSCAPE_16_9 },
      { name: 'Golden Ratio', ratio: AspectRatio.RATIOS.GOLDEN },
    ];

    const containerStyle = { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '1000px'
    };

    return React.createElement('div', { style: containerStyle },
      ...ratios.map((item, index) =>
        React.createElement('div', { key: index },
          React.createElement('h4', {
            style: { 
              margin: '0 0 8px 0', 
              fontSize: '14px', 
              fontWeight: '500',
              textAlign: 'center'
            }
          }, item.name),
          React.createElement(AspectRatio, {
            ratio: item.ratio
          }, React.createElement('div', {
            style: {
              background: `hsl(${index * 60}, 70%, 60%)`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              textAlign: 'center',
            }
          }, item.ratio.toFixed(3)))
        )
      )
    );
  },
};

export const WithConstraints: Story = {
  args: {
    ratio: AspectRatio.RATIOS.LANDSCAPE_16_9,
    maxWidth: '600px',
    minWidth: '300px',
    children: React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        textAlign: 'center',
      }
    }, React.createElement('span', {}, 'Constrained Size', React.createElement('br'), 'Max: 600px, Min: 300px')),
  },
};

export const PlaceholderStates: Story = {
  render: () => {
    const containerStyle = { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      maxWidth: '600px'
    };
    
    return React.createElement('div', { style: containerStyle },
      React.createElement(AspectRatio, {
        ratio: AspectRatio.RATIOS.SQUARE
      }, React.createElement('div', {
        className: 'edifly-aspect-ratio__placeholder'
      }, 'Empty Placeholder')),
      
      React.createElement(AspectRatio, {
        ratio: AspectRatio.RATIOS.LANDSCAPE_16_9
      }, React.createElement('div', {
        className: 'edifly-aspect-ratio__placeholder',
        style: { cursor: 'pointer' },
        onClick: () => alert('Clicked!')
      }, React.createElement('span', {}, 'Clickable Placeholder', React.createElement('br'), React.createElement('small', {}, 'Click me!')))),
      
      React.createElement(AspectRatio, {
        ratio: AspectRatio.RATIOS.PORTRAIT_3_4
      }, React.createElement('div', {
        className: 'edifly-aspect-ratio__placeholder'
      }, React.createElement('span', {}, 'Portrait', React.createElement('br'), 'Placeholder')))
    );
  },
};