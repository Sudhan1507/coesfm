import ApprovalFlow from "./Views/PTW_module/PTW/ApprovalFlow/ApprovalFlow.js";
import ManagePTW from './Views/PTW_module/PTW/ManagePTW/ManagePTW.js'
import { BrowserRouter as Router,Route,Routes  } from "react-router-dom";
import UpdateFlow from './components/organisms/Update/PTW_module/UpdateFlow/UpdateFlow.js'
import PermitToWork from "./Views/PTW_module/PTW/PermitToWork/PermitTowork.js";
import NewPermitApp from "./components/organisms/Create/PTW_module/NewPermitApp/NewPermitApp";
import Login from "./Views/Login/Login.js";
import Layout from "./components/molecules/Layout/Layout.js";
import PrivateRoutes from "./utils/PrivateRoutes.js";


const App = () => {
  return (
  <>
  <Router>
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<Layout/>}/>
        <Route path="/permitTowork" element={<PermitToWork/>}/>
        <Route path="/managePTW" element={<ManagePTW/>}/>
        <Route path="/approvalFlow" element={<ApprovalFlow/>}/>
        <Route path="/updateFlow" element={<UpdateFlow/>}/>
        <Route path="/newPermitApp" element={<NewPermitApp/>}/>
      </Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  </Router>
    

  </>
  );
};


export default App;

