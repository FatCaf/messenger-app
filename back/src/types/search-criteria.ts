import { admin } from '../db/init-db';

export type Criteria = string | admin.firestore.FieldPath;
