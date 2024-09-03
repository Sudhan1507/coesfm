import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from '../../../../../components/molecules/Form/Form';
import Button from '../../../../../components/atoms/Button/Button';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Alert from '../../../../../components/atoms/Alert/Alert';

const ChecklistForm = () => {
  const { email, ptid, token } = useParams();  // Extract token from URL
  const navigate = useNavigate();
  const decryptedEmail = atob(email); // Decrypt the base64 encoded email
  const ptId = atob(ptid);

  const [data, setData] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({});
  const [permitTypeName, setPermitTypeName] = useState("");
  const [checklistId, setChecklistId] = useState(0);
  const [isRemarksValid, setIsRemarksValid] = useState(true);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    message: '',
    duration: 3000,
    icon: null,
  });

  

  const getPermitTypeData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/ptw/permitType/${ptId}/${token}`);
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        setData(res.data.data);
        setPermitTypeName(res.data.data[0].ptName);
        setChecklistId(res.data.data[0].checklistId);
      } else {
        if(res.data.status === "Invalid"){
          showAlertHandler({
            type: 'error',
            message: 'This checklist has already been submitted.',
            duration: 3000,
            icon: <ErrorOutlineOutlinedIcon />
          });
          
        setData([]);
        }
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
        token,  // Use the token in the payload
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

   // Function to show an alert
   const showAlertHandler = ({ type, message, duration, icon }) => {
    setShowAlert({
      show: true,
      type,
      message,
      duration,
      icon
    });
    setTimeout(() => {
      setShowAlert({
        show: false,
        type: '',
        message: '',
        duration: 3000,
        icon: null,
      });
    }, duration);
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

      {showAlert.show && (
        <Alert type={showAlert.type} message={showAlert.message} duration={showAlert.duration} icon={showAlert.icon} />
      )}   
    </>
  );
};

export default ChecklistForm;
