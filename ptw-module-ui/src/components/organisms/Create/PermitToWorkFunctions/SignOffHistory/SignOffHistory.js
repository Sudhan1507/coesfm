import { useState,useEffect , useCallback} from "react";
import Table from "../../../../molecules/Table/Table";
import axios from "axios";


const SignOffHistory=({row})=>{
    const [data,setData]=useState([]);

    const headers =[
        {key:'statusName', label:'Status'},
        {key:'accName', label:'Processed by'},
        {key:'processedAt', label:'Processed at'},
        {key:'signOff_remarks', label:'Remarks'},
        {key:'signature', label:'Signature'}
    ];

    const getSignOffHistoryData = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ptw/signOff/history/${row.appId}`);
            if (response.data.status === "success" && Array.isArray(response.data.data)) {
                setData(response.data.data);
            } else {
                console.log('No sign off history found for the provided Application ID.');
            }
        } catch (err) {
            console.error('Error fetching sign off history:',err);
        }
    }, [row.appId]);

    useEffect(() => {
        getSignOffHistoryData();
    }, [getSignOffHistoryData]);


    return(
        <>
        <Table data={data} headers={headers} />
        </>
    );
};
export default SignOffHistory;