import { Router } from 'express';
import Workout from '../models/workout.js';
const workoutsRouter = Router();
workoutsRouter.get('/', async (_req, res) => {
    const workouts = await Workout.find()
        .populate('user', 'name email fitnessLevel')
        .sort({ scheduledFor: 1 })
        .lean();
    res.status(200).json(workouts);
});
export default workoutsRouter;
