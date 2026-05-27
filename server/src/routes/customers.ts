import { Router } from 'express';
import { addCustomer, getCustomers } from '../controllers/customerController';

const router = Router();

router.post('/', addCustomer);
router.get('/', getCustomers);

export default router;