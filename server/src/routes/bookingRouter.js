import { Router } from 'express';
import { bookCreate, bookList } from '../services/bookService.js'

const bookingRouter = Router();

bookingRouter.post('/booking', bookCreate);
bookingRouter.get("/booking/grouped", bookList)
 
export default bookingRouter;