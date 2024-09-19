import React, { useEffect, useState, useCallback } from "react";
import './Procurement.css';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Table from '../../../components/molecules/Table/Table.jsx';
import Body from '../../../components/molecules/Body/Body.jsx';
import Button from '../../../components/atoms/Button/Button.jsx';
import axiosInstance from '../../../services/service.jsx';

const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Procurement", path: "/procurement" }
];

const Procurement = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const headers = [
    { key: 'rfqId', label: 'RFQ Id' },
    { key: 'status', label: 'Status' },
    { key: 'title', label: 'Title' },
    { key: 'openDate', label: 'Open Date' },
    { key: 'closingDate', label: 'Closing Date' },
    { key: 'quotations', label: 'Quotations' },  // Corrected "qoutations" to "quotations"
    { key: 'actions', label: 'Actions' }
  ];

  const getProcurementIndex = useCallback(async () => {
    try {
      const result = await axiosInstance.get(`/api/procurement/index`);
      if (result.data.status === 'success' && Array.isArray(result.data.data)) {
        setData(result.data.data);
      } else {
        console.error('Failed to fetch procurement data');
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    getProcurementIndex();
  }, [getProcurementIndex]);

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
              onClick={() => navigate('/manage-vendors')} 
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
