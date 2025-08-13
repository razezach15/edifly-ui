import React from 'react';

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

// Separate base HTML props from component-specific props
export interface BaseHTMLProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

// Component variant and styling props
export interface ComponentVariantProps {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
}

// Legacy support - will be deprecated
export interface ComponentProps extends BaseHTMLProps, ComponentVariantProps {
  children?: React.ReactNode;
}

// Recommended base props interface
export interface BaseComponentProps extends BaseHTMLProps {
  children?: React.ReactNode;
}

// Combined interface for components that need variants
export interface VariantComponentProps extends BaseComponentProps, ComponentVariantProps {}