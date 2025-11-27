import { Router } from 'express';
const carRouter = Router();

import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
  registerUser,
  getAllCarsByOwner
} from '../services/itemService.js';
import authenticateToken from '../middlewares/authMiddleware.js';

carRouter.get('/cars/my-cars', authenticateToken, getAllCarsByOwner);
carRouter.get('/cars', getAllCars);
carRouter.get('/cars/:id', getCarById);

carRouter.post('/cars', authenticateToken, createCar);
carRouter.put('/cars/:id', authenticateToken, updateCar);
carRouter.delete('/cars/:id', authenticateToken, deleteCar);
carRouter.post('/cars/:id/register', authenticateToken, registerUser);

export default carRouter;