import AccountsDao from "../../dao/Account/account_dao.js";
import moment from 'moment';

export default class AccountsService{

    static async getLoginInfoService(username, password){
        try{
            const loginInfo=await AccountsDao.getLoginInfo(username, password);
            if (loginInfo.length === 0) {
                return null;
            }      

            return loginInfo;

        }catch(err){
            console.error('Error in getLoginInfoService: ', err);
        }
    }

    // static async saveTokenService(userId, token) {
    //     try {
    //         await AccountsDao.saveToken(userId, token);
    //     } catch (err) {
    //         console.error('Error in saveTokenService: ', err);
    //         throw err;
    //     }
    // }

    static async getAccountsNameService(){
        try{
            const names=await AccountsDao.getAccountNames();
            return names;
        }catch(err){
            console.error('Error in getAccountsNameService: ', err);
        }
    }
}