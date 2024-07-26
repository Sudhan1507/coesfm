import ApprovalFlow from "./Views/PTW/ApprovalFlow/ApprovalFlow";
import ManagePTW from "./Views/PTW/ManagePTW/ManagePTW";
import { BrowserRouter as Router,Route,Routes  } from "react-router-dom";
import UpdateFlow from "./components/organisms/Update/UpdateFlow/UpdateFlow";
import PermitToWork from "./Views/PTW/PermitToWork/PermitTowork.js";
import NewPermitApp from "./components/organisms/Create/NewPermitApp/NewPermitApp";
import Login from "./Views/Login/Login.js";
import Layout from "./components/molecules/Layout/Layout.js";



const App = () => {
  return (
  <>
  <Router>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<Layout/>}/>
      <Route path="/permitTowork" element={<PermitToWork/>}/>
      <Route path="/managePTW" element={<ManagePTW/>}/>
      <Route path="/approvalFlow" element={<ApprovalFlow/>}/>
      <Route path="/updateFlow" element={<UpdateFlow/>}/>
      <Route path="/newPermitApp" element={<NewPermitApp/>}/>
    </Routes>
  </Router>
    

  </>
  );
};


export default App;

