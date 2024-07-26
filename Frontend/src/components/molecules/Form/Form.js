import React from 'react';

const Form = ({ label, name, type, value, onChange,options, error , required,disabled, readOnly}) => {
  const renderInput = () => {
    const commonProps = {
      name,
      value,
      onChange,
      disabled,
      readOnly,
    };
    if (type === 'select') {
      return (
        <select {...commonProps} className={!value ? 'placeholder' : ''}>
          <option value="">Select {label}</option>
          {options.map((option, index) => (
            <option key={option.value || index} value={option.value} >
              {option.label}
            </option>
          ))}
        </select>
      );
    }else if (type === 'textarea') {
      return (
        <textarea
        {...commonProps}
          placeholder={`Enter ${label}`}
          // maxLength={maxLength}
        />
      );
    } 
    else if (type === 'password') {
      return (
        <input
        type={type}
        {...commonProps}
        placeholder={`Enter ${label}`}
        />
      );
    }
    else {
      return (
        <input
        type={type}
        {...commonProps}
        placeholder={`Enter ${label}`}
      />     
     );
    }
  };

  return (
    <>
    <div className="form-group">
    <label>
      {required && <span className="required">*</span>}
      {label}:
    </label>
    {renderInput()}
    {error && <span className="error">{error}</span>}
  </div>

  </>
  );
};

export default Form;