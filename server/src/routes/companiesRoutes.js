import { Router } from 'express';
const companiesRouter = Router();

import {
  getAllCompanies,
} from '../services/companyService.js';

companiesRouter.get('/companies', getAllCompanies);

export default companiesRouter;