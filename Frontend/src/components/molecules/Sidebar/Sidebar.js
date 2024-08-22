import React, { useState } from 'react';
import '../Sidebar/Sidebar.css';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AnchorIcon from '@mui/icons-material/Anchor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import BuildIcon from '@mui/icons-material/Build';
// import WorkIcon from '@mui/icons-material/Work'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    const[isDropdownOpen,setisDropdownOpen]=useState(false);
    const navigate=useNavigate();
    const toggleDropdown=()=>{
      setisDropdownOpen(!isDropdownOpen);
    }
  

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
          <div className='sidebar-header'>
            <div className='sidebar-header-logo'>
                <img src='../logo.png' alt='MKV' />
            </div>
            <div className='sidebar-header-icon' onClick={toggleSidebar}>
            <DehazeIcon sx={{ color: 'white' }} />
            </div>
            </div>
            {isSidebarOpen && (
            <div className='sidebar-contents'>
              <div className='sidebar-contents-header'>
              <h3 className='sidebar-contents-header-text'>MENU</h3>
              </div>
              <div className='sidebar-contents-list'>
                <ul className='sidebar-contents-list-headers'>
                <li className='sidebar-contents-list-item' onClick={toggleDropdown}>
                  <div className='sidebar-contents-list-item-master'>
              <AnchorIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize:'1rem' }} />
              <span className='sidebar-contents-list-master'>Master</span>
              
              {isDropdownOpen ? (
                <ExpandLessIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '6rem' }} />
              ) : (
                <ExpandMoreIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '6rem' }} />
              )}
              </div>
              <div className='sidebar-contents-list-item-master-content'>
                {isDropdownOpen && (
                  <ul className='sidebar-contents-dropdown-list'>
                  <div className='sidebar-contents-master-dropdown-list-parts'>
                    {/* <BuildIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '-0.5rem' }} /> */}
                    <span className='dropdown-item-parts-text' onClick={()=>{navigate('/parts')}}>Parts</span> 
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-ptw'>
                    {/* <WorkIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '-0.5rem' }}/> */}
                    <span className='dropdown-item-ptw-text' onClick={()=>{navigate('/permitToWork')}}>Permit To Work</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-meter'>
                    <span className='dropdown-item-meter-text' onClick={()=>{navigate('/meter')}}>Meter</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-attendance'>
                    <span className='dropdown-item-attendance-text' onClick={()=>{navigate('/display/attendance')}}>Attendance</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-school'>
                    <span className='dropdown-item-school-text' onClick={()=>{navigate('/display/school')}}>School</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-report'>
                    <span className='dropdown-item-report-text' onClick={()=>{navigate('/display/report')}}>Fault Report</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-booking'>
                    <span className='dropdown-item-booking-text' onClick={()=>{navigate('/display/booking')}}>Booking Management</span>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-iaq'>
                    <span className='dropdown-item-iaq-text' onClick={()=>{navigate('/display/iaq')}}>IAQ Transaction</span>
                    </div>
                </ul>
              )}
              </div>
            </li>
                </ul>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Sidebar;
