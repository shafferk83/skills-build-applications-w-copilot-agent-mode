import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';
const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard.find()
        .populate('team', 'name city')
        .populate('topUsers.user', 'name email')
        .sort({ weekStartDate: -1 })
        .lean();
    res.status(200).json(leaderboard);
});
export default leaderboardRouter;
