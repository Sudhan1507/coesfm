import React from 'react';
import './Button.css';

const Button = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon: Icon,
  iconSize,
  ...props
}) => {
  return (
    <button
      className={`btn-${variant} btn-${size}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon className="btn-icon" style={{ fontSize: iconSize }} />}
      {label}
    </button>
  );
};

export default Button;
