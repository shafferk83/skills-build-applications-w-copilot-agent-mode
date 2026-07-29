import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './config/database.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok', baseUrl });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.listen(port, () => {
    console.log(`OctoFit backend listening at ${baseUrl}`);
});
