import React, { useEffect, useState, useCallback } from "react";
import './Procurement.css';
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Table from '../../../components/molecules/Table/Table.jsx';
import Body from '../../../components/molecules/Body/Body.jsx';
import Button from '../../../components/atoms/Button/Button.jsx';
import axiosInstance from '../../../services/service.jsx';
import Alert from '../../../components/atoms/Alert/Alert.jsx';
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import Tooltip from "../../../components/atoms/Tooltip/Tooltip.jsx";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NewProcurement from '../../../components/organisms/Create/Procurement_module/NewProcurement/NewProcurement.jsx'


const breadcrumbItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Procurement", path: "/procurement" }
];

const Procurement = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    message: '',
    duration: 3000,
    icon: null,
  });

  const getActionCell = () => (
    <div className='ptw-actions-icon'>
      <Tooltip text='View' position='top'>
        <VisibilityOutlinedIcon style={{ cursor: "pointer" }} onClick={() => alert('view')} />
      </Tooltip>
      <Tooltip text='History' position='top'>
        <UpdateOutlinedIcon style={{ cursor: "pointer" }} onClick={() => alert("History")} />
      </Tooltip>
    </div>
  );

  const headers = [
    { key: 'id', label: 'RFQ Id' },
    { key: 'status_name', label: 'Status' },
    { key: 'title', label: 'Title' },
    { key: 'open_date', label: 'Open Date' },
    { key: 'closing_date', label: 'Closing Date' },
    { key: 'quotation', label: 'Quotations' }, 
    { key: 'actions', label: 'Actions', renderer: getActionCell }
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

  const handleSave = () => {
    getProcurementIndex();
    showAlertHandler({
      type: 'success',
      message: 'New procurement data successfully added.',
      duration: 3000,
      icon: <CheckCircleOutlineIcon />
    });
  };

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
      <Body header="Procurement" breadcrumbItems={breadcrumbItems}>
        {/* {<NewProcurement onSave={handleSave} showAlert={showAlertHandler}  /> } */}
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
        <Table headers={headers} data={data} />
        {showAlert.show && (
          <Alert type={showAlert.type} message={showAlert.message} duration={showAlert.duration} icon={showAlert.icon} />
        )}
      </Body>
    </>
  );
};

export default Procurement;
