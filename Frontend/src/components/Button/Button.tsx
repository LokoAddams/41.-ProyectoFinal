import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className = '',
  ...props
}) => {
  const btnClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  return (
    <button className={btnClass} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <span className="material-symbols-outlined animate-spin" aria-hidden="true">refresh</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className={`material-symbols-outlined ${styles.iconLeft}`} aria-hidden="true">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className={`material-symbols-outlined ${styles.iconRight}`} aria-hidden="true">{icon}</span>}
        </>
      )}
    </button>
  );
};
