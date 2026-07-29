import 'dotenv/config';
import './config/database.js';
import { app, baseUrl } from './server.js';
const port = 8000;
app.listen(port, () => {
    console.log(`OctoFit backend listening at ${baseUrl}`);
});
