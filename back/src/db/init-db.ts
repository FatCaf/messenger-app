import admin from 'firebase-admin';
import * as serviceAccount from '../../firebase.service.account.json';
import { STORAGE_BUCKET } from '../helpers/get-envs';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	storageBucket: STORAGE_BUCKET,
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();

export { admin, firestore, storage };
