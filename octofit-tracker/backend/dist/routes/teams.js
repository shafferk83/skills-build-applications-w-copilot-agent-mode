import { Router } from 'express';
import Team from '../models/team.js';
const teamsRouter = Router();
teamsRouter.get('/', async (_req, res) => {
    const teams = await Team.find()
        .populate('captain', 'name email fitnessLevel')
        .populate('members', 'name email fitnessLevel')
        .sort({ createdAt: -1 })
        .lean();
    res.status(200).json(teams);
});
export default teamsRouter;
