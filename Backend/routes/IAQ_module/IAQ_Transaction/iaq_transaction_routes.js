import {Router} from 'express';
import IAQTransactionController from '../../../controllers/IAQ_module/IAQ_Transaction/iaq_transaction_contoller.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/add',authenticateToken,IAQTransactionController.addIaqTransactionController);
router.get('/fetch',authenticateToken,IAQTransactionController.getIaqTransactionsController);

export default router;