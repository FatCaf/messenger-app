import cors from 'cors';
import express from 'express';
import { userRouter } from './route/user-route';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server started on port: ${PORT}`);
});

app.use('/api/v1', userRouter);
