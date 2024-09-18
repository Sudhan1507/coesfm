import React from 'react';
import './Maincontent.css';

const Maincontent = ({ isSidebarOpen, children }) => {
    return (
        <div className={`maincontent-container ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
            <div className="maincontent-body">
                {children}
            </div>
        </div>
    );
};

export default Maincontent;
