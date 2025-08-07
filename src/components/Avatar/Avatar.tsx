import React from 'react';
import { BaseComponentProps, Size } from '../../types';
import { cn } from '../../utils/classNames';

export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends Omit<BaseComponentProps, 'size'> {
  size?: Size | number;
  shape?: AvatarShape;
  src?: string;
  alt?: string;
  icon?: React.ReactNode;
  fallback?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  draggable?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'medium',
  shape = 'circle',
  src,
  alt,
  icon,
  fallback,
  onClick,
  draggable = false,
  className,
  children,
  style,
  ...rest
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(Boolean(src));

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const getInitials = (name: string): string => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getSizeValue = (sizeValue: Size | number): string => {
    if (typeof sizeValue === 'number') {
      return `${sizeValue}px`;
    }
    
    const sizeMap = {
      small: '24px',
      medium: '32px',
      large: '40px',
    };
    
    return sizeMap[sizeValue];
  };

  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm', 
    large: 'w-12 h-12 text-base'
  };

  const avatarClasses = cn(
    // Base styles
    'inline-flex items-center justify-center font-medium text-white overflow-hidden',
    'bg-gray-500 transition-colors',
    // Shape
    shape === 'circle' ? 'rounded-full' : 'rounded-lg',
    // Size
    typeof size === 'string' ? sizeClasses[size] : '',
    // Interactive
    onClick && 'cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    className
  );

  const avatarStyle: React.CSSProperties = {
    ...style,
    ...(typeof size === 'number' && {
      width: getSizeValue(size),
      height: getSizeValue(size),
      fontSize: `${size * 0.45}px`,
    }),
  };

  const renderContent = () => {
    // Priority: src image > children > icon > fallback initials > fallback letter
    if (src && !imageError) {
      return (
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt || 'Avatar'}
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable={draggable}
        />
      );
    }

    if (children) {
      return <span>{children}</span>;
    }

    if (icon) {
      return <span className="flex items-center justify-center">{icon}</span>;
    }

    if (fallback) {
      const initials = getInitials(fallback);
      return (
        <span className="font-medium">
          {initials || fallback.charAt(0).toUpperCase()}
        </span>
      );
    }

    return (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    );
  };

  return (
    <div
      className={avatarClasses}
      style={avatarStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      } : undefined}
      {...rest}
    >
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      )}
      {renderContent()}
    </div>
  );
};