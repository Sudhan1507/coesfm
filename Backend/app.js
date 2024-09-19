import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import PermitTypeRoutes from './src/routes/PTW_module/PermitType/pt_routes.js';
import ChecklistRoutes from './src/routes/PTW_module/Checklist/checklist_routes.js';
import RequestorRoutes from './src/routes/PTW_module/Requestor/requestor_routes.js';
import FlowRoutes from './src/routes/PTW_module/Flow/flow_routes.js';
import AccountRoutes from './src/routes/PTW_module/Account/account_routes.js';
import PtwRoutes from './src/routes/PTW_module/PermitToWork/ptw_routes.js';
import PartsRoutes from './src/routes/Parts_module/Parts/parts_routes.js';
import IAQRoutes from './src/routes/IAQ_module/IAQ_Transaction/IaqRouter.js'
import cors from 'cors';
import AttendanceRoutes from './src/routes/Attendance_module/Attendance/AttendanceRouter.js';
import BookingRoutes from './src/routes/Booking_module/Booking/BookingRouter.js';
import FaultReportRoutes from './src/routes/Fault_Report_module/FaultReport/Fault_ReportRouter.js';
import MeterRoutes from './src/routes/Meter_module/Meter/MeterRouter.js';
import MeterreadingRoutes from './src/routes/Meter_module/MeterReading/ReadingRouter.js';
import SchoolRoutes from './src/routes/School_module/School/school_routes.js';
import EmailRoutes from './src/routes/PTW_module/E-mail/email_routes.js';
import PermitToWorkEmailRoutes from './src/routes/PTW_module/PermitToWork/ptwEmail_routes.js';
import ProcurementRoutes from './src/routes/Procurement_module/procurement_routes.js';


dotenv.config({path:'./app.env'});

const app=express();
const PORT=process.env.PORT || 8081;

app.use(cors());

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the 'web' directory (for frontend)
app.use(express.static('web'));

// Routes
app.use('/permitType', PermitTypeRoutes);
app.use('/checklist',ChecklistRoutes);
app.use('/flow',FlowRoutes);
app.use('/requestor',RequestorRoutes);
app.use('/account',AccountRoutes);
app.use('/ptw',PtwRoutes);
app.use('/parts',PartsRoutes);
app.use('/iaq',IAQRoutes);
app.use('/auth',SchoolRoutes );
app.use('/booking', BookingRoutes);
app.use('/meter', MeterRoutes);
app.use('/attendance',AttendanceRoutes);
app.use('/report',FaultReportRoutes);
app.use('/reading',MeterreadingRoutes);
app.use('/api/email', EmailRoutes);
app.use('/api/ptw',PermitToWorkEmailRoutes);
app.use(`/api/procurement`,ProcurementRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error('Error in middleware: ', err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.APP_ENV} mode`);
});