import React, { useState } from 'react';
import '../Sidebar/Sidebar.css';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AnchorIcon from '@mui/icons-material/Anchor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work'; 
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
                  <li className='dropdown-item-parts'>
                    <BuildIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '-0.5rem' }} />
                    <span className='dropdown-item-parts-text'>Parts</span> 
                    </li>
                    </div>
                    <div className='sidebar-contents-master-dropdown-list-ptw'>
                  <li className='dropdown-item-ptw' onClick={()=>{navigate('/permitToWork')}}>
                    <WorkIcon sx={{ color: 'white', verticalAlign: 'middle', fontSize: '1rem', marginLeft: '-0.5rem' }}/>
                    <span className='dropdown-item-ptw-text'>Permit To Work</span>
                    </li>
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
