import {Router} from 'express';
import EmailPermitController from '../controllers/email_controller.js';

const router=Router();

router.post('/send',EmailPermitController.sendEmailController);

export default router;