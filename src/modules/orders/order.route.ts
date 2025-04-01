import express from 'express'
import { orderControllers } from './order.controller';
import auth from '../../Middlewares/auth';


const router = express.Router()

router.post('/orders', auth("user"), orderControllers.createOrder)
router.get('/orders/verify', auth('user'),orderControllers.verifyPayment)
router.get('/orders', auth('admin'),  orderControllers.getAllOrder)
router.get('/order/:email', auth('user', 'admin'), orderControllers.getSingleUserAllOrderInfo )
router.get('/orders/revenue', auth('admin'),  orderControllers.getOrderRevenue)



export const orderRouter = router; 