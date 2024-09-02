import React, { useState, useEffect } from 'react';
import Button from '../../../../../components/atoms/Button/Button.js';
import Form from '../../../../../components/molecules/Form/Form.js';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChecklistForm = () => {
  const { email, ptid } = useParams();
  const navigate = useNavigate();
  const decryptedEmail = atob(email); // Decrypt the base64 encoded email
  const ptId = atob(ptid);
  const [data, setData] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({});
  const [permitTypeName, setPermitTypeName] = useState("");
  const [checklistId, setChecklistId] = useState(0);
  const [isRemarksValid, setIsRemarksValid] = useState(true);

  const getPermitTypeData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/ptw/permitType/${ptId}`);
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        setData(res.data.data);
        setPermitTypeName(res.data.data[0].ptName);
        setChecklistId(res.data.data[0].checklistId);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPermitTypeData(ptId);
  }, [ptId]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isRemarksValid) {
      const formData = data.map(item => ({
        serialNo: item.serialNo,
        checkOptions: item.response,
        remarks
      }));

      const payload = {
        ptId,
        activeStatus: '1',
        email: decryptedEmail,
        responses: formData,
        statusName: 'Application',
      };

      try {
        await axios.post('http://localhost:8080/api/ptw/addResponse', payload);
        handleClear(); // Clear the form on successful save
        navigate('/success', { replace: true }); // Redirect to success page and prevent going back
      } catch (error) {
        console.error('Error updating options:', error);
      }
    } else {
      setErrors({ remarks: 'Remarks are required' });
    }
  };

  const handleClear = () => {
    setData(data.map(item => ({ ...item, response: '' })));
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
        <form className='checklist-form'>
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
                      checked={(item.response === 'na')}
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
              name='remarks'
              value={remarks}
              onChange={handleRemarksChange}
              required={true}
              error={errors.remarks}
            />
          </div>
          <div className='checklist-footer'>
            <Button
              label='Submit'
              size='small'
              variant='success'
              type='submit'
              onClick={handleFormSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChecklistForm;
