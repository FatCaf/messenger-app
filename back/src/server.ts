import cors from 'cors';
import express from 'express';
import { PORT } from './helpers/get-envs';
import { initRoutes } from './route/route';

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});

initRoutes(app);
