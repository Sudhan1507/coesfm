import PermitTypeDao from "../../../dao/PTW_module/PermitType/pt_dao.js";

export default class PermitTypeService{
    static async createPermitTypeService(permitTypeData) {
        try {
            const result = await PermitTypeDao.createPermitTypeDao(permitTypeData);
            console.log('Service result:', result);
            return result;
        } catch (err) {
            console.error('Error in createPermitTypeService:', err);
            throw err; // Ensure errors are propagated
        }
    }

    static async getPermitTypeService(){
        try{
           const permitTypes= await PermitTypeDao.getPermitTypeDao();
           console.log('{ status: fetch Permit type service: success }');
           return permitTypes;
            
        }catch(err){
            console.error('Error in getPermitTypeService: ', err);
        }
    }

    static async updatePermitTypeService(ptId,permitType){
        try{
            const updatedPermitType =  await PermitTypeDao.updatePermitTypeDao(ptId,permitType);
            console.log('{ status: Update Permit type service: success }');
            return updatedPermitType;
        }catch(err){
            console.error('Error in updatePermitTypeService: ',err);
        }
    }

    static async deletePermitTypeService(ptId){
        if (!ptId) {
            throw new Error('ptId is required');
        }
        try{
            const result=  await PermitTypeDao.deletePermitType(ptId);
        }catch(err){
            console.error('Error in deletePermitTypeService: ',err);
        }
    }
};