import  {Router} from 'express';
import authenticateToken from '../../middlewares/auth.js';
import VendorController from '../../controllers/Vendor_module/vendor_controller.js';

const router = Router();

router.get('/index',authenticateToken, VendorController.getAllVendorsController);
router.get('vendor-id/:id', authenticateToken, VendorController.getVendorByIdController);


export default router;

