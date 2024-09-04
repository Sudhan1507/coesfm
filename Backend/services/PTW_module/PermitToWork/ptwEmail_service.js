import PermitToWorkEmailDao from "../../../dao/PTW_module/PermitToWork/ptwEmail_dao.js";

export default class PermitToWorkEmailService{
    static async getPermitTypeByIdService(ptId){
    try{
        const permitType= await PermitToWorkEmailDao.getPermitTypeById(ptId);
        return permitType;
    }catch(err){
        console.error('Error in getPermitTypeByIdService: ', err);
        }
    }

    static async addMultipleChecklistResponsesService(payload) {
        try {
            const {token, ptId, activeStatus, email, responses, statusName, signOffRemarks, signature, processedAt } = payload;
            const response= await PermitToWorkEmailDao.addMultipleChecklistResponses(token,ptId, activeStatus, email, responses, statusName, signOffRemarks, signature, processedAt);
            // console.log('Update multiple checklist',response);
            return response;
        } catch (err) {
            console.error('Error in addMultipleChecklistResponsesService: ', err);
            throw err;
        }
    };

};