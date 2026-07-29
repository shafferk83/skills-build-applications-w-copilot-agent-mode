import { Router } from 'express';
import User from '../models/user.js';
const usersRouter = Router();
usersRouter.get('/', async (_req, res) => {
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(users);
});
export default usersRouter;
