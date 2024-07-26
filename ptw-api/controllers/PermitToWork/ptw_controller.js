import PermitToWorkService from "../../services/PermitToWork/ptw_service.js";
import handleError from "../../utils/pt_utils.js";

export default class PermitToWorkController{
    static async getAllPermitToWorkController(req,res){
        try{
        const permitToWork= await PermitToWorkService.getAllPermitToWork();
        return res.status(200).json({ status: 'success', data: permitToWork });
    }catch(err){
            console.error('Error in getAllPermitToWorkController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getPermitToWorkByIdController(req,res){
        try{
        const {ptId}= req.params;
        const permitToWork= await PermitToWorkService.getPermitTypeByIdService(ptId);
        if(!permitToWork) return res.status(404).json({ status: 'not found' });
        return res.status(200).json({ status: 'success', data: permitToWork });
    }catch(err){
            console.error('Error in getPermitToWorkByIdController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getPermitTypeNameController(req,res){
        try{
        const permitTypeName= await PermitToWorkService.getPermitTypeNameService();
        if(!permitTypeName) return res.status(404).json({ status: 'not found' });
        return res.status(200).json({ status: 'success', data: permitTypeName });
    }catch(err){
        handleError(res, err);
        console.error('Error in getPermitTypeNameController: ',err);
            return res.status(500).json({ status: 'failed' });
    
        }
    }

    static async addChecklistResponseController(req, res) {
        try {
            const payload = req.body;
    
            // Validate payload structure
            if (!payload.ptId || !payload.activeStatus || !payload.createdBy || !Array.isArray(payload.responses)) {
                return res.status(400).json({ status: 'invalid request', message: 'Invalid payload structure' });
            }
    
            // Ensure each response object has the necessary properties
            if (payload.responses.some(response => response.serialNo === undefined || response.checkOptions === undefined)) {
                return res.status(400).json({ status: 'invalid request', message: 'Each response must include serialNo and checkOptions' });
            }
    
            await PermitToWorkService.addMultipleChecklistResponsesService(payload);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in addChecklistResponseController: ', err);
    
            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ status: 'failed', message: 'Duplicate entry error: One or more responses already exist.' });
            }
    
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }
    }

    static async getSignOffController(req,res){
        try{
            const {appId}=req.params;
            if(!appId){
                return res.status(404).json({ status: 'Application Id not found' });
            }
            const signOff= await PermitToWorkService.getSignOffService(appId);
            return res.json({ status: 'success',data: signOff});
        }catch(err){
            console.error('Error in getSignOffController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async addSignOffController(req, res) {
        try {
            const { appId } = req.params;
            const { statusName, signOffRemarks, userId, signature } = req.body;
            
            if (!appId || !statusName || !signOffRemarks || !userId || !signature) {
                return res.status(400).json({ status: 'error', message: 'Application Id or Sign-off details not found' });
            }
            
            await PermitToWorkService.addSignOffService(appId, statusName, signOffRemarks, userId, signature);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in addSignOffController: ', err);
            return res.status(500).json({ status: 'failed', message: err.message });
        }
    }

    static async getChecklistResponseController(req, res) {
        try {
            const { appId } = req.params;
            if (!appId) {
                return res.status(404).json({ status: 'Application Id not found' });
            }
            const checklistResponse = await PermitToWorkService.getChecklistResponseService(appId);
            return res.json({ status: 'success', data: checklistResponse });
        } catch (err) {
            console.error('Error in getChecklistResponseController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getSignOffHistoryController(req, res) {
        try {
            const { appId } = req.params;
            if (!appId) {
                return res.status(404).json({ status: 'Application Id not found' });
            }
            const signOffHistory = await PermitToWorkService.getSignOffHistoryService(appId);
            return res.json({ status: 'success', data: signOffHistory });
        } catch (err) {
            console.error('Error in getSignOffHistoryController: ', err);
                    return res.status(500).json({ status: 'failed' });
        }
    }

    static async deletePermitToWorkController(req,res){
        try{
            const {appId}= req.params;
            if(!appId){
                return res.status(404).json({ status: 'Application Id not found' });
            }
            await PermitToWorkService.deletePermitToWorkService(appId)
            return res.status(200).json({ status: 'success', message: 'Permit Application deleted successfully!' });
        }catch(err){
            console.error('Error in deletePermitToWorkController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }
}