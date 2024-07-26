import '../Maincontent/Maincontent.css';



 const Maincontent = (props) => {
  

  return (
    <>
     <div className={` maincontent-container ${props.isSidebarOpen ? 'expanded' : 'collapsed'}`}>
      <div className="maincontent-body">
            {props.children}
      </div>
      </div>
    </>
    );
};

export default Maincontent;
