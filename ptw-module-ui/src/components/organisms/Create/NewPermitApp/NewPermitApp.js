import React, { useState,useCallback,useEffect } from "react";
import Form from "../../../molecules/Form/Form";
import Layout from "../../../molecules/Layout/Layout";
import axios from "axios";
import Button from "../../../atoms/Button/Button";
import '../NewPermitApp/NewPermitApp.css';
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Checklist from "../../../../Views/Checklist/Checklist";


const NewPermitApp = () => {
  const [permitType, setPermitType] = useState("");
  const [permitTypeName,setPermitTypeName] = useState('');
  const [permitTypeOptions, setPermitTypeOptions] = useState([]);
  const [checklistId, setChecklistId] = useState(0);
  const [email, setEmail] = useState("");
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false, 
    type: '', 
    message: '', 
    duration: 3000,
    icon: null, 
  });

  const [checklistData, setChecklistData] = useState([]);
  const [errors, setErrors] = useState({
    permitType: '',
    email: ''
  });

  const handlePermitTypeChange = (e) => {
    const selectedPermitType = e.target.value;
    setPermitType(selectedPermitType);
    const selectedPermitTypeName = permitTypeOptions.find((option) => option.value === +selectedPermitType)?.label || '';
    setPermitTypeName(selectedPermitTypeName);
    const selectedChecklistId = permitTypeOptions.find((option) => option.value === +selectedPermitType)?.id || '';
    setChecklistId(selectedChecklistId);
    setIsEmailVisible(true); // Show email input and send button when a permit type is selected
    setErrors({ ...errors, permitType: '' });

     // Fetch checklist data based on selected permit type
     axios.get(`http://localhost:8080/ptw/permitType/${selectedPermitType}`)
     .then((res) => {
       if (res.data.status === "success" && Array.isArray(res.data.data)) {
         setChecklistData(res.data.data);
         console.log(res.data.data);
       } else {
         setChecklistData([]);
         showAlertHandler({
           type: "error",
           message: "Received data is not in the correct format.",
           duration: 3000,
           icon: <ErrorOutlineOutlinedIcon />,
         });
       }
     })
     .catch((err) => {
       console.error(err);
       showAlertHandler({
         type: "error",
         message: "Failed to fetch Checklist data.",
         duration: 3000,
         icon: <ErrorOutlineOutlinedIcon />,
       });
     });

  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' });

  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendEmail = () => {

    let formIsValid = true;
    let newErrors = { permitType: '', email: '' };

    if (!permitType) {
      newErrors.permitType = 'Permit Type is required';
      formIsValid = false;
    }

    if (!validateEmail(email)) {
      newErrors.email = 'Invalid email address';
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    // Construct the email content
    const emailContent = `
      Permit to Work Application: ${permitType}
      Sudhan K has sent you a Permit to Work Application: ${permitType} for completion
      Please review and complete the application at http://localhost:3000/newPermitApp/${permitType}
    `;

    // Send email via API
    axios.post(`/email/send/${3}`, {
      to: email,
      subject: "Permit to Work Application",
      text: emailContent,
    })
    .then(response => {
      alert("Email sent successfully!");
    })
    .catch(error => {
      alert("Failed to send email.");
    });
  };

  const getPermitTypeName= useCallback(() => {
    axios.get(`http://localhost:8080/ptw/permitTypeName`)
    .then((res) => {
      if (res.data.status === "success" && Array.isArray(res.data.data)) {
        setPermitTypeOptions(res.data.data.map(option => ({
          value: option.ptId,
          label: option.ptName,
          id: option.checklistId
        })));
      } else {
        setPermitTypeOptions([]);
        showAlertHandler({
            type: 'error',
            message: 'Received data is not in the correct format.',
            duration: 3000,
            icon: <ErrorOutlineOutlinedIcon />
        });
    }
})
    .catch(err => {
      console.error(err);
      showAlertHandler({
        type: 'error',
        message: 'Failed to fetch Permit Type.',
        duration: 3000,
        icon: <ErrorOutlineOutlinedIcon />
      });
    });
},[]);

useEffect(() => {
  getPermitTypeName();
}, [getPermitTypeName]);

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


const handleSubmit = (formData) => {
  console.log('Form submitted:', formData);
};


  return (
    <>
      <Layout>
        <div className='container-wrapper'>
          <div className='container-header'>
            <div className='container-header-text'>
             New Permit Application
            </div>
          </div>
          <div className='container-body'>
            <div className='container-body-newpta'>
              <div className='container-body-newpta-form'>
            <Form
              label="Permit Type"
              type="select"
              name="permitType"
              value={permitType}
              onChange={handlePermitTypeChange}
              options={permitTypeOptions}
              error={errors.permitType}
              required={true}
            />
            </div>
            <div className='container-body-newpta-email'>
            {isEmailVisible && (
              <>
              <div className="container-body-newpta-email-form">
                <Form
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  error={errors.email}
                  required={true}
                />
                </div>
                <div className="container-body-newpta-email-form-button">
                <Button 
                label='Send Email'
                variant='success'
                size="medium"
                onClick={handleSendEmail}/>
                </div>
              </>
            )}
              </div>
          </div>
        </div>
        </div>
        {permitType && (
          <Checklist
            ptId={permitType}
            permitTypeName={permitTypeName}
            checklistId={checklistId} // You may want to update this based on your actual implementation
            checklistData={checklistData}
            onSave={handleSubmit}
          />
        )}
      </Layout>
    </>
  );
};

export default NewPermitApp;
