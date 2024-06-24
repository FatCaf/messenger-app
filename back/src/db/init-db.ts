import admin from 'firebase-admin';
import { STORAGE_BUCKET } from '../helpers/get-envs';
const firebaseServiceAccount = JSON.parse(
	process.env.FIREBASE_SERVICE_ACCOUNT as string
);

admin.initializeApp({
	credential: admin.credential.cert(
		firebaseServiceAccount as admin.ServiceAccount
	),
	storageBucket: STORAGE_BUCKET,
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();

export { admin, firestore, storage };
