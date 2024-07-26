import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success','cancel']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  iconSize: PropTypes.string,

};

export default Button;
