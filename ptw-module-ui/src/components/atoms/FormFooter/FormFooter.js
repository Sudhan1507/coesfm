import React from 'react';
import '../FormFooter/FormFooter.css';
import Button from '../Button/Button';

const FormFooter = ({ onSave, onCancel, saveLabel, cancelLabel }) => {
  return (
    <>
    <div className="form-actions">
      <div className='form-actions-button'>
        <Button type="button" label={saveLabel} size='small' variant='success' onClick={onSave}/>
        <Button type="button" label={cancelLabel} size='small' variant='cancel' onClick={onCancel}/>
      </div>
    </div>
    </>
  );
};

export default FormFooter;
