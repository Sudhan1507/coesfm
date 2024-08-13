import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import PermitTypeRoutes from './routes/PTW_module/PermitType/pt_routes.js';
import ChecklistRoutes from './routes/PTW_module//Checklist/checklist_routes.js';
import RequestorRoutes from './routes/PTW_module//Requestor/requestor_routes.js';
import FlowRoutes from './routes/PTW_module//Flow/flow_routes.js';
import AccountRoutes from './routes/PTW_module//Account/account_routes.js';
import PtwRoutes from './routes/PTW_module/PermitToWork/ptw_routes.js';
import PartsRoutes from './routes/Parts_module/Parts/parts_routes.js';
import IAQRoutes from './routes/IAQ_module/IAQ_Transaction/iaq_transaction_routes.js'
import cors from 'cors';

dotenv.config({path:'./app.env'});

const app=express();
const PORT=process.env.PORT || 8081;

app.use(cors());

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/permitType', PermitTypeRoutes);
app.use('/checklist',ChecklistRoutes);
app.use('/flow',FlowRoutes);
app.use('/requestor',RequestorRoutes);
app.use('/account',AccountRoutes);
app.use('/ptw',PtwRoutes);
app.use('/parts',PartsRoutes);
app.use('/iaq',IAQRoutes);

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