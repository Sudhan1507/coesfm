import {Router} from 'express';
import PermitToWorkController from '../../controllers/PermitToWork/ptw_controller.js';
import authenticateToken from '../../middlewares/auth.js';

const router = Router();

router.get('/index',authenticateToken, PermitToWorkController.getAllPermitToWorkController);
router.get('/permitType/:ptId',authenticateToken, PermitToWorkController.getPermitToWorkByIdController);
router.get('/permitTypeName',authenticateToken, PermitToWorkController.getPermitTypeNameController);
router.post('/addResponse',authenticateToken, PermitToWorkController.addChecklistResponseController);
router.get('/signOff/declaration/:appId',authenticateToken, PermitToWorkController.getSignOffController);
router.post('/add/signOff/:appId',authenticateToken, PermitToWorkController.addSignOffController);
router.get('/checklistResponse/:appId',authenticateToken, PermitToWorkController.getChecklistResponseController);
router.get('/signOff/history/:appId',authenticateToken, PermitToWorkController.getSignOffHistoryController);
router.delete('/deleteApp/:appId',authenticateToken, PermitToWorkController.deletePermitToWorkController);

export default router;
