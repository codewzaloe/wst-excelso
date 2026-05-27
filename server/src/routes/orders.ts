import { Router } from 'express';
import { addOrder, getOrders } from '../controllers/orderController';

const router = Router();

router.post('/', addOrder);
router.get('/', getOrders);

export default router;