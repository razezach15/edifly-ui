import React from 'react';

export type Size = 'small' | 'medium' | 'large';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type ComponentProps = {
  className?: string;
  size?: Size;
  disabled?: boolean;
  children?: React.ReactNode;
};

export interface BaseComponentProps extends ComponentProps {
  id?: string;
  'data-testid'?: string;
  style?: React.CSSProperties;
}