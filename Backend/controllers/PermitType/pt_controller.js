import PermitTypeService from '../../services/PermitType/pt_service.js';
import {validatePermitType,validateUpdatePermitType} from "../../middlewares/pt_validation.js";
import handleError from "../../utils/pt_utils.js";

export default class PermitTypeContoller{
static async  createPermitType(req,res){
    try{
          validatePermitType(req.body); 
          await PermitTypeService.createPermitTypeService(req.body);
          res.status(201).json({status: 'success'});
    }catch(err){
        handleError(res,err);
        res.json({status: 'failed'});
    }
}

static async  getPermitType(req,res){
    try{
        const PermitType=await PermitTypeService.getPermitTypeService();
        res.json(PermitType);
    }catch(err){
        handleError(res,err);
        res.json({status: 'failed'});
    }
}

static async  updatePermitType(req,res){
    try{
        validateUpdatePermitType(req.body);
        const { ptId } = req.params;
        if (!ptId) {
            res.status(400).json({ error: 'ptId is required' });
            }
        const updatedPermitType= await PermitTypeService.updatePermitTypeService(ptId,req.body);
        if (updatedPermitType.error) {
            res.status(500).json({ status: 'update Permit type service: failed', error: updatedPermitType.error });
        }else {
            res.status(200).json({status:'success'});
        }
    }catch(err){
        handleError(res,err);
        res.json({status: 'failed'});
    }
}

static async  deletePermitType(req, res) {
    try {
        const { ptId } = req.params;
        if (!ptId) {
            throw new Error('ptId is required');
        }
        await PermitTypeService.deletePermitTypeService(ptId);
        res.status(200).json({status: 'success'});
    } catch (err) {
        handleError(res, err);
        res.json({status: 'failed'});
    }
 }
}