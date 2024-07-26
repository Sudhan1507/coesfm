import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../../../molecules/Modal/Modal';

const DeleteFlow=({id,onClose,showAlert,name})=>{

    const[modalOpen,setModalOpen]=useState(true);

    const handleCloseModal=()=>{
        setModalOpen(false);
    };

    const deleteById = () => {
        axios.delete(`http://localhost:8080/flow/delete/${id}`)
            .then((res) => {
                handleCloseModal();
                showAlert({
                    type: 'success',
                    message: `${name} deleted successfully`,
                    duration: 3000,
                    icon: <CheckCircleOutlineIcon />,
                });
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || `Failed to delete ${name}`;
                showAlert({
                    type: 'error',
                    message: errorMessage,
                    duration: 3000,
                    icon: <ErrorOutlineOutlinedIcon />,
                });
            })
            .finally(() => {
                onClose();
            });
    };

    return(
        <>
        <Modal 
             open={modalOpen}
             onClose={handleCloseModal}
             title={`Do you want to delete ${name}`}
             buttons={[
                { label: 'Delete', onClick: deleteById, className: 'confirm' },
                { label: 'Cancel', onClick: handleCloseModal, className: 'cancel' }
              ]}
            >
               <p>This item will be deleted immediately. You cannot undo this action.</p>
              </Modal> 

        </>

    );
};

export default DeleteFlow;