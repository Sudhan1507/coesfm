import Modal from '../../../molecules/Modal/Modal.js';
import { useState } from 'react';
import axios from 'axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const DeletePTW=({id, onClose,showAlert,name})=>{
    const [modalOpen ,setModalOpen]=useState(true);

    const handleCloseModal=()=>{
        setModalOpen(false);
    }

    const deleteById=()=>{
        axios.delete(`http://localhost:8080/permitType/delete/${id}`).then((res)=>{
            handleCloseModal();
            showAlert({
                type: 'success',
                message: 'Permit Type has been successfully deleted.',
                duration: 3000,
                icon: <CheckCircleOutlineIcon />
              });      
            console.log(res);
        }).catch((err)=>{
            showAlert({
                type: 'error',
                message: 'Failed to delete Permit Type.',
                duration: 3000,
                icon: <ErrorOutlineOutlinedIcon />
              });
            console.error(err);
        }).finally(() => {
            onClose();
          });

    }
    return (
        <>
        <Modal 
         open={modalOpen}
         onClose={handleCloseModal}
         title={`Do you want to delete Permit Type ${name}`}
         buttons={[
            { label: 'Delete', onClick: deleteById, className: 'confirm' },
            { label: 'Cancel', onClick: handleCloseModal, className: 'cancel' }
          ]}
        >
           <p>This item will be deleted immediately. You cannot undo this action.</p>
          </Modal> 
        </>
    )
}

export default DeletePTW;