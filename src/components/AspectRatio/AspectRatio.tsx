import React from 'react';
import { BaseComponentProps } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './AspectRatio.css';

export interface AspectRatioProps extends BaseComponentProps {
  ratio?: number;
  width?: number;
  height?: number;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
}

export const AspectRatio: React.FC<AspectRatioProps> = ({
  ratio,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  className,
  children,
  style,
  ...rest
}) => {
  // Calculate aspect ratio
  const aspectRatio = React.useMemo(() => {
    if (ratio) return ratio;
    if (width && height) return width / height;
    return 16 / 9; // Default to 16:9
  }, [ratio, width, height]);

  const containerClasses = getComponentClasses(
    'edifly-aspect-ratio',
    undefined,
    undefined,
    undefined,
    className
  );

  const containerStyle: React.CSSProperties = {
    ...style,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
  };

  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      {...rest}
    >
      <div
        className="edifly-aspect-ratio__spacer"
        style={{ paddingBottom }}
      />
      <div className="edifly-aspect-ratio__content">
        {children}
      </div>
    </div>
  );
};

// Predefined aspect ratio constants for common use cases
AspectRatio.RATIOS = {
  SQUARE: 1,
  PORTRAIT_3_4: 3 / 4,
  PORTRAIT_2_3: 2 / 3,
  PORTRAIT_9_16: 9 / 16,
  LANDSCAPE_4_3: 4 / 3,
  LANDSCAPE_3_2: 3 / 2,
  LANDSCAPE_16_9: 16 / 9,
  LANDSCAPE_21_9: 21 / 9,
  GOLDEN: 1.618,
  A4: 210 / 297,
} as const;