import Procurement from "../../dao/Procurement_module/procurement_dao.js";


export default class ProcurementService{

    static async getAllProcurementService(){
        try{
            const procurements=await Procurement.getAllProcurementDao();
            return procurements;
        }catch(err){
            console.error('Error in getAllProcurementService: ', err);
            throw err;
        };
    };

    static async createProcurementService(){
        try{
            const procurement=await Procurement.createProcurement();
            return procurement;
        }catch(err){
            console.error('Error in createProcurementService: ', err);
            throw err;
        };
    };
};