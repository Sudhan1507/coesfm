import React from "react";
import './Procurement.css';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Table from '../../../components/molecules/Table/Table.jsx';
import Body from '../../../components/molecules/Body/Body.jsx';
import Button from '../../../components/atoms/Button/Button.jsx';


const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Procurement", path: "/procurement" }
];

const Procurement = () => {
  const headers = [
    { key: 'rfqId', label: 'RFQ Id' },
    { key: 'status', label: 'Status' },
    { key: 'title', label: 'Title' },
    { key: 'openDate', label: 'Open Date' },
    { key: 'closingDate', label: 'Closing Date' },
    { key: 'qoutations', label: 'Qoutations' },
    { key: 'actions', label: 'Actions' }
  ];

   const data = [

        { 'rfqId': '1', 'status': 'Open', 'title': 'Electrical', 'openDate': '12/09/2024 02:42 PM', 'closingDate': '26/09/2024','qoutations':'1'},
        { 'rfqId': '2', 'status': 'Open', 'title': 'Mechanical', 'openDate': '13/09/2024 03:53 AM', 'closingDate': '27/09/2024','qoutations':'2'},
        { 'rfqId': '3', 'status': 'Open', 'title': 'Domestic', 'openDate': '14/09/2024 04:04 PM', 'closingDate': '28/09/2024','qoutations':'3'},
        { 'rfqId': '4', 'status': 'Open', 'title': 'Mechanical', 'openDate': '15/09/2024 05:15 AM', 'closingDate': '29/09/2024','qoutations':'4'},
        { 'rfqId': '5', 'status': 'Open', 'title': 'Electrical', 'openDate': '16/09/2024 06:26 PM', 'closingDate': '30/09/2024','qoutations':'5'}

    ];

  const navigate = useNavigate();

  return (
    <>
      <Body header="Procurement" breadcrumbItems={breadcrumbItems}>
        <div className='procurement-container'>
          <div className='procurement-container-navitem'>
            <Button 
              label="Manage My Vendors"
              type="button"
              variant="primary"
              size="large"
              onClick={() => alert('Manage My Vendor')}
            />
            <Button 
              label="New RFQ"
              type="button"
              variant="success"
              icon={AddIcon}
              iconSize='20px'
              size="medium"
              onClick={() => navigate('/new-procurement')}
            />
          </div>
        </div>
        <Table 
          headers={headers} 
          data={data}
        />
      </Body>
    </>
  );
};

export default Procurement;
