import { useState } from "react";
import axios from "axios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Modal from "../../../molecules/Modal/Modal";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const DeleteFlowStep=({id,onClose,showAlert,stepNo})=>{
    const[modalOpen,setModalOpen]=useState(true);
    const handleCloseModal=()=>{
        setModalOpen(false);
    };

    const deleteFlowStep=async()=>{
        axios.delete(`http://localhost:8080/flow/deleteStep/${id}/${stepNo}`)
        .then((res)=>{
          console.log(res);
          handleCloseModal();
          showAlert({
              type: 'success',
              message: `Step ${stepNo} deleted successfully`,
              duration: 3000,
              icon: <CheckCircleOutlineIcon />,
          });
        })
        .catch((err) => {
            const errorMessage = err.response?.data?.message || `Failed to delete step ${stepNo}`;
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
             title={`Do you want to delete step ${stepNo}`}
             buttons={[
                { label: 'Delete', onClick: deleteFlowStep, className: 'confirm' },
                { label: 'Cancel', onClick: handleCloseModal, className: 'cancel' }
              ]}
            >
               <p>This item will be deleted immediately. You cannot undo this action.</p>
              </Modal> 
        </>
    );
};

export default DeleteFlowStep;