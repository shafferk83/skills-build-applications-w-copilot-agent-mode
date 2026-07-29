import { Router } from 'express';
import Activity from '../models/activity.js';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res) => {
  const activities = await Activity.find()
    .populate('user', 'name email')
    .populate('team', 'name city')
    .sort({ date: -1 })
    .lean();
  res.status(200).json(activities);
});

export default activitiesRouter;
