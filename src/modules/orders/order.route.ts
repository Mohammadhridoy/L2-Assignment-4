import express from 'express'
import { orderControllers } from './order.controller';


const router = express.Router()

router.post('/orders', orderControllers.createOrder)

router.get('/orders/revenue', orderControllers.getOrderRevenue)



export const orderRouter = router; 