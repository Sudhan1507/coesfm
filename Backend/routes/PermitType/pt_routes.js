import {Router} from 'express';
import PermitTypeContoller from '../../controllers/PermitType/pt_controller.js';
import authenticateToken from '../../middlewares/auth.js';

const router =Router();

router.post('/add',authenticateToken,PermitTypeContoller.createPermitType);
router.get('/fetch',authenticateToken,PermitTypeContoller.getPermitType);
router.put('/update/:ptId',authenticateToken,PermitTypeContoller.updatePermitType);
router.delete('/delete/:ptId',authenticateToken,PermitTypeContoller.deletePermitType);

export default router;