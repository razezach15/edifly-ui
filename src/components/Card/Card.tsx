import React from 'react';
import { BaseComponentProps } from '../../types';
import { getComponentClasses } from '../../utils/classNames';
import './Card.css';

export interface CardProps extends BaseComponentProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  cover?: React.ReactNode;
  actions?: React.ReactNode[];
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  cover,
  actions,
  className,
  ...rest
}) => {
  const cardClasses = getComponentClasses(
    'edifly-card',
    undefined,
    undefined,
    loading,
    className
  );

  const modifierClasses = [
    bordered && 'edifly-card--bordered',
    hoverable && 'edifly-card--hoverable',
    loading && 'edifly-card--loading'
  ].filter(Boolean).join(' ');

  return (
    <div className={`${cardClasses} ${modifierClasses}`.trim()} {...rest}>
      {cover && <div className="edifly-card__cover">{cover}</div>}
      
      {(title || extra) && (
        <div className="edifly-card__header">
          {title && <div className="edifly-card__title">{title}</div>}
          {extra && <div className="edifly-card__extra">{extra}</div>}
        </div>
      )}
      
      <div className="edifly-card__body">
        {loading ? (
          <div className="edifly-card__loading">
            <div className="edifly-card__skeleton" />
            <div className="edifly-card__skeleton" />
            <div className="edifly-card__skeleton" />
          </div>
        ) : (
          children
        )}
      </div>
      
      {actions && actions.length > 0 && (
        <div className="edifly-card__actions">
          {actions.map((action, index) => (
            <div key={index} className="edifly-card__action">
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};