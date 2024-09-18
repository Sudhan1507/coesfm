import React from 'react';
import Body from '../../../../molecules/Body/Body.jsx';
import Button from '../../../../atoms/Button/Button.jsx';
import './NewProcurement.css';
import Form from '../../../../molecules/Form/Form.jsx';

const breadcrumbItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Procurement", path: "/procurement" },
    // { label: "New Request For Quotation", path: '#' },
    { label: "Step 1: RFQ Information", path: "/new-procurement" }
];

const NewProcurement = () => {
    return (
        <>
            <Body header="Procurement" breadcrumbItems={breadcrumbItems}>
                <div className='newprocurement-container-nav'>
                    <Button 
                        label='Go to Step 2: Select Vendors'
                        variant='primary'
                        size='large'
                        onClick={() => { alert("Please select your fulfillment") }}
                    />
                </div>

                <div className='form-group-wrapper'>

                    <Form 
                    
                    label='Purchasing Entity'
                    type='text'
                    name='purchasing_entity'
                    required={true}
                    
                    />

                    <Form 
                    
                    label='Title'
                    type='text'
                    name='title'
                    required={true}
                    
                    />

                    <Form 
                    
                    label='Description'
                    type='textarea'
                    name='description'
                    required={true}
                    
                    />

                    <Form 
                    
                    label='Closing Date'
                    type='date'
                    name='closing_date'
                    required={true}
                    
                    />

                    <Form 
                    
                    label='Supporting Documents (Optional)'
                    type='file'
                    name='supporting_documents'
                    multiple={true}
                    required={false}
                    
                    />

                    <Form 
                    
                    label='Contact Email'
                    type='email'
                    name='contact_email'
                    required={true}
                    
                    />

                </div>
            </Body>
        </>
    );
};

export default NewProcurement;
