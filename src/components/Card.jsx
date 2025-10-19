import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 */
const Card = ({ 
  children, 
  className = '', 
  title = '', 
  footer = null,
  variant = 'default',
  ...rest 
}) => {
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800',
    primary: 'bg-blue-50 dark:bg-blue-900',
    success: 'bg-green-50 dark:bg-green-900',
    warning: 'bg-yellow-50 dark:bg-yellow-900',
    danger: 'bg-red-50 dark:bg-red-900',
  };

  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'danger']),
};

export default Card;