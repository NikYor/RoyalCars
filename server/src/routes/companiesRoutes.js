import { Router } from 'express';
const companiesRouter = Router();

import {
  getAllCompanies,
} from '../services/companyService.js';
import authenticateToken from '../middlewares/authMiddleware.js';

companiesRouter.get('/companies', authenticateToken, getAllCompanies);

export default companiesRouter;