import PermitToWorkService from "../../../services/PTW_module/PermitToWork/ptw_service.js";
import handleError from "../../../utils/pt_utils.js";

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
        const payload = req.body;
    
            // Validate payload structure
            if (!payload.ptId || !payload.activeStatus || !payload.createdBy || !Array.isArray(payload.responses)) {
                return res.status(400).json({ status: 'invalid request', message: 'Invalid payload structure' });
            }
    
            // Ensure each response object has the necessary properties
            if (payload.responses.some(response => response.serialNo === undefined || response.checkOptions === undefined)) {
                return res.status(400).json({ status: 'invalid request', message: 'Each response must include serialNo and checkOptions' });
            }
        try {
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
        const {appId}=req.params;
        if(!appId){
            return res.status(404).json({ status: 'Application Id not found' });
        }
        try{
           
            const signOff= await PermitToWorkService.getSignOffService(appId);
            return res.json({ status: 'success',data: signOff});
        }catch(err){
            console.error('Error in getSignOffController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async addSignOffController(req, res) {
        const { appId } = req.params;
        const { statusName, signOffRemarks, userId, signature } = req.body;
        
        if (!appId || !statusName || !signOffRemarks || !userId || !signature) {
            return res.status(400).json({ status: 'error', message: 'Application Id or Sign-off details not found' });
        }
        try {
            
            await PermitToWorkService.addSignOffService(appId, statusName, signOffRemarks, userId, signature);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in addSignOffController: ', err);
            return res.status(500).json({ status: 'failed', message: err.message });
        }
    }

    static async getChecklistResponseController(req, res) {
        const { appId } = req.params;
            if (!appId) {
                return res.status(404).json({ status: 'Application Id not found' });
            }
        try {
            const checklistResponse = await PermitToWorkService.getChecklistResponseService(appId);
            return res.json({ status: 'success', data: checklistResponse });
        } catch (err) {
            console.error('Error in getChecklistResponseController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getSignOffHistoryController(req, res) {
        const { appId } = req.params;
        if (!appId) {
            return res.status(404).json({ status: 'Application Id not found' });
        }
        try {
            const signOffHistory = await PermitToWorkService.getSignOffHistoryService(appId);
            return res.json({ status: 'success', data: signOffHistory });
        } catch (err) {
            console.error('Error in getSignOffHistoryController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async deletePermitToWorkController(req,res){
        const {appId}= req.params;
            if(!appId){
                return res.status(404).json({ status: 'Application Id not found' });
            }
        try{
            await PermitToWorkService.deletePermitToWorkService(appId)
            return res.status(200).json({ status: 'success'});
        }catch(err){
            console.error('Error in deletePermitToWorkController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async updateAssignmentController(req, res) {
        const { userId, updatedBy } = req.body;
            const { flowId, stepNo } = req.params;
            if (!userId || !flowId || !stepNo) {
                return res.status(404).json({ status: 'User Id, Flow Id or Step No not found' });
            }
        try {
            await PermitToWorkService.updateAssignmentService(flowId, stepNo, userId, updatedBy);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in updateAssignmentController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }
    static async cancelPermitToWorkController(req, res) {
        const { appId } = req.params;
            const { workStatus, appStatus, statusName, userId, updatedBy } = req.body;

            if (!appId) {
                return res.status(404).json({ status: 'Application Id not found' });
            }

        try {
            await PermitToWorkService.cancelPermitToWorkService(appId, workStatus, appStatus, statusName, userId, updatedBy);
            return res.status(200).json({ status: 'success' });
        } catch (err) {
            console.error('Error in cancelPermitToWorkController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async restartAppFlowController(req, res) {
        const { appId, statusName, userId, signOffRemarks } = req.body;
        if (!appId || !statusName || !userId || !signOffRemarks) {
            return res.status(400).json({ status: 'Application Id, Status Name, User Id or Sign-off Remarks not found' });
        }
        try {
            const result = await PermitToWorkService.restartAppFlowService(appId, statusName, userId, signOffRemarks);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ status: 'failed', message: 'Failed to restart application flow.', error: err.message });
        }
    }

    static async updateChecklistResponseController(req, res) {
        const { appId } = req.params;
        const payload = req.body;
    
        try {
            for (const item of payload) {
                const { serialNo, checkOptions, remarks, updatedBy } = item;
                if (!appId || !serialNo || !checkOptions || !remarks || !updatedBy) {
                    return res.status(400).json({ status: 'Application Id, Serial No, Check Options or Updated By not found' });
                }
                await PermitToWorkService.updateChecklistResponseService(appId, serialNo, checkOptions, remarks, updatedBy);
            }
            return res.status(200).json({ status: 'success' });    
        } catch (err) {
            console.error('Error in updateChecklistResponseController: ', err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async updateAppStatusController(req,res){
        const { appStatus, updatedBy } = req.body;
        const {appId} =req.params;
        if (!appId || !updatedBy) {
            return res.status(400).json({ status: 'Application Id or Updated By not found' });
        }
        try{
            await PermitToWorkService.updateAppStatusService(appId, appStatus, updatedBy);
            return res.status(200).json({ status:'success' });
        }catch(err){
            console.error('Error in updateAppStatusController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async insertAppSignOffController(req,res){
        const { appId, statusName,userId } = req.body;
        if (!appId || !statusName || !userId) {
            return res.status(400).json({ status: 'Application Id, Status Name, User Id not found' });
        }
        try{
            await PermitToWorkService.insertAppSignOffService(appId, statusName,userId);
            return res.status(200).json({ status:'success' });
        }catch(err){
            console.error('Error in insertAppSignOffService: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getChecklistPdfController(req, res){
        const { appId } = req.params;
        if (!appId) {
            return res.status(404).json({ status: 'Application Id not found' });
        }
        try{
            const result = await PermitToWorkService.getChecklistPdfService(appId);
            return res.status(200).json({ status: 'success', data: result});
        }catch(err){
            console.error('Error in getChecklistPdfController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }

    static async getSignOffPdfController(req, res){
        const { appId } = req.params;
        if (!appId) {
            return res.status(404).json({ status: 'Application Id not found' });
        }
        try{
            const result = await PermitToWorkService.getSignOffPdfService(appId);
            return res.status(200).json({ status:'success', data: result});
        }catch(err){
            console.error('Error in getSignOffPdfController: ',err);
            return res.status(500).json({ status: 'failed' });
        }
    }
}