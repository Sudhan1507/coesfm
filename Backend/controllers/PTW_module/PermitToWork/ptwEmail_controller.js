import PermitToWorkEmailService from "../../../services/PTW_module/PermitToWork/ptwEmail_service.js";
import db from '../../../config/db_config.js';

export default class PermitToWorkEmailController{

    static async getPermitToWorkByIdController(req,res){
        try{
        const {ptId,token}= req.params;
       
        //Validate the token
        const [rows] = await db.query(
            'SELECT used FROM checklist_token WHERE token=?',[token]
        );


        // Check if the token was found and if it is used
        if (rows[0].used === 1) {
            return res.status(400).json({ status: 'Invalid' });
        }

        const permitToWork= await PermitToWorkEmailService.getPermitTypeByIdService(ptId);
        if(!permitToWork) return res.status(404).json({ status: 'not found' });
        return res.status(200).json({ status: 'success', data: permitToWork });
    }catch(err){
            console.error('Error in getPermitToWorkByIdController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    };

    static async addChecklistResponseController(req, res) {
        const payload = req.body;        

        // Validate the token
        const [rows] = await db.query(
            'SELECT * FROM checklist_token WHERE token = ? AND used = false AND expiration > NOW()',
            [payload.token]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid, expired, or already used token' });
        }
    
        // Validate payload structure
        if (!payload.ptId || !payload.activeStatus || !payload.email || !Array.isArray(payload.responses)) {
            return res.status(400).json({ status: 'invalid request', message: 'Invalid payload structure' });
        }
    
        // Ensure each response object has the necessary properties
        if (payload.responses.some(response => response.serialNo === undefined || response.checkOptions === undefined)) {
            return res.status(400).json({ status: 'invalid request', message: 'Each response must include serialNo and checkOptions' });
        }
    
        try {
            await PermitToWorkEmailService.addMultipleChecklistResponsesService(payload);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in addChecklistResponseController: ', err);
    
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ status: 'failed', message: 'Duplicate entry error: One or more responses already exist.' });
            }
    
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }
    };

};