import FlowService from '../../services/Flow/flow_service.js';
import handleError,{handleDuplicateNameError} from '../../utils/pt_utils.js';

export default class FlowController{
static async  getAllFlowNameController(req,res){
        try{
            const flowName=await FlowService.getAllFlowNameService();
            res.json(flowName);
        }catch(err){
            handleError(res, err);
            res.json({ status: 'failed' });
        }
}

static async  checkFlowNameController(req, res){
    try{
        const { flowName } = req.query;
        const isUnique = await FlowService.checkFlowNameService(flowName);
        res.json(isUnique);
    }catch(err){
        handleError(res, err);
        res.json({ status: 'failed' });
    }
}

static async  getFlowNameController(req, res){
    try{
        const { flowId } = req.params;
        if (!flowId) {
            throw new Error('flowId is required');
        }
        const flowName=await FlowService.getFlowNameService(flowId);
        res.json(flowName);
    }catch(err){
        handleError(res, err);
        // Ensure only one response is sent
        if (!res.headersSent) {
            res.status(500).json({ status: 'failed' });
        }
    }
};

static async  getFlowIndexController(req,res){
    try{
        const flowIndex=await FlowService.getFlowIndexService();
        res.json(flowIndex);
    }catch(err){
        handleError(res, err);
        res.json({ status: 'failed' });
    }
}

static async  deleteFlowDetailsController(req,res){
    try {
        const { flowId } = req.params;
        if (!flowId) {
            throw new Error('flowId is required');
        }
        await FlowService.deleteFlowDetailsService(flowId);
        res.status(200).json({ status:'success' });
    }catch(err){
        handleError(res, err);
        res.json({ status: 'failed' });
    }
}

static async  createFlowDetailsController(req, res) {
    const { flowName, steps } = req.body;

    try {
        const result = await FlowService.createFlowDetails(flowName, steps);
        res.status(201).json({ flowId: result.flowId });
    } catch (error) {
        handleDuplicateNameError(res, err)
        console.error('Error creating flow details:', error);
        res.status(500).json({ error: 'Failed to create flow details' });
    }
}

static async  getFlowDetailsIndexController(req, res){
    
    try{
        const {flowId} = req.params;

        if (!flowId) {
            throw new Error('flowId is required');
        }
        const flowDetailsIndex=await FlowService.getFlowDetailsIndexServer(flowId);
        res.json(flowDetailsIndex);
    }catch(err){
        handleError(res, err);
        res.json({ status: 'failed' });
    }
}

static async  deleteFlowStepController(req, res) {
    try {
        const { flowId, stepNo } = req.params;

        console.log(flowId);
        console.log(stepNo);
        if (!flowId ||!stepNo) {
            res.status(400).json({ error: 'flowId and stepNo are required' });
            return;
        }
        await FlowService.deleteFlowStepService(flowId, stepNo);
        res.status(200).json({ status:'success' });
    } catch (err) {
        handleError(res, err);
        res.json({ status: 'failed' });
    }
}

static async  updateFlowNameController(req,res){
    try {
        const { flowId } = req.params;
        const { flowName } = req.body;
        
        if (!flowId ||!flowName) {
            return res.status(400).json({ status: 'failed', message: 'flowId and flowName are required' });
        }
        await FlowService.updateFlowNameService(flowId, flowName);
        res.status(200).json({ status:'success' });
    }catch(err){
        handleDuplicateNameError(res,err);
        res.status(500).json({ status: 'failed', message: err.message });
    }
}

static async  updateFlowStepController(req, res) {
    try {
        const { flowId, stepNo } = req.params;
        const { statusName, declaration, userId } = req.body;
        
        if (!flowId ||!stepNo) {
          return res.status(400).json({ error: 'flowId and stepNo are required' });
        }
        await FlowService.updateFlowStepService(flowId, stepNo, statusName, declaration, userId);
        res.status(200).json({ status:'success' });
    }catch(err){
        handleError(res,err);
        res.json({ status: 'failed' });
    }
}

static async  addFlowStepController(req,res){
    try{
        const {flowId} = req.params;
        const {statusName, declaration, userId } = req.body;
        
        if (!flowId) {
            res.status(400).json({ error: 'flowId is required' });
            return;
        }
        await FlowService.addFlowStepService(flowId, statusName, declaration, userId);
        res.status(201).json({ status:'success' });
    }catch (err) {
        handleError(res, err);
        res.json({ status: 'failed' });
    }
  }
}