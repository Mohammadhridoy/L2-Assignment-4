import express from 'express'
import { carControllers } from './car.controller';


const router = express.Router()

router.post('/cars', carControllers.createCar )
router.get('/cars', carControllers.getAllCarsInfo)
router.get('/cars/:carId', carControllers.getOneCarInfo )
router.put('/cars/:carId', carControllers.updatedCarInfo )
router.delete('/cars/:carId', carControllers.deleteCarInfo)



export const carRoutes = router; 