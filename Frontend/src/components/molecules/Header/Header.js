import "./Header.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getUserData } from "../../../utils/utils";

const Header = ({ isSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userdata = getUserData();
    setUser(userdata);
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('userdata');
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`header ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <div className="header-nav">
        <div className="header-title-text">
          MKV ENGINEERING AND TRADING SERVICES PTE LTD
        </div>
        <div className="header-title-logo">
          <span className="header-title-username">
            {user.user.displayName}
          </span>
          <button type="button" onClick={handleDropdownToggle}>
            <img src="../logo-male.jpg" alt="icon"/>
          </button>
          {isDropdownOpen && (
            <div className="header-dropdown-menu">
              <ul>
                <li>Account</li>
                <li onClick={handleSignOut}>Sign Out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
