import express from 'express'
import { orderControllers } from './order.controller';
import auth from '../../Middlewares/auth';


const router = express.Router()

router.post('/orders', orderControllers.createOrder)
router.get('/orders', orderControllers.getAllOrder)
router.get('/orders/verify', orderControllers.verifyPayment)
router.get('/orders/revenue', orderControllers.getOrderRevenue)



export const orderRouter = router; 