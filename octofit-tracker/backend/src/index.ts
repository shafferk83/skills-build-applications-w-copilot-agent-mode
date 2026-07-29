import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
