import React, { forwardRef, useState } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  validateMinLength?: number;
  iconFilled?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  icon,
  iconFilled,
  error,
  validateMinLength,
  className = '',
  onChange,
  ...props
}, ref) => {
  const [internalError, setInternalError] = useState<string | undefined>(error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateMinLength) {
      if (e.target.value.length < validateMinLength && e.target.value.length > 0) {
        setInternalError(`Debe tener al menos ${validateMinLength} caracteres.`);
      } else {
        setInternalError(undefined);
      }
    }
    if (onChange) onChange(e);
  };

  React.useEffect(() => {
    if (error !== undefined) setInternalError(error);
  }, [error]);

  const hasError = !!internalError;
  const inputContainerClass = `${styles.inputContainer} ${hasError ? styles.hasError : ''}`;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.labelWrapper}>
        <label className={styles.label} htmlFor={props.id || props.name}>{label}</label>
        {props.type === 'password' && (
          <a href="#" className={styles.forgotLink}>¿Olvidaste tu contraseña?</a>
        )}
      </div>
      
      <div className={inputContainerClass}>
        <input 
          ref={ref}
          className={styles.input} 
          onChange={handleChange}
          {...props} 
        />
        {icon && (
          <span 
            className={`material-symbols-outlined ${styles.icon}`} 
            style={iconFilled ? {fontVariationSettings: "'FILL' 1"} : {}}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </div>
      
      {hasError && (
        <p className={styles.errorMessage}>
          <span className={`material-symbols-outlined ${styles.errorIcon}`} aria-hidden="true">error</span>
          {internalError}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
