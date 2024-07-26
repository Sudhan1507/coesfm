import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import '../ApprovalFlow/NewFlow.css';
import React, { useState, useEffect } from "react";
// import {useHistory} from "react-router-dom";
import Form from "../../../molecules/Form/Form";
import FormFooter from "../../../atoms/FormFooter/FormFooter";
import FormHeader from "../../../atoms/FormHeader/FormHeader";
import Button from "../../../atoms/Button/Button";


const NewFlow = ({ onSave, onCancel,showAlert }) => {
    const [validationError, setValidationError] = useState({});
    const [account, setAccount] = useState([]);
    const [flowDetails, setFlowDetails] = useState({
        flowName: '',
        steps: [{ statusName: '', declaration: '', accId: null }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/account/names`);
                setAccount(response.data.map(item => ({ value: item.accId, label: item.accName })));
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const handleClear = () => {
        setFlowDetails({
            flowName: '',
            steps: [{ statusName: '', declaration: '', accId: null }]
        });
        setValidationError({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlowDetails({
            ...flowDetails,
            [name]: value
        });
    };

    const handleStepChange = (index, e) => {
        const { name, value } = e.target;
        const newSteps = [...flowDetails.steps];
        newSteps[index][name] = value;
        setFlowDetails({
            ...flowDetails,
            steps: newSteps
        });
    };

    const handleAddStep = () => {
        setFlowDetails({
            ...flowDetails,
            steps: [...flowDetails.steps, { statusName: '', declaration: '', accId: null }]
        });
    };

    const handleRemoveStep = (index) => {
        const newSteps = flowDetails.steps.filter((_, stepIndex) => stepIndex !== index);
        setFlowDetails({
            ...flowDetails,
            steps: newSteps
        });
    };

    const handleInsertStep = (index) => {
        const newSteps = [...flowDetails.steps];
        newSteps.splice(index + 1, 0, { statusName: '', declaration: '', accId: null });
        setFlowDetails({
            ...flowDetails,
            steps: newSteps
        });
    };

    const validate =async () => {
        let error = {};

        if (!flowDetails.flowName.trim()) {
            error.flowName = 'Flow Name is required!';
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/flow/checkname`, {
                    params: {
                        flowName: flowDetails.flowName
                    }
                });
    
                const isUnique = response.data;
                console.log(isUnique)
    
                if (!isUnique) {
                    error.flowName = 'Flow Name must be unique!';
                }
            } catch (err) {
                console.error('Error checking flow name uniqueness:', err);
                error.flowName = 'Unable to verify flow name uniqueness. Please try again later.';
            }
        }

        flowDetails.steps.forEach((step, index) => {
            if (!step.statusName.trim()) {
                error[`step_${index}_statusName`] = 'Status Name is required!';
            }
            if (!step.declaration.trim()) {
                error[`step_${index}_declaration`] = 'Declaration is required!';
            }
        });

        setValidationError(error);
        return Object.keys(error).length === 0;
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await validate()) {
            const formData = {
                flowName: flowDetails.flowName.trim(),
                steps: flowDetails.steps.map(step => ({
                    statusName: step.statusName.trim(),
                    declaration: step.declaration.trim(),
                    accId: Number(step.accId) || null
                }))
            };

            try {
                const response = await axios.post(`http://localhost:8080/flow/add`, formData);
                console.log('Form submitted successfully:', response.data);
                handleClear();
                onSave();
                showAlert({
                    type: 'success',
                    message: `${flowDetails.flowName} has been successfully created.`,
                    duration: 3000,
                    icon: <CheckCircleOutlineIcon />
                });
                // history.push('/approvalFlow'); // Redirect to ApprovalFlow after successful submission
            } catch (err) {
                console.error('Error submitting form:', err);
                showAlert({
                    type: 'error',
                    message: 'Failed to create Approval Flow.',
                    duration: 3000,
                    icon: <ErrorOutlineOutlinedIcon />
                });
            }
        }
    };

    const handleCancel = () => {
        onCancel();
        handleClear();
      };


    return (
        <>
        <FormHeader title='Create Approval Flow'/>
        <div className='form-body'>
            <Form 
            label="Flow Name"
            name="flowName"
            type="text"
            value={flowDetails.flowName}
            onChange={handleChange}
            error={validationError.flowName} 
            required={true}
          />

            {flowDetails.steps.map((step, index) => (
                <div  key={index}>
            <Form 
            label="Status Name"
            name="statusName"
            type="text"
            value={step.statusName}
            onChange={(e) => handleStepChange(index, e)}
            error={validationError[`step_${index}_statusName`]}
            required={true}
          />
            <Form
            label="Declaration"
            type="textarea"
            name="declaration"
            value={step.declaration}
            onChange={(e) => handleStepChange(index, e)}                    
            error={validationError[`step_${index}_declaration`]}
            required={true}                       
           />

           <Form
            label="Assign To"
            type="select"                    
            name="accId"
            value={step.accId}
            onChange={(e) => handleStepChange(index, e)}
            options={account}  
            required={false} 
            />                        
            <div className="newflow-button" >              
            <Button 
            type="button" 
            variant="secondary"
            label="Remove Step"
            size="medium"
            onClick={() => handleRemoveStep(index)}
            />
            <Button
            type="button"
            variant="danger"
            label="Insert Step"
            size="medium"
            onClick={() => handleInsertStep(index)}
            />
            </div>
            </div>
            ))}
            <Button 
            type="button" 
            label="Add Step" 
            variant="primary"
            size="medium"
            onClick={handleAddStep}
            />
            </div>
            <FormFooter 
             onSave={handleSubmit}
             onCancel={handleCancel}
             saveLabel='Save'
             cancelLabel='Cancel'
            />    
            </>
    );
};

export default NewFlow;
