import { Router } from 'express';
import authRouter from './routes/authRoutes.js';
import carRouter from './routes/carRoutes.js';
import bookingRouter from './routes/bookingRouter.js';
import companiesRouter from './routes/companiesRoutes.js';

const router = Router();

router.use('', authRouter);
router.use('', carRouter);
router.use('', bookingRouter);
router.use('', companiesRouter);

console.log('Registered routes: ')
router.stack.forEach((r, i) => {
  switch (i) {
    case 0: console.log('\t\t  ', 'User: ')      
      break;
    case 1: console.log('\t\t  ', 'Car: ')
      break;
    case 2: console.log('\t\t  ', 'Booking: ')
      break;
    case 3: console.log('\t\t  ', 'Company: ')
      break;  
    default:
      break;
  }
  r.handle.stack.forEach(route => {
    console.log('\t\t      ------', Object.keys(route.route.methods)[0].toUpperCase(), route.route.path);
  })
})

export default router;