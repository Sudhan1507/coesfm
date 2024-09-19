import {Router} from 'express';
import PermitToWorkController from '../../../controllers/PTW_module/PermitToWork/ptw_controller.js';
import authenticateToken from '../../../middlewares/auth.js';

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
router.put('/updateAssignTo/:flowId/:stepNo',authenticateToken, PermitToWorkController.updateAssignmentController);
router.put('/cancelPermit/:appId',authenticateToken,PermitToWorkController.cancelPermitToWorkController);
router.post('/restartAppFlow',authenticateToken,PermitToWorkController.restartAppFlowController);
router.put('/updateChecklistResponse/:appId',authenticateToken,PermitToWorkController.updateChecklistResponseController);
router.put('/updateAppStatus/:appId',authenticateToken,PermitToWorkController.updateAppStatusController);
router.post('/appSignOff',authenticateToken,PermitToWorkController.insertAppSignOffController);
router.get('/checklistPdf/:appId',authenticateToken,PermitToWorkController.getChecklistPdfController);
router.get('/signOffPdf/:appId',authenticateToken,PermitToWorkController.getSignOffPdfController)

export default router;
