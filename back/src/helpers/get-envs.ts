import dotenv from 'dotenv';
import { envPath } from './configure-env-path';
dotenv.config({ path: envPath });

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;

export { JWT_SECRET, PORT, STORAGE_BUCKET };
