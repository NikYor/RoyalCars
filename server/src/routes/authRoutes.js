import { Router } from 'express';
const authRouter = Router();

import { register,
         login,
         logout,
         requestAdmin, 
         approveAdmin,
         refreshToken,
         getPendingAdminRequests,
         getUserById,
         getUserCount } from '../services/userService.js';
import authenticateToken from '../middlewares/authMiddleware.js';

authRouter.post('/register', register);
authRouter.post('/refresh', refreshToken);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/request-admin', authenticateToken, requestAdmin);
authRouter.post('/admin/approve/:userId', authenticateToken, approveAdmin)
authRouter.get('/admin/pending',authenticateToken, getPendingAdminRequests)
authRouter.get('/user/:userId', getUserById)
authRouter.get('/users/count', getUserCount)

export default authRouter;