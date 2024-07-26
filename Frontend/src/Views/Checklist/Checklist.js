import React, { useEffect, useState } from 'react';
import Form from '../../components/molecules/Form/Form';
import FormFooter from "../../components/atoms/FormFooter/FormFooter";
import { useNavigate } from 'react-router-dom';
import '../Checklist/Checklist.css';
import axiosInstance from '../../services/service';


const Checklist = ({ptId, permitTypeName, checklistId, checklistData, onSave }) => {
  const [data, setData] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [isRemarksValid, setIsRemarksValid] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
 
  
  useEffect(() => {
    setData(checklistData);
  }, [checklistData]);

  const handleChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };
  const handleRemarksChange = (e) => {
    const value = e.target.value;
    setRemarks(value);
    setIsRemarksValid(value.trim() !== '');
    if (!value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, remarks: 'Remarks are required' }));
    } else {
      setErrors(prevErrors => {
        const { remarks, ...rest } = prevErrors;
        return rest;
      });
    }
  };


  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    // Validate remarks
    if (isRemarksValid) {
      // Prepare form data
      const formData = data.map(item => ({
        serialNo: item.serialNo,
        checkOptions: item.response,
        remarks
      }));

      const payload = {
        ptId,
        activeStatus: '1', // Example active status, replace with actual status if needed
        createdBy: 'Admin', // Example created by, replace with actual user
        responses: formData,
        statusName:'Application',
        accId:'1',
        processedAt:new Date(),
    };

      try {
        await axiosInstance.post('/ptw/addResponse', payload);
        console.log('Options updated successfully');
        handleClear(); // Clear the form on successful save
        onSave(); // Call onSave after successful update
        navigate('/permitToWork', { 
          state: { 
            showAlert: true, 
            alertType: 'success', 
            alertMessage: 'Created Permit To Work successfully', 
          }
        }); // Navigate to Permit To Work page

      } catch (error) {
        console.error('Error updating options:', error);
        navigate('/permitToWork', {
          state: {
            showAlert: true,
            alertType: 'error',
            alertMessage: 'Error Creating Permit To Work',
          }
        });
      }
    } else {
      setErrors({ remarks: 'Remarks are required' });
    }
  };

  const handleClear = () => {
    setData(checklistData.map(item => ({ ...item, response: '' })));
    setRemarks('');
    setErrors({});
    setIsRemarksValid(true);
  };

  return (
    <>
      <div className='container-header-checklist'>
        <div className='container-header-text-checklist'>
          {permitTypeName}
        </div>
        <div className='container-header-id-checklist'>
          Checklist ID: {checklistId}
        </div>
      </div>
      <div className='container-body'>
        <form  className='checklist-form'>
        <div className='checklist-table'>
        <div className='checklist-table-header'>
            <div className='checklist-header-item'>S/N</div>
            <div className='checklist-header-item'>Description</div>
            <div className='checklist-header-item'>Checks</div>
            </div>
          {data.map((item, index) => (
            <div key={item.serialNo} className='checklist-row'>
              <div className='checklist-item-serialNo'>
                {index + 1}
              </div>
              <div className='checklist-item-description'>
              {item.description}
                </div>
                <div className='checklist-item-checks'>
                <label>
                  <input 
                    type='radio' 
                    name={`response-${index}`} 
                    value='yes' 
                    checked={item.response === 'yes'}
                    onChange={() => handleChange(index, 'response', 'yes')}
                  /> Yes
                </label>
                <label>
                  <input 
                    type='radio' 
                    name={`response-${index}`} 
                    value='no' 
                    checked={item.response === 'no'}
                    onChange={() => handleChange(index, 'response', 'no')}
                  /> No
                </label>
                <label>
                  <input 
                    type='radio' 
                    name={`response-${index}`} 
                    value='na' 
                    checked={item.response === 'na'}
                    onChange={() => handleChange(index, 'response', 'na')}
                  /> N/A
                </label>
              </div>
            </div>
          ))}
          </div>
          <div className='checklist-item-remarks'>
                <Form
                  label="Remarks"
                  type="text"
                  name='Enter Remarks'
                  value={remarks}
                  onChange={handleRemarksChange}
                  required={true}
                  error={errors.remarks}
                />
              </div>
          <div className='checklist-footer'>
            <FormFooter
              onSave={handleFormSubmit}
              onCancel={() => navigate('/permitToWork')}
              saveLabel='Save'
              cancelLabel='Cancel'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Checklist;
