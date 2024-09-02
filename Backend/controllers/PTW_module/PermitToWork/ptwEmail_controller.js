import PermitToWorkEmailService from "../../../services/PTW_module/PermitToWork/ptwEmail_service.js";

export default class PermitToWorkEmailController{

    static async getPermitToWorkByIdController(req,res){
        try{
        const {ptId}= req.params;
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
    
        console.log(payload);
    
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