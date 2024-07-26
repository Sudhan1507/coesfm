import React from 'react';
import '../FormHeader/FormHeader.css';

const FormHeader = ({ title }) => {
  return (
    <div className='formheader-wrapper'>
      <div className='formheader-title'>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default FormHeader;