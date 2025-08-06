import React from 'react';
import { BaseComponentProps, Size } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Avatar.css';

export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends BaseComponentProps {
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

  const avatarClasses = getComponentClasses(
    'edifly-avatar',
    undefined,
    typeof size === 'string' ? size : undefined,
    undefined,
    className
  );

  const modifierClasses = [
    shape === 'square' && 'edifly-avatar--square',
    onClick && 'edifly-avatar--clickable'
  ].filter(Boolean).join(' ');

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
          className="edifly-avatar__image"
          src={src}
          alt={alt || 'Avatar'}
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable={draggable}
        />
      );
    }

    if (children) {
      return <span className="edifly-avatar__content">{children}</span>;
    }

    if (icon) {
      return <span className="edifly-avatar__icon">{icon}</span>;
    }

    if (fallback) {
      const initials = getInitials(fallback);
      return (
        <span className="edifly-avatar__text">
          {initials || fallback.charAt(0).toUpperCase()}
        </span>
      );
    }

    return (
      <span className="edifly-avatar__default">
        <svg
          className="edifly-avatar__default-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </span>
    );
  };

  return (
    <div
      className={`${avatarClasses} ${modifierClasses}`.trim()}
      style={avatarStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e as any);
        }
      } : undefined}
      {...rest}
    >
      {imageLoading && (
        <div className="edifly-avatar__loading">
          <div className="edifly-avatar__spinner" />
        </div>
      )}
      {renderContent()}
    </div>
  );
};