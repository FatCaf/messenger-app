import admin from 'firebase-admin';
import * as serviceAccount from '../../firebase.service.account.json';
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
	storageBucket: 'meduzzen-test-task.appspot.com',
});

const firestore = admin.firestore();
const storage = admin.storage().bucket();

export { firestore, storage };
