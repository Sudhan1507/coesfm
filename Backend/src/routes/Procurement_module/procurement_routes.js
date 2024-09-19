import  {Router} from 'express';
import ProcurementController from '../../controllers/Procurement_module/procurement_controller.js';
import authenticateToken from '../../middlewares/auth.js';

const router = Router();

router.get('/index',authenticateToken, ProcurementController.getAllProcurementController);
router.post('/create-procurement', authenticateToken, ProcurementController.createProcurementController);


export default router;

