import RequestorDao from "../../../dao/PTW_module/Requestor/requestor_dao.js";

export default class RequestorService{
    static async getRequestorName(){
        try{
            const requestprNames=await RequestorDao.getRequestorName();
            return requestprNames;
        }catch(err){
            console.error('Error in getRequestorNameService: ', err);
        }
    }
}