import "./Header.css";

const Header = ({ isSidebarOpen }) => {
    return (
      <div className={`header ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <div className="header-nav">
          <div className="header-title-text ">
          MKV ENGINEERING AND TRADING SERVICES PTE LTD
          </div>
          <div className="header-title-logo">
            <img src="../logo-male.jpg" alt="icon"/>
          </div>
          </div>
      </div>
    );
};

export default Header;