import ProcurementService from "../../services/Procurement_module/procurement_service.js";

export default class ProcurementController{

    static async getAllProcurementController(req, res){
        try{
            const procurementData = await ProcurementService.getAllProcurementService();
            return res.status(200).json({status: 'success', data: procurementData});
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'An error occurred while fetching procurement data.' });
        };
    };

    static async createProcurementController(req, res){
        try{
            const newProcurementData = await ProcurementService.createProcurementService(req.body);
            return res.status(201).json({ status: 'success', data: newProcurementData });
        }catch(err){
            console.error(err);
            res.status(500).json({ message: 'An error occurred while creating a new procurement.' });
        };
    };

};