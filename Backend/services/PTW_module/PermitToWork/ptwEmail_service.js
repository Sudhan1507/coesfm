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
            await PermitToWorkEmailDao.addMultipleChecklistResponses(token,ptId, activeStatus, email, responses, statusName, signOffRemarks, signature, processedAt);
            console.log('{ status: Update multiple checklist options service: success }');
        } catch (err) {
            console.error('Error in addMultipleChecklistResponsesService: ', err);
            throw err;
        }
    };

};