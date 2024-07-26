import axios from "axios";
import Form from "../../../../molecules/Form/Form";
import { useEffect, useState } from "react";
import FormFooter from "../../../../atoms/FormFooter/FormFooter";
import "../SignOff/SignOffPermit.css";

const SignOffPermit = ({ row, onClose }) => {
    const [declaration, setDeclaration] = useState('');
    const [data, setData] = useState({
        signOffRemarks: '',
        signature: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = () => {
        const formdata = {
            appId: row.appId,
            statusName: row.statusName,
            accId: row.accId,
            signOffRemarks: data.signOffRemarks,
            signature: data.signature
        };

        axios.post(`http://localhost:8080/ptw/add/signOff/${row.appId}`, formdata)
            .then((response) => {
                console.log('Sign Off Permit Submitted Successfully:', response.data);
                handleCancel();
            })
            .catch((error) => {
                console.error('Error submitting sign off permit:', error);
            });
    };

    useEffect(() => {
        const getDeclaration = async () => {
            if (!row?.appId) {
                console.log('No Application ID provided.');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/ptw/signOff/declaration/${row.appId}`);
                
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    const declarationData = response.data.data.find(item => item.appId === row.appId);
                    if (declarationData) {
                        setDeclaration(declarationData.declaration);
                    } else {
                        console.log('No declaration found for the provided Application ID.');
                    }
                } else {
                    console.log('Received data is not in the correct format.');
                }
            } catch (err) {
                console.error('Error fetching declaration:', err);
            }
        };

        getDeclaration();
    }, [row]);

    return (
        <>
        <div className="signOff-permit-wrapper">
            <div className="signoff-permit-declaration">
                <h3>Declaration</h3>
            </div>
            <div className="signoff-permit-declaration-content">
                {declaration}
            </div>
            <div className="signoff-permit-form-remarks">
            <Form 
                label="Remarks"
                name="signOffRemarks"
                type="text"
                value={data.signOffRemarks}
                onChange={handleChange}
            />
            </div>
            <div className="signoff-permit-form-signature">
            <Form 
                label="Signature"
                name="signature"
                type="text"
                value={data.signature}
                onChange={handleChange}
            />
            </div>
            <div className="signoff-permit-footer">
            <FormFooter
                onSave={handleSubmit}
                onCancel={handleCancel}
                saveLabel="Save"
                cancelLabel="Cancel"
            />
            </div>
            </div>
        </>
    );
};

export default SignOffPermit;
