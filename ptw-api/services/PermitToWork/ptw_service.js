import PermitToWorkDao from "../../dao/PermitToWork/ptw_dao.js";

export default class PermitToWorkService{
    static async getAllPermitToWork(){
        try{
          const permitToWork=  await PermitToWorkDao.getAllPermitToWork();
          return permitToWork;
        }catch(err){
            console.error('Error in getAllPermitToWorkService: ', err);
            throw err;
        }
    }
    static async getPermitTypeByIdService(ptId){
        try{
            const permitType= await PermitToWorkDao.getPermitTypeById(ptId);
            return permitType;
        }catch(err){
            console.error('Error in getPermitTypeByIdService: ', err);
            throw err;
        }
    }

    static async getPermitTypeNameService(){
        try{
            const permitTypeName= await PermitToWorkDao.getPermitTypeName();
            return permitTypeName;
        }catch(err){
            console.error('Error in getPermitTypeNameService: ', err);
            throw err;
        }
    }
    static async addMultipleChecklistResponsesService(payload) {
        try {
            const { ptId, activeStatus, createdBy, responses,statusName, signOffRemarks, userId, signature, processedAt } = payload;
            await PermitToWorkDao.addMultipleChecklistResponses(ptId, activeStatus, createdBy, responses,statusName, signOffRemarks, userId, signature, processedAt);
            console.log('{ status: Update multiple checklist options service: success }');
        } catch (err) {
            console.error('Error in addMultipleChecklistResponsesService: ', err);
            throw err;
        }
    }

    static async getSignOffService(appId){
        try{
            const signOff= await PermitToWorkDao.getSignOff(appId);
            return signOff;
        }catch(err){
            console.error('Error in getSignOffService: ', err);
            throw err;
        }
    }

    static async addSignOffService(appId, statusName, signOffRemarks, userId, signature) {
        try {
            await PermitToWorkDao.addSignOff(appId, statusName, signOffRemarks, userId, signature);
            console.log('{ status: Add sign-off service: success }');
        } catch (err) {
            console.error('Error in addSignOffService: ', err);
            throw err;
        }
    }

    static async getChecklistResponseService(appId) {
        try {
            const checklistResponse = await PermitToWorkDao.getChecklistResponse(appId);
            return checklistResponse;
        } catch (err) {
            console.error('Error in getChecklistResponseService: ', err);
            throw err;
        }
    }

    static async getSignOffHistoryService(appId) {
        try {
            const signOffHistory = await PermitToWorkDao.getSignOffHistory(appId);
            return signOffHistory;
        } catch (err) {
            console.error('Error in getSignOffHistoryService: ', err);
            throw err;
        }
    }

    static async deletePermitToWorkService(appId) {
        try {
            await PermitToWorkDao.deletePermitToWork(appId);
            console.log('{ status: Delete permit-to-work service: success }');
        } catch (err) {
            console.error('Error in deletePermitToWorkService: ', err);
            throw err;
        }
    }
}