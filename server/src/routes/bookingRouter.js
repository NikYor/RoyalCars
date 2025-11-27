import { Router } from 'express';
import { bookCreate, bookById, bookList, surveyCreate, surveyList } from '../services/bookService.js'

const bookingRouter = Router();

bookingRouter.post('/booking', bookCreate);
bookingRouter.get("/booking/grouped", bookList)
bookingRouter.get('/booking/:id', bookById);
bookingRouter.post("/survey", surveyCreate)
bookingRouter.get("/survey", surveyList)
 
export default bookingRouter;