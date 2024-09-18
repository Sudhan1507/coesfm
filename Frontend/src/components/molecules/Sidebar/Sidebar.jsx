import React, { useState } from 'react';
import './Sidebar.css';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AnchorIcon from '@mui/icons-material/Anchor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Link } from 'react-router-dom';
import logo from '../../../assests/logo.png';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };


  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div className='sidebar-header'>
          <div className='sidebar-header-logo'>
            <img src={logo} alt='MKV' />
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
              <ul className='sidebar-contents-list'>
                <li className='sidebar-contents-list-item'>
                  <div className='sidebar-contents-list-item-master' onClick={toggleDropdown}>
                    <AnchorIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem' }} />
                    <span className='sidebar-contents-list-master'>Master</span>
                    {isDropdownOpen ? (
                      <ExpandLessIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '6rem' }} />
                    ) : (
                      <ExpandMoreIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '6rem' }} />
                    )}
                  </div>

                  {/* Conditional rendering of dropdown */}
                  {isDropdownOpen && (
                    <div className='sidebar-contents-list-item-master-content'>
                      <ul className='sidebar-contents-dropdown-list'>
                        <div className='sidebar-contents-master-dropdown-list-parts'>
                        <Link to ='/parts' className='dropdown-item-parts-text' > Parts </Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-ptw'>
                          <Link to ='/permitToWork' className='dropdown-item-ptw-text'>Permit To Work</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-procurement'>
                          <Link to ='/procurement' className='dropdown-item-procurement-text'>Procurement</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-meter'>
                          <Link to='/meter' className='dropdown-item-meter-text' >Meter</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-attendance'>
                          <Link to='/display/attendance' className='dropdown-item-attendance-text' >Attendance</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-school'>
                          <Link to='/display/school' className='dropdown-item-school-text'>School</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-report'>
                          <Link to='/display/report' className='dropdown-item-report-text'>Fault Report</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-booking'>
                          <Link to='/display/booking' className='dropdown-item-booking-text'>Booking Management</Link>
                        </div>
                        <div className='sidebar-contents-master-dropdown-list-iaq'>
                          <Link to='/display/iaq' className='dropdown-item-iaq-text'>IAQ Transaction</Link>
                        </div>
                      </ul>
                    </div>
                  )}
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
