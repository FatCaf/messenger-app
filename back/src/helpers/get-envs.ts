import dotenv from 'dotenv';
import { envPath } from './configure-env-path';
dotenv.config({ path: envPath });

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const STORAGE_BUCKET = process.env.STORAGE_BUCKET;
const FILES_BUCKET = process.env.FILES_BUCKET;
export { FILES_BUCKET, JWT_SECRET, PORT, STORAGE_BUCKET };
