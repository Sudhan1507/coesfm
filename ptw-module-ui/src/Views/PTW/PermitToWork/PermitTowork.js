import Layout from "../../../components/molecules/Layout/Layout";
import Table from "../../../components/molecules/Table/Table";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import '../PermitToWork/PermitToWork.css';
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import SignOffPermit from "../../../components/organisms/Create/PermitToWorkFunctions/SignOff/SignOffPermit";
import FormHeader from "../../../components/atoms/FormHeader/FormHeader";
import Drawer from "../../../components/molecules/Drawer/Drawer";
import Button from "../../../components/atoms/Button/Button";
import Tooltip from "../../../components/atoms/Tooltip/Tooltip";
import ViewChecklist from "../../../components/organisms/Create/PermitToWorkFunctions/ViewChecklist/ViewChecklist";
import SignOffHistory from "../../../components/organisms/Create/PermitToWorkFunctions/SignOffHistory/SignOffHistory";


const PermitToWork = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerContent, setDrawerContent] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    message: '',
    duration: 3000,
    icon: null,
  });

  const handleOpenDrawer = (title, selectedRow) => {
    setDrawerTitle(title);
    setDrawerContent(getDrawerContentComponent(title,selectedRow));
    setDrawerOpen(true);
  };

  

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    getPermitToWorkIndex();
    setDrawerTitle("");
    setDrawerContent(null);
  };


  const getDrawerContentComponent = (title,selectedRow ) => {
    switch (title) {
      case 'View':
        return <ViewChecklist row={selectedRow} onClose={handleCloseDrawer} />;
      case 'Sign Off':
        return  <SignOffPermit row={selectedRow} onClose={handleCloseDrawer} />;
      // case 'Request Change':
      //   return <RequestChangeContent />;
      // case 'Assign To':
      //   return <AssignToContent />;
      case 'History':
        return <SignOffHistory row={selectedRow} onClose={handleCloseDrawer} />;
      // case 'Generate PDF':
      //   return <GeneratePDFContent />;
      // case 'Cancel':
      //   return <CancelContent />;
      // case 'Delete':
      //   return <DeleteContent />;
      default:
        return null;
    }
  };

  const getActionCell = (row) => {
    return (
      <div className='ptw-actions-icon'>
        <Tooltip text='View' position='top'>
          <VisibilityOutlinedIcon onClick={() =>{ 
             handleOpenDrawer('View', row)
          }}/>
        </Tooltip>
        <Tooltip text='Sign Off' position='top'>
          <CheckCircleOutlineSharpIcon onClick={() =>{ 
             handleOpenDrawer('Sign Off', row);
          }} />
        </Tooltip>
        <Tooltip text='Request Change' position='top'>
          <SyncOutlinedIcon onClick={() => handleOpenDrawer('Request Change')} />
        </Tooltip>
        <Tooltip text='Assign To' position='top'>
          <GroupAddOutlinedIcon onClick={() => handleOpenDrawer('Assign To')} />
        </Tooltip>
        <Tooltip text='History' position='top'>
          <UpdateOutlinedIcon onClick={() => handleOpenDrawer('History',row)} />
        </Tooltip>
        <Tooltip text='Generate PDF' position='top'>
          <PictureAsPdfOutlinedIcon onClick={() => handleOpenDrawer('Generate PDF')} />
        </Tooltip>
        <Tooltip text='Cancel' position='top'>
          <DoNotDisturbIcon onClick={() => handleOpenDrawer('Cancel')} />
        </Tooltip>
        <Tooltip text='Delete' position='top'>
          <DeleteOutlineSharpIcon onClick={() => handleOpenDrawer('Delete')} />
        </Tooltip>
      </div>
    );
  };

  const headers = [
    { key: 'appId', label: 'Application Id', sortable: true },
    { key: 'ptName', label: 'Permit Type', sortable: true },
    { key: 'statusName', label: 'Status', sortable: true },
    { key: 'accName', label: 'Assigned To', sortable: true },
    { key: 'updatedOn', label: 'Last Updated At', sortable: true },
    { key: null, label: 'Actions', renderer: getActionCell }
  ];

  const showAlertHandler = useCallback(({ type, message, duration, icon }) => {
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
  }, []);

  const getPermitToWorkIndex = useCallback(() => {
    axios.get('http://localhost:8080/ptw/index')
      .then((res) => {
        if (res.data.status === "success" && Array.isArray(res.data.data)) {
          setData(res.data.data);
        } else {
          setData([]);
          showAlertHandler({
            type: 'error',
            message: 'Received data is not in the correct format.',
            duration: 3000,
            icon: <ErrorOutlineOutlinedIcon />
          });
        }
      })
      .catch(err => {
        showAlertHandler({
          type: 'error',
          message: 'Failed to fetch Permit To Work.',
          duration: 3000,
          icon: <ErrorOutlineOutlinedIcon />
        });
      });
  }, [showAlertHandler]);

  useEffect(() => {
    getPermitToWorkIndex();
  }, [getPermitToWorkIndex]);

  return (
    <>
      <Layout>
        <div className='container-wrapper'>
          <div className='container-header'>
            <div className='container-header-text'>
              Permit to Work
            </div>
          </div>
          <div className='container-body'>
            <div className='container-body-nav'>
              <Button 
                label='New Permit Application'
                icon={AddIcon}
                iconSize='1rem'
                variant="success"
                type="button"
                size="large"
                onClick={() => navigate('/newPermitApp')}
              />
              <Button
                label='Manage Permit Types'
                variant="primary"
                type='button'
                size="large"
                onClick={() => navigate('/managePTW')}
              />
              <Drawer
              
                direction='fromRight'
                open={drawerOpen}
                onClose={handleCloseDrawer}
                size='800px'
              >
                <FormHeader title={drawerTitle} />
                {drawerContent}
              </Drawer>
            </div>
            <Table data={data} headers={headers} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PermitToWork;
