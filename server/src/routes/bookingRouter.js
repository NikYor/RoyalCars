import { Router } from 'express';
import { bookCreate } from '../services/bookService.js'

const bookingRouter = Router();

bookingRouter.post('/book', bookCreate);


export default bookingRouter;