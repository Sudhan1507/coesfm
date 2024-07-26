import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Button from "../../../../atoms/Button/Button";
import "../ViewChecklist/ViewChecklist.css";
import Form from "../../../../molecules/Form/Form";

const ViewChecklist = ({ row, onClose }) => {
    const [data, setData] = useState([]);
    const [fields, setFields] = useState({
        cName: '',
        checklistId: '',
        remarks: '',
        createdOn: ''
    });

    const handleCancel = () => {
        onClose();
    };

    const headers = [
        { key: 'serialNo', label: 'S/N' },
        { key: 'description', label: 'Description' },
        { key: 'checkOptions', label: 'Checks' }
    ];

    const getChecklistData = useCallback(async () => {
        if (row && row.appId) {
            try {
                const response = await axios.get(`http://localhost:8080/ptw/checklistResponse/${row.appId}`);
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    const fetchedData = response.data.data;
                    setData(fetchedData);
                    if (fetchedData.length > 0) {
                        setFields({
                            cName: fetchedData[0].cName,
                            checklistId: fetchedData[0].checklistId,
                            remarks: fetchedData[0].remarks,
                            createdOn: fetchedData[0].createdOn
                        });
                    }
                } else {
                    console.log('No checklist data found for the provided Application ID.');
                }
            } catch (err) {
                console.error('Error fetching checklist data:', err);
            }
        }
    }, [row]); // Added row.appId to dependencies

    useEffect(() => {
        getChecklistData();
    }, [getChecklistData]); // Ensure getChecklistData is included as a dependency

    // Internal Table component
    const Table = ({ data, headers, style, font, color, alignment }) => (
        <table className={`table ${style}`}>
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header.key} style={{ textAlign: alignment }}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {headers.map(header => (
                            <td
                                key={header.key}
                                style={{ textAlign: alignment, color: color, fontFamily: font }}
                            >
                                {item[header.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
        <div className="view-checklist-wrapper">
        <div className="view-checklist-title">
            <div className="view-checklist-title-text">
                {fields.cName}
            </div>
        </div>
         <div className="view-checklist-title-item">
            <div className="view-checklist-title-content">
                <span className="view-checklist-title-content-text">Checklist ID</span>
                <span className="view-checklist-title-content-text-id">{fields.checklistId}</span>
            </div>
            <div className="view-checklist-title-content">
                <span className="view-checklist-title-content-text">Created at</span>
                <span className="view-checklist-title-content-text-id">{fields.createdOn}</span>
            </div>
        </div>
        <div className="view-checklist-content-table">
            
            <Table
                data={data}
                headers={headers}
                style="custom-table-style"
                font="Arial, sans-serif"
                color="black"
                alignment="left"
            />
            </div>
            <div className="view-checklist-form">
           <Form
           type='text'
           label='Remarks'
           readOnly={true}
           disabled={true}
           value={fields.remarks}
           />
           </div>
           <div className="view-checklist-footer">
            <Button
                label='Close'
                variant="cancel"
                size="small"
                onClick={handleCancel}
            />
            </div>
            </div>
        </>
    );
};

export default ViewChecklist;
