import { useState } from "react";
import Header from "../Header/Header.js";
import Maincontent from "../Maincontent/Maincontent.js";
import Sidebar from "../Sidebar/Sidebar.js";


const Layout=(props)=>{
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    }
    return(
        <>
        <div className={`layout-wrapper ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <Header isSidebarOpen={isSidebarOpen} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Maincontent>{props.children}</Maincontent>
        </div>
        </>
    )
};
export default Layout;