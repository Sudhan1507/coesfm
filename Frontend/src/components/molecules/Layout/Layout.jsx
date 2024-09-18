import React, { useState } from "react";
import Header from "../Header/Header.jsx";
import Maincontent from "../Maincontent/Maincontent.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";

const Layout = ({ children, header }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`layout-wrapper ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <Header isSidebarOpen={isSidebarOpen} header={header} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Maincontent isSidebarOpen={isSidebarOpen}>{children}</Maincontent>
      </div>
    </>
  );
};

export default Layout;
