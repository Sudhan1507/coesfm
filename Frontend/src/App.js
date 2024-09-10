import ApprovalFlow from "./Views/PTW_module/PTW/ApprovalFlow/ApprovalFlow.js";
import ManagePTW from './Views/PTW_module/PTW/ManagePTW/ManagePTW.js'
import { BrowserRouter as Router,Route,Routes  } from "react-router-dom";
import UpdateFlow from './components/organisms/Update/PTW_module/UpdateFlow/UpdateFlow.js'
import PermitToWork from "./Views/PTW_module/PTW/PermitToWork/PermitTowork.js";
import NewPermitApp from "./components/organisms/Create/PTW_module/NewPermitApp/NewPermitApp";
import Login from "./Views/Login/Login.js";
import Layout from "./components/molecules/Layout/Layout.js";
import PrivateRoutes from "./utils/PrivateRoutes.js";
import Parts from "./Views/Parts_module/Parts/Parts.js";
import Meter from "./Views/Meter/Meter.jsx";
import AddMeter from "./Views/Meter/Addmeter.jsx";
import EditMeter from "./Views/Meter/EditMeter.jsx";
import Reading from "./Views/Reading/Reading.jsx";
import Add_Reading from "./Views/Reading/Add_Reading.jsx";
import Edit_Reading from "./Views/Reading/Edit_Reading.jsx";
import School from "./Views/School/school.jsx";
import AddSchool from "./Views/School/AddSchool.jsx";
import EditSchool from "./Views/School/EditSchool.jsx";
import Location from "./Views/Location/Location.jsx";
import AddLocation from "./Views/Location/Add_Location.jsx";
import Edit_Location from "./Views/Location/Edit_location.jsx";
import Attendance from "./Views/Attendance/Attendance.jsx";
import Add_Attendance from "./Views/Attendance/Add_Attendance.jsx";
import Edit_Attendance from "./Views/Attendance/Edit_Attendance.jsx";
import Report from "./Views/Fault Report/Report.jsx";
import Add_Report from "./Views/Fault Report/Add_Report.jsx";
import Edit_Report from "./Views/Fault Report/Edit_Report.jsx";
import Booking from "./Views/Booking Management/Booking.jsx";
import AddBooking from "./Views/Booking Management/AddBooking.jsx";
import Booking_History from "./Views/Booking Management/Booking_History.jsx";
import Edit_Booking from "./Views/Booking Management/Edit_booking.jsx";
import CheckAvailability from "./Views/Booking Management/CheckAvailability.jsx";
import Iaq from "./Views/IAQ/Iaq.jsx";
import './Main.css';
import ChecklistForm from "./Views/PTW_module/PTW/Checklist/ChecklistPage/ChecklistForm.js";
import SuccessFormSubmit from "./Views/PTW_module/PTW/SuccessForm/SuccessFormSubmit.js";
import UpdateChecklistForm from "./Views/PTW_module/PTW/Checklist/UpdateChecklistPage/UpdateChecklistForm.js";


const App = () => {
  return (
  <>
  <Router>
    <Routes>
      <Route path="/complete_permit_to_work/:email/:ptid/:token" element={<ChecklistForm/>} />
      <Route path="/request_change_permit_to_work/:email/:ptid/:appId/:token" element={<UpdateChecklistForm/>} />


      <Route path="/success" element={<SuccessFormSubmit/>}/>

      <Route element={<PrivateRoutes/>}>
        <Route path="/dashboard" element={<Layout/>}/>
        <Route path="/parts" element={<Parts/>}/>
        <Route path="/permitTowork" element={<PermitToWork/>}/>
        <Route path="/managePTW" element={<ManagePTW/>}/>
        <Route path="/approvalFlow" element={<ApprovalFlow/>}/>
        <Route path="/updateFlow" element={<UpdateFlow/>}/>
        <Route path="/newPermitApp" element={<NewPermitApp/>}/>
        <Route path="/success" element={<SuccessFormSubmit/>}/>


        <Route path='/meter' element={<Meter/>}></Route>
        <Route path='/display/add_meter' element={<AddMeter/>}> </Route>
        <Route path='/display/meter_edit/:id' element={<EditMeter/>}></Route>

        <Route path='/display/reading/:id' element={<Reading/>}></Route>
        <Route path='/display/add_reading/:id' element={<Add_Reading/>}></Route>
        <Route path='/display/edit_reading/:id' element={<Edit_Reading/>}></Route>

        <Route path='/display/school' element={<School/>}></Route>
        <Route path='/display/add_school' element={<AddSchool/>}></Route>
        <Route path='/display/edit_school/:id' element={<EditSchool/>}></Route>

        <Route path='/display/location/:id' element={<Location/>}></Route>
        <Route path='/display/add_location/:id' element={<AddLocation/>}></Route>
        <Route path='/display/edit_location/:id' element={<Edit_Location/>}></Route>

        <Route path='/display/attendance' element={<Attendance/>}></Route>
        <Route path='/display/add_attendance' element={<Add_Attendance/>}></Route>
        <Route path='/display/edit_attendance/:id' element={<Edit_Attendance/>}></Route>

        <Route path='/display/report' element={<Report/>}></Route>
        <Route path='/display/add_request' element={<Add_Report/>}></Route>
        <Route path='/display/edit_request/:id' element={<Edit_Report/>}></Route>
        
        <Route path='/display/booking' element={<Booking/>}></Route>
        <Route path='/display/add_booking' element={<AddBooking/>}></Route>
        <Route path='/display/booking_history' element={<Booking_History/>}></Route>
        <Route path='/display/edit_booking/:id' element={<Edit_Booking/>}></Route>
        <Route path='/display/check-availability' element={<CheckAvailability/>}></Route>

        <Route path='/display/iaq' element={<Iaq/>}></Route>
      </Route>
      <Route path="/" element={<Login/>}/>
    </Routes>
  </Router>
    

  </>
  );
};


export default App;

