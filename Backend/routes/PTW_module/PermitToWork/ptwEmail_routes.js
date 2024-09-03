import {Router} from 'express';
import PermitToWorkEmailController from '../../../controllers/PTW_module/PermitToWork/ptwEmail_controller.js';

const router= Router();

router.get('/permitType/:ptId/:token', PermitToWorkEmailController.getPermitToWorkByIdController);
router.post('/addResponse', PermitToWorkEmailController.addChecklistResponseController);




export default router;
